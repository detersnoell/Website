"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { buttonStyles } from "./Button";
import type { AddItem } from "@/lib/commerce/types";
import styles from "./AddToCartButton.module.css";

export function AddToCartButton({
  items,
  label = "In den Warenkorb",
  productLabel,
  variant = "primary",
  full = true,
  feedback = "drawer",
}: {
  items: AddItem[];
  label?: string;
  productLabel?: string;
  variant?: "primary" | "secondary";
  full?: boolean;
  feedback?: "drawer" | "toast";
}) {
  const { add } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onClick() {
    if (state === "loading") return;
    setState("loading");
    try {
      await add(items, feedback, productLabel);
      setState("done");
      setTimeout(() => setState("idle"), 1400);
    } catch {
      setState("error");
    }
  }

  return (
    <div className={full ? styles.wrapFull : undefined}>
      <button
        type="button"
        onClick={onClick}
        aria-live="polite"
        className={[buttonStyles.button, buttonStyles[variant], full && buttonStyles.full, styles.btn].filter(Boolean).join(" ")}
      >
        <span className={styles.layer} data-show={state === "idle" || state === "error"}>
          {label}
        </span>
        <span className={styles.layer} data-show={state === "loading"} aria-hidden={state !== "loading"}>
          <span className={styles.spinner} />
          <span className="visually-hidden">Wird hinzugefügt</span>
        </span>
        <span className={styles.layer} data-show={state === "done"} aria-hidden={state !== "done"}>
          Hinzugefügt
        </span>
      </button>
      {state === "error" && (
        <p className={styles.error} role="alert">
          Konnte nicht hinzugefügt werden. Bitte erneut versuchen.
        </p>
      )}
    </div>
  );
}
