"use client";

import Image from "next/image";
import Link from "@/components/AppLink";
import { useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { formatPrice, unitPricePerLitre } from "@/lib/money";
import { useCart } from "./CartProvider";
import styles from "./ProductCard.module.css";

/**
 * Produktkarte.
 * Desktop: nach 80 ms Hover-Absicht Überblendung auf Bild 2 (Textur/Detail), 320 ms.
 * Touch: kein Hover. „Hinzufügen“ legt direkt in den Warenkorb (Rückmeldung per Toast).
 */
export function ProductCard({
  product,
  priority = false,
  headingLevel = "h3",
}: {
  product: Product;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
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
      setTimeout(() => setState("idle"), 1600);
    } catch {
      setState("idle");
    }
  }

  return (
    <article className={styles.card}>
      <Link href={`/${product.slug}`} className={styles.media} tabIndex={-1} aria-hidden="true">
        <Image
          src={first.src}
          alt=""
          fill
          sizes="(max-width: 767px) 72vw, (max-width: 1199px) 45vw, 30vw"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={styles.img}
          style={{ objectPosition: first.focus }}
        />
        {second && (
          <Image
            src={second.src}
            alt=""
            fill
            sizes="(max-width: 767px) 72vw, 30vw"
            className={`${styles.img} ${styles.img2}`}
            style={{ objectPosition: second.focus }}
          />
        )}
      </Link>

      <div className={styles.body}>
        <Heading className={styles.name}>
          <Link href={`/${product.slug}`} className={styles.nameLink}>
            {product.name}
          </Link>
        </Heading>
        <p className={styles.for}>{product.forWhom}</p>
        <div className={styles.buy}>
          <p className={styles.price}>
            <span className="num">{formatPrice(variant.priceGross)}</span>
            <span className={styles.unit}>
              {variant.size.value} {variant.size.unit}, {unitPricePerLitre(variant.priceGross, variant.size.value)}
            </span>
          </p>
          <button
            type="button"
            className={styles.add}
            onClick={quickAdd}
            data-state={state}
            aria-label={`Hinzufügen: ${product.name}, ${formatPrice(variant.priceGross)}`}
          >
            {state === "done" ? "Im Warenkorb" : state === "loading" ? "Wird hinzugefügt" : "Hinzufügen"}
          </button>
        </div>
      </div>
    </article>
  );
}
