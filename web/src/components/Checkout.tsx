"use client";

import Image from "next/image";
import Link from "@/components/AppLink";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";
import { track } from "@/lib/analytics";
import { buildOrderDraft, computeTotals, previewCheckout, quoteShipping } from "@/lib/commerce/checkout";
import type { CustomerInput } from "@/lib/commerce/types";
import { validate, validators, type Validator } from "@/lib/validation";
import { useCart } from "./CartProvider";
import { ButtonLink } from "./Button";
import styles from "./Checkout.module.css";
import f from "./Form.module.css";

type Fields = {
  email: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  postalCode: string;
  city: string;
  bFirstName: string;
  bLastName: string;
  bLine1: string;
  bPostalCode: string;
  bCity: string;
};

const empty: Fields = {
  email: "",
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  postalCode: "",
  city: "",
  bFirstName: "",
  bLastName: "",
  bLine1: "",
  bPostalCode: "",
  bCity: "",
};

const baseRules: Partial<Record<keyof Fields, Validator>> = {
  email: validators.email,
  firstName: validators.required,
  lastName: validators.required,
  line1: validators.required,
  postalCode: validators.postalCodeDE,
  city: validators.required,
};

const billingRules: Partial<Record<keyof Fields, Validator>> = {
  bFirstName: validators.required,
  bLastName: validators.required,
  bLine1: validators.required,
  bPostalCode: validators.postalCodeDE,
  bCity: validators.required,
};

/**
 * Checkout im eigenen Design. Bestellentwurf und Zahlung laufen über den
 * CheckoutAdapter; in der Vorschau ist keine Zahlung angebunden.
 */
export function Checkout() {
  const { cart, ready } = useCart();
  const [values, setValues] = useState<Fields>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [billingSame, setBillingSame] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "submitting" | "info" | "error"; message?: string }>({ kind: "idle" });
  const [summaryOpen, setSummaryOpen] = useState(false);
  const errorSummary = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const rules = useMemo(() => (billingSame ? baseRules : { ...baseRules, ...billingRules }), [billingSame]);
  const errors = validate(values, rules);
  const shipping = quoteShipping(cart.subtotal);
  const totals = computeTotals(cart.subtotal, shipping.priceGross);

  useEffect(() => {
    if (ready && cart.itemCount > 0 && !started.current) {
      started.current = true;
      track("begin_checkout", { value: cart.subtotal / 100 });
    }
  }, [ready, cart.itemCount, cart.subtotal]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));
  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const all = Object.fromEntries(Object.keys(rules).map((k) => [k, true]));
    setTouched(all);
    if (Object.keys(errors).length) {
      setStatus({ kind: "error", message: "Bitte prüfe die markierten Felder." });
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    setStatus({ kind: "submitting" });
    const customer: CustomerInput = {
      email: values.email.trim(),
      shipping: {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        line1: values.line1.trim(),
        line2: values.line2.trim() || undefined,
        postalCode: values.postalCode.trim(),
        city: values.city.trim(),
        country: "DE",
      },
      billing: billingSame
        ? undefined
        : {
            firstName: values.bFirstName.trim(),
            lastName: values.bLastName.trim(),
            line1: values.bLine1.trim(),
            postalCode: values.bPostalCode.trim(),
            city: values.bCity.trim(),
            country: "DE",
          },
      marketingConsent: marketing,
    };
    track("add_shipping_info", { value: totals.total / 100, shipping_tier: shipping.label });
    const result = await previewCheckout.createOrder(buildOrderDraft(cart, customer));
    if (result.status === "unavailable") setStatus({ kind: "info", message: `${result.reason} Es wurde nichts gesendet und nichts berechnet.` });
  }

  if (ready && cart.itemCount === 0)
    return (
      <div className={`container ${styles.empty}`}>
        <h1 className="display-l">Dein Warenkorb ist leer.</h1>
        <ButtonLink href="/#produkte">Zu den Produkten</ButtonLink>
      </div>
    );

  const summary = (
    <>
        <h2 className={styles.legend}>Deine Bestellung</h2>
      <ul>
        {cart.lines.map((l) => (
          <li key={l.id} className={styles.line}>
            <span className={styles.lineImage}>
              {l.image && <Image src={l.image} alt="" fill sizes="64px" />}
            </span>
            <span>
              <span className={styles.lineName}>{l.name}</span>
              <span className={styles.lineMeta}>
                {l.qty} × {l.size}
              </span>
            </span>
            <span className="num">{formatPrice(l.unitPrice * l.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className={styles.totals}>
        <div>
          <dt>Zwischensumme</dt>
          <dd className="num">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div>
          <dt>Versand ({store.carrier})</dt>
          <dd className="num">{totals.shipping === 0 ? "kostenlos" : formatPrice(totals.shipping)}</dd>
        </div>
        <div className={styles.grand}>
          <dt>Gesamt</dt>
          <dd className="num">{formatPrice(totals.total)}</dd>
        </div>
        <div className={styles.vat}>
          <dt>enthaltene MwSt. (19 %)</dt>
          <dd className="num">{formatPrice(totals.vatIncluded)}</dd>
        </div>
      </dl>
    </>
  );

  const field = (k: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div className={f.field} data-invalid={!!err(k)}>
      <label htmlFor={`f-${k}`}>
        {label}
        {optional && <span className={f.optional}> (optional)</span>}
      </label>
      <input
        id={`f-${k}`}
        name={k}
        value={values[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={!!err(k)}
        aria-describedby={err(k) ? `e-${k}` : undefined}
        {...props}
      />
      {err(k) && (
        <p id={`e-${k}`} className={f.error}>
          {err(k)}
        </p>
      )}
    </div>
  );

  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.form}>
        <h1 className="display-l">Kasse</h1>

        {/* Mobile: Bestellübersicht eingeklappt, Summe immer sichtbar */}
        <button
          type="button"
          className={styles.summaryToggle}
          aria-expanded={summaryOpen}
          aria-controls="summary-mobile"
          onClick={() => setSummaryOpen((o) => !o)}
        >
          <span>{summaryOpen ? "Bestellübersicht ausblenden" : "Bestellübersicht anzeigen"}</span>
          <span className="num">{formatPrice(totals.total)}</span>
        </button>
        {summaryOpen && (
          <div id="summary-mobile" className={styles.summaryMobile}>
            {summary}
          </div>
        )}

        <form className={styles.fields} onSubmit={onSubmit} noValidate>
          <fieldset>
            <legend className={styles.legend}>Kontakt</legend>
            {field("email", "E-Mail", { type: "email", autoComplete: "email", inputMode: "email" })}
            <label className={styles.check}>
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              <span>Ich möchte gelegentlich Pflegetipps und Neuigkeiten per E-Mail erhalten. Abmeldung jederzeit möglich.</span>
            </label>
          </fieldset>

          <fieldset>
            <legend className={styles.legend}>Lieferadresse</legend>
            <div className={styles.row}>
              {field("firstName", "Vorname", { autoComplete: "shipping given-name" })}
              {field("lastName", "Nachname", { autoComplete: "shipping family-name" })}
            </div>
            {field("line1", "Straße und Hausnummer", { autoComplete: "shipping address-line1" })}
            {field("line2", "Adresszusatz", { autoComplete: "shipping address-line2" }, true)}
            <div className={styles.rowPlz}>
              {field("postalCode", "PLZ", { autoComplete: "shipping postal-code", inputMode: "numeric", maxLength: 5 })}
              {field("city", "Ort", { autoComplete: "shipping address-level2" })}
            </div>
            <p className={styles.note}>Wir liefern derzeit innerhalb Deutschlands. Für Lieferungen ins Ausland schreib uns.</p>
            <label className={styles.check}>
              <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
              <span>Rechnungsadresse entspricht der Lieferadresse</span>
            </label>
          </fieldset>

          {!billingSame && (
            <fieldset>
              <legend className={styles.legend}>Rechnungsadresse</legend>
              <div className={styles.row}>
                {field("bFirstName", "Vorname", { autoComplete: "billing given-name" })}
                {field("bLastName", "Nachname", { autoComplete: "billing family-name" })}
              </div>
              {field("bLine1", "Straße und Hausnummer", { autoComplete: "billing address-line1" })}
              <div className={styles.rowPlz}>
                {field("bPostalCode", "PLZ", { autoComplete: "billing postal-code", inputMode: "numeric", maxLength: 5 })}
                {field("bCity", "Ort", { autoComplete: "billing address-level2" })}
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend className={styles.legend}>Versand</legend>
            <div className={styles.option}>
              <span>{shipping.label}</span>
              <span className="num">{shipping.priceGross === 0 ? "kostenlos" : formatPrice(shipping.priceGross)}</span>
            </div>
          </fieldset>

          <fieldset>
            <legend className={styles.legend}>Zahlung</legend>
            <div className={styles.paymentSlot}>
              <p>Karte, Apple Pay, Google Pay und PayPal werden hier direkt eingebunden, ohne Weiterleitung auf eine andere Seite.</p>
              <p className={styles.note}>In dieser Vorschau ist die Zahlung noch nicht aktiv.</p>
            </div>
          </fieldset>

          <div className={styles.submitBlock}>
            <div ref={errorSummary} tabIndex={-1} aria-live="polite" className={styles.status} data-kind={status.kind}>
              {status.message}
            </div>
            <button type="submit" className={styles.submit} disabled={status.kind === "submitting"}>
              Zahlungspflichtig bestellen
            </button>
            <p className={styles.note}>
              Mit deiner Bestellung akzeptierst du unsere{" "}
              <Link href="/agb" className="link">
                AGB
              </Link>
              . Informationen zum Widerrufsrecht findest du in der{" "}
              <Link href="/widerruf" className="link">
                Widerrufsbelehrung
              </Link>
              .
            </p>
          </div>
        </form>
      </div>

      <aside className={styles.summary} aria-label="Bestellübersicht">
        {summary}
      </aside>
    </div>
  );
}
