"use client";

import Image from "next/image";
import Link from "@/components/AppLink";
import { useRef, useState } from "react";
import { allProducts } from "@/lib/catalog/products";
import { formatPrice } from "@/lib/money";
import { AddToCartButton } from "./AddToCartButton";
import styles from "./NeedsSelector.module.css";

/** „Welche Pflege braucht dein Hund?“ – Auswahl nach Bedarf statt nach Produktnamen. */
export function NeedsSelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = allProducts[active];
  const v = p.variants[0];
  const image = p.images[1] ?? p.images[0];

  function onKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + allProducts.length) % allProducts.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Bedarf wählen">
        {allProducts.map((x, i) => (
          <button
            key={x.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`need-tab-${x.slug}`}
            aria-selected={i === active}
            aria-controls="need-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {x.need}
          </button>
        ))}
      </div>

      <div id="need-panel" role="tabpanel" aria-labelledby={`need-tab-${p.slug}`} className={styles.panel}>
        <div className={styles.media} key={`m-${p.slug}`}>
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 899px) 100vw, 50vw" style={{ objectPosition: image.focus }} />
        </div>
        <div className={styles.content} key={`c-${p.slug}`}>
          <h3 className="display-m">{p.name}</h3>
          <p className="body-l">{p.lead}</p>
          <ul className={`ticks ${styles.list}`} style={{ "--tick": p.accent } as React.CSSProperties}>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p className={styles.notFor}>
            <span>Nicht ideal, wenn</span> {p.notFor.text}
          </p>
          <div className={styles.actions}>
            <AddToCartButton
              items={[{ sku: v.sku, qty: 1 }]}
              label={`In den Warenkorb, ${formatPrice(v.priceGross)}`}
              productLabel={p.name}
              full={false}
            />
            <Link href={`/${p.slug}`} className="link">
              Mehr zu {p.name}
            </Link>
          </div>
        </div>
      </div>
      <p className={styles.hint}>
        Ein Shampoo passt zu deinem Hund, die Hasenfüßin ergänzt beide.
      </p>
    </div>
  );
}
