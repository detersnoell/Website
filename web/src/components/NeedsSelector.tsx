"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { allProducts } from "@/lib/catalog/products";
import { formatPrice } from "@/lib/money";
import { AddToCartButton } from "./AddToCartButton";
import { Icon } from "./Icon";
import styles from "./NeedsSelector.module.css";

/** „Welche Pflege braucht dein Hund?“ – Segmente nach Bedarf statt nach Produktnamen. */
export function NeedsSelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = allProducts[active];
  const v = p.variants[0];
  const image = p.images[1] ?? p.images[0];

  function onKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + allProducts.length) % allProducts.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.wrap} style={{ "--accent": p.accent } as React.CSSProperties}>
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
            style={{ "--accent": x.accent } as React.CSSProperties}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={styles.tabNum}>0{i + 1}</span>
            <span className={styles.tabNeed}>{x.need}</span>
            <span className={`small muted ${styles.tabProduct}`}>{x.name}</span>
          </button>
        ))}
        <p className={`small muted ${styles.hint}`}>
          Ein Shampoo wählen, die Hasenfüßin ergänzen: Sie passt zu jedem Hund.
        </p>
      </div>

      <div id="need-panel" role="tabpanel" aria-labelledby={`need-tab-${p.slug}`} className={styles.panel}>
        <div className={styles.media} key={`m-${p.slug}`}>
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 899px) 100vw, 40vw" style={{ objectPosition: image.focus }} />
        </div>
        <div className={styles.content} key={`c-${p.slug}`}>
          <p className={`label ${styles.kind}`}>{p.kind}</p>
          <h3 className="display-m">{p.name}</h3>
          <p className="body-l muted">{p.lead}</p>
          <ul className={styles.list}>
            {p.highlights.map((h) => (
              <li key={h}>
                <Icon name="check" size={18} />
                {h}
              </li>
            ))}
          </ul>
          <p className={`small ${styles.notFor}`}>
            <strong>Nicht ideal, wenn …</strong> {p.notFor.text}
          </p>
          <div className={styles.actions}>
            <AddToCartButton
              items={[{ sku: v.sku, qty: 1 }]}
              label={`In den Warenkorb · ${formatPrice(v.priceGross)}`}
              productLabel={p.name}
              full={false}
            />
            <Link href={`/${p.slug}`} className="link">
              Mehr zu {p.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
