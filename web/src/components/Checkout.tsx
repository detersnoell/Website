"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";
import { useCart } from "./CartProvider";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import styles from "./Checkout.module.css";

/**
 * Checkout-Oberfläche im eigenen Design.
 * Zahlung ist noch nicht angebunden: Hier sitzt später die eingebettete
 * Payment-Komponente (PaymentProvider-Adapter), nicht ein fremder Checkout.
 */
export function Checkout() {
  const { cart, ready } = useCart();
  const shipping = cart.subtotal >= store.freeShippingThreshold ? 0 : store.shippingCostDE;
  const total = cart.subtotal + shipping;

  if (ready && cart.itemCount === 0)
    return (
      <div className={`container ${styles.empty}`}>
        <h1 className="display-l">Dein Warenkorb ist leer.</h1>
        <ButtonLink href="/#produkte">
          Zu den Produkten
        </ButtonLink>
      </div>
    );

  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.form}>
        <h1 className="display-l">Kasse</h1>

        <section className={styles.express} aria-label="Express-Zahlung">
          <p className="small muted">Schnell bezahlen</p>
          <div className={styles.expressRow}>
            <button type="button" disabled className={styles.expressBtn}>
              Apple Pay
            </button>
            <button type="button" disabled className={styles.expressBtn}>
              PayPal
            </button>
          </div>
          <p className={`small muted ${styles.or}`}>oder mit deinen Angaben</p>
        </section>

        <form className={styles.fields} onSubmit={(e) => e.preventDefault()} noValidate>
          <fieldset>
            <legend className={styles.legend}>Kontakt</legend>
            <label className={styles.field}>
              <span>E-Mail</span>
              <input type="email" name="email" autoComplete="email" inputMode="email" required />
            </label>
          </fieldset>

          <fieldset>
            <legend className={styles.legend}>Lieferadresse</legend>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Vorname</span>
                <input name="given-name" autoComplete="given-name" required />
              </label>
              <label className={styles.field}>
                <span>Nachname</span>
                <input name="family-name" autoComplete="family-name" required />
              </label>
            </div>
            <label className={styles.field}>
              <span>Straße und Hausnummer</span>
              <input name="address-line1" autoComplete="address-line1" required />
            </label>
            <label className={styles.field}>
              <span>
                Adresszusatz <span className="muted">(optional)</span>
              </span>
              <input name="address-line2" autoComplete="address-line2" />
            </label>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>PLZ</span>
                <input name="postal-code" autoComplete="postal-code" inputMode="numeric" required />
              </label>
              <label className={styles.field}>
                <span>Ort</span>
                <input name="address-level2" autoComplete="address-level2" required />
              </label>
            </div>
            <label className={styles.check}>
              <input type="checkbox" defaultChecked /> <span>Rechnungsadresse entspricht der Lieferadresse</span>
            </label>
          </fieldset>

          <fieldset>
            <legend className={styles.legend}>Zahlung</legend>
            <div className={styles.paymentSlot}>
              <Icon name="lock" size={18} />
              <p className="small">
                Hier wird die Zahlung eingebettet (Karte, Apple Pay, PayPal …), im selben Design, ohne Weiterleitung. <strong>In dieser Vorschau noch nicht aktiv.</strong>
              </p>
            </div>
          </fieldset>

          <p className="small muted">
            Mit deiner Bestellung akzeptierst du unsere{" "}
            <Link href="/agb" className="link">
              AGB
            </Link>
            . Informationen zum Widerruf findest du in der{" "}
            <Link href="/widerruf" className="link">
              Widerrufsbelehrung
            </Link>
            .
          </p>
          <button type="submit" disabled className={styles.submit}>
            Zahlungspflichtig bestellen
          </button>
        </form>
      </div>

      <aside className={styles.summary} aria-label="Bestellübersicht">
        <h2 className={styles.legend}>Deine Bestellung</h2>
        <ul>
          {cart.lines.map((l) => (
            <li key={l.id} className={styles.line}>
              <span className={styles.lineImage}>
                {l.image && <Image src={l.image} alt="" fill sizes="64px" />}
                <span className={styles.qty}>{l.qty}</span>
              </span>
              <span>
                <span className={styles.lineName}>{l.name}</span>
                <span className="small muted">{l.size}</span>
              </span>
              <span className="num">{formatPrice(l.unitPrice * l.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className={styles.totals}>
          <div>
            <dt>Zwischensumme</dt>
            <dd className="num">{formatPrice(cart.subtotal)}</dd>
          </div>
          <div>
            <dt>Versand ({store.carrier})</dt>
            <dd className="num">{shipping === 0 ? "kostenlos" : formatPrice(shipping)}</dd>
          </div>
          <div className={styles.grand}>
            <dt>Gesamt</dt>
            <dd className="num">{formatPrice(total)}</dd>
          </div>
        </dl>
        <p className="small muted">Inkl. MwSt.</p>
      </aside>
    </div>
  );
}
