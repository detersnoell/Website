"use client";

import { useId, useState } from "react";
import styles from "./Accordion.module.css";

export function Accordion({ items, defaultOpen }: { items: { title: React.ReactNode; content: React.ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const id = useId();
  return (
    <div className={styles.list}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={styles.item} data-open={isOpen}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                className={styles.trigger}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.title}</span>
                <span className={styles.sign} aria-hidden="true" />
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} className={styles.panel}>
              <div className={styles.inner}>
                <div className={styles.content}>{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
