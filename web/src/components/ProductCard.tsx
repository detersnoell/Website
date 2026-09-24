"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { formatPrice, unitPricePerLitre } from "@/lib/money";
import { useCart } from "./CartProvider";
import { Icon } from "./Icon";
import styles from "./ProductCard.module.css";

/**
 * Produktkarte.
 * Desktop: nach 80 ms Hover-Absicht Überblendung auf Bild 2 (Textur/Detail),
 *   leichter Scale 1,02; „+“ wird zur Pille mit Preis.
 * Touch: kein Hover; „+“ (44 px) legt direkt in den Warenkorb, Rückmeldung per Toast.
 */
export function ProductCard({
  product,
  priority = false,
  index = 0,
  entrance = "reveal",
}: {
  product: Product;
  priority?: boolean;
  index?: number;
  /** "reveal": beim Scrollen einblenden; "load": einmalig beim Laden (Hero) */
  entrance?: "reveal" | "load";
}) {
  const { add } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const variant = product.variants[0];
  const [first, second] = product.images;

  async function quickAdd() {
    if (state !== "idle") return;
    setState("loading");
    const touch = window.matchMedia("(hover: none)").matches;
    try {
      await add([{ sku: variant.sku, qty: 1 }], touch ? "toast" : "drawer", product.name);
      setState("done");
      setTimeout(() => setState("idle"), 1400);
    } catch {
      setState("idle");
    }
  }

  return (
    <article
      className={`${styles.card} ${entrance === "reveal" ? "reveal" : styles.enter}`}
      style={{ "--accent": product.accent, "--i": index, transitionDelay: entrance === "reveal" ? `${index * 60}ms` : undefined } as React.CSSProperties}
    >
      <div className={styles.media}>
        <Link href={`/${product.slug}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
          <Image
            src={first.src}
            alt=""
            fill
            sizes="(max-width: 767px) 80vw, (max-width: 1199px) 45vw, 30vw"
            priority={priority}
            className={styles.img}
          />
          {second && (
            <Image src={second.src} alt="" fill sizes="(max-width: 767px) 80vw, 30vw" className={`${styles.img} ${styles.img2}`} />
          )}
        </Link>
        <button
          type="button"
          className={styles.add}
          data-state={state}
          onClick={quickAdd}
          aria-label={`${product.name} für ${formatPrice(variant.priceGross)} in den Warenkorb`}
        >
          <span className={styles.addIcon}>
            <Icon name={state === "done" ? "check" : "plus"} size={20} />
          </span>
          <span className={styles.addText} aria-hidden="true">
            In den Warenkorb · <span className="num">{formatPrice(variant.priceGross)}</span>
          </span>
        </button>
      </div>

      <div className={styles.body}>
        <p className={`label ${styles.kind}`}>{product.kind}</p>
        <h3 className={styles.name}>
          <Link href={`/${product.slug}`} className={styles.nameLink}>
            {product.name}
          </Link>
        </h3>
        <p className={`small muted ${styles.for}`}>{product.forWhom}</p>
        <p className={styles.price}>
          <span className="num">{formatPrice(variant.priceGross)}</span>
          <span className="small muted num">
            {variant.size.value} {variant.size.unit} · {unitPricePerLitre(variant.priceGross, variant.size.value)}
          </span>
        </p>
      </div>
    </article>
  );
}
