"use client";

import { useState } from "react";
import { store } from "@/lib/store";
import { track } from "@/lib/analytics";
import { validate, validators } from "@/lib/validation";
import { Button } from "./Button";
import f from "./Form.module.css";
import styles from "./ContactForm.module.css";

type Values = { name: string; email: string; topic: string; message: string };
const rules = { name: validators.required, email: validators.email, message: validators.minLength(10) };

export function ContactForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", topic: "pflege", message: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "unavailable" | "error">("idle");
  const errors = validate(values, rules);
  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined);
  const on = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    setState("sending");
    const website = (new FormData(e.currentTarget).get("website") as string) ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      if (res.ok) {
        setState("sent");
        track("generate_lead", { topic: values.topic });
      } else setState(res.status === 503 ? "unavailable" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent")
    return (
      <p className={styles.done} role="status">
        Danke, deine Nachricht ist angekommen. Wir melden uns bei dir.
      </p>
    );

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-label="Kontaktformular">
      <div className={styles.row}>
        <div className={f.field} data-invalid={!!err("name")}>
          <label htmlFor="c-name">Name</label>
          <input id="c-name" autoComplete="name" value={values.name} onChange={on("name")} onBlur={blur("name")} aria-invalid={!!err("name")} aria-describedby={err("name") ? "ce-name" : undefined} />
          {err("name") && <p id="ce-name" className={f.error}>{err("name")}</p>}
        </div>
        <div className={f.field} data-invalid={!!err("email")}>
          <label htmlFor="c-email">E-Mail</label>
          <input id="c-email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={on("email")} onBlur={blur("email")} aria-invalid={!!err("email")} aria-describedby={err("email") ? "ce-email" : undefined} />
          {err("email") && <p id="ce-email" className={f.error}>{err("email")}</p>}
        </div>
      </div>
      <div className={f.field}>
        <label htmlFor="c-topic">Worum geht es?</label>
        <select id="c-topic" value={values.topic} onChange={on("topic")}>
          <option value="pflege">Pflege und Produkte</option>
          <option value="bestellung">Eine Bestellung</option>
          <option value="haendler">Händleranfrage</option>
          <option value="sonstiges">Etwas anderes</option>
        </select>
      </div>
      <div className={f.field} data-invalid={!!err("message")}>
        <label htmlFor="c-message">Nachricht</label>
        <textarea id="c-message" value={values.message} onChange={on("message")} onBlur={blur("message")} aria-invalid={!!err("message")} aria-describedby={err("message") ? "ce-message" : undefined} />
        {err("message") && <p id="ce-message" className={f.error}>{err("message")}</p>}
      </div>
      <div className={f.honeypot} aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.actions}>
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Wird gesendet" : "Nachricht senden"}
        </Button>
        <div aria-live="polite" className={styles.status}>
          {state === "unavailable" && (
            <p>
              Das Formular ist noch nicht freigeschaltet. Schreib uns bitte direkt an{" "}
              <a className="link" href={`mailto:${store.contact.email}?subject=${encodeURIComponent(values.topic === "haendler" ? "Händleranfrage" : "Anfrage")}&body=${encodeURIComponent(values.message)}`}>
                {store.contact.email}
              </a>
              .
            </p>
          )}
          {state === "error" && <p className={f.error}>Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.</p>}
        </div>
      </div>
    </form>
  );
}
