"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/money";
import { AddToCartButton } from "./AddToCartButton";
import styles from "./StickyBuyBar.module.css";

/** Erscheint, sobald der Hauptbutton aus dem Bild scrollt; verschwindet über dem Footer. */
export function StickyBuyBar({ targetId, name, sku, price }: { targetId: string; name: string; sku: string; price: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const footer = document.querySelector("footer");
    if (!target) return;
    let targetVisible = true;
    let footerVisible = false;
    let passed = false;
    const update = () => setShow(!targetVisible && passed && !footerVisible);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === target) {
          targetVisible = e.isIntersecting;
          passed = e.boundingClientRect.top < 0;
        } else footerVisible = e.isIntersecting;
      }
      update();
    });
    io.observe(target);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <div className={styles.bar} data-show={show} aria-hidden={!show} inert={!show}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className="num small">{formatPrice(price)}</span>
        </p>
        <AddToCartButton items={[{ sku, qty: 1 }]} full={false} productLabel={name} />
      </div>
    </div>
  );
}
