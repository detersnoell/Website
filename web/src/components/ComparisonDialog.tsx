"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ProductSlug } from "@/lib/catalog/types";
import { Comparison } from "./Comparison";
import { Icon } from "./Icon";
import styles from "./ComparisonDialog.module.css";

/**
 * Vergleich als Hilfsfenster, ähnlich einer Größentabelle im Modehandel:
 * ein unauffälliger Auslöser am Kaufbereich, die Tabelle erst auf Wunsch.
 */
export function ComparisonDialog({ current }: { current: ProductSlug }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const show = () => {
    ref.current?.showModal();
    setOpen(true);
  };
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" className={styles.trigger} onClick={show} aria-haspopup="dialog">
        <span className={styles.triggerIcon} aria-hidden="true" />
        Welche Pflege passt? Alle drei im Vergleich
      </button>
      <dialog
        ref={ref}
        className={styles.dialog}
        aria-labelledby={`${id}-t`}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className={styles.inner}>
          <div className={styles.head}>
            <h2 id={`${id}-t`} className="display-m">
              Was passt zu deinem Hund?
            </h2>
            <button type="button" className={styles.close} onClick={close}>
              <Icon name="close" size={22} />
              <span className="visually-hidden">Vergleich schließen</span>
            </button>
          </div>
          <p className="muted">Zwei Shampoos für unterschiedliche Haut und unterschiedliches Fell, dazu ein Balsam für Pfoten und Nase.</p>
          <Comparison current={current} />
        </div>
      </dialog>
    </>
  );
}
