"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { products } from "@/lib/catalog/products";
import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";
import { useCart } from "./CartProvider";
import { ButtonLink } from "./Button";
import { Icon } from "./Icon";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, setQuantity, remove, lastAddedSku, add, toast, dismissToast, openDrawer } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    returnFocus.current = document.activeElement as HTMLElement;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [drawerOpen, closeDrawer]);

  const remaining = Math.max(0, store.freeShippingThreshold - cart.subtotal);
  const progress = Math.min(1, cart.subtotal / store.freeShippingThreshold);

  // Oder/Und-Logik: Shampoo im Korb → Hasenfüßin empfehlen; nur Balsam → Shampoo-Auswahl
  const slugs = new Set(cart.lines.map((l) => l.slug));
  const hasShampoo = slugs.has("warmduscher") || slugs.has("raufbold");
  const recommendBalm = hasShampoo && !slugs.has("hasenfuessin");
  const recommendShampoo = slugs.has("hasenfuessin") && !hasShampoo;
  const balm = products.hasenfuessin;

  return (
    <>
      <div className={styles.overlay} data-open={drawerOpen} onClick={closeDrawer} aria-hidden="true" />
      <div
        ref={panelRef}
        className={styles.panel}
        data-open={drawerOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Warenkorb"
        tabIndex={-1}
        inert={!drawerOpen}
      >
        <div className={styles.handle} aria-hidden="true" />
        <div className={styles.head}>
          <h2 className={styles.title}>
            Warenkorb <span className="num muted">({cart.itemCount})</span>
          </h2>
          <button type="button" className={styles.close} onClick={closeDrawer}>
            <Icon name="close" size={22} />
            <span className="visually-hidden">Warenkorb schließen</span>
          </button>
        </div>

        {cart.itemCount === 0 ? (
          <div className={styles.empty}>
            <p className="body-l">Dein Warenkorb ist leer.</p>
            <ButtonLink href="/#produkte" variant="secondary" arrow>
              Zu den Produkten
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className={styles.shipping}>
              <p className="small">
                {remaining > 0 ? (
                  <>
                    Noch <strong className="num">{formatPrice(remaining)}</strong> bis zum kostenlosen Versand
                  </>
                ) : (
                  <span className={styles.free}>
                    <Icon name="check" size={16} /> Versandkostenfrei
                  </span>
                )}
              </p>
              <div className={styles.track} aria-hidden="true">
                <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} data-done={remaining === 0} />
              </div>
            </div>

            <ul className={styles.lines}>
              {cart.lines.map((l) => (
                <li key={l.id} className={styles.line} data-highlight={l.sku === lastAddedSku}>
                  <Link href={l.slug ? `/${l.slug}` : "#"} className={styles.lineImage} onClick={closeDrawer}>
                    {l.image && <Image src={l.image} alt="" fill sizes="80px" />}
                  </Link>
                  <div className={styles.lineBody}>
                    <div className={styles.lineTop}>
                      <span className={styles.lineName}>{l.name}</span>
                      <span className="num">{formatPrice(l.unitPrice * l.qty)}</span>
                    </div>
                    <span className="small muted">{l.size}</span>
                    <div className={styles.lineActions}>
                      <div className={styles.stepper}>
                        <button type="button" onClick={() => setQuantity(l.id, l.qty - 1)} aria-label={`${l.name}: Menge verringern`}>
                          <Icon name="minus" size={16} />
                        </button>
                        <span className="num" aria-live="polite">
                          {l.qty}
                        </span>
                        <button type="button" onClick={() => setQuantity(l.id, l.qty + 1)} aria-label={`${l.name}: Menge erhöhen`}>
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                      <button type="button" className={`small ${styles.remove}`} onClick={() => remove(l.id)}>
                        Entfernen
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {recommendBalm && (
              <div className={styles.reco}>
                <p className="label muted">Passt dazu</p>
                <div className={styles.recoRow}>
                  <span className={styles.recoImage}>
                    <Image src={balm.images[0].src} alt="" fill sizes="56px" style={{ objectPosition: balm.images[0].focus }} />
                  </span>
                  <span>
                    <span className={styles.lineName}>{balm.name}</span>
                    <span className="small muted">{balm.forWhom}</span>
                  </span>
                  <button
                    type="button"
                    className={styles.recoAdd}
                    onClick={() => add([{ sku: balm.variants[0].sku, qty: 1 }], "drawer")}
                    aria-label={`${balm.name} für ${formatPrice(balm.variants[0].priceGross)} hinzufügen`}
                  >
                    <Icon name="plus" size={18} />
                    <span className="num small">{formatPrice(balm.variants[0].priceGross)}</span>
                  </button>
                </div>
              </div>
            )}
            {recommendShampoo && (
              <div className={styles.reco}>
                <p className="label muted">Passt dazu</p>
                <p className="small">
                  Das passende Shampoo für deinen Hund:{" "}
                  <Link href="/#auswahl" className="link" onClick={closeDrawer}>
                    Warmduscher oder Raufbold?
                  </Link>
                </p>
              </div>
            )}

            <div className={styles.foot}>
              <div className={styles.total}>
                <span>Zwischensumme</span>
                <span className="num">{formatPrice(cart.subtotal)}</span>
              </div>
              <p className="small muted">Inkl. MwSt. Versandkosten werden im nächsten Schritt berechnet.</p>
              <ButtonLink href="/kasse" full arrow>
                Zur Kasse
              </ButtonLink>
            </div>
          </>
        )}
      </div>

      <div className={styles.toast} data-open={!!toast} role="status" aria-live="polite">
        {toast && (
          <>
            <Icon name="check" size={18} />
            <span>{toast.message}</span>
            <button
              type="button"
              className={styles.toastAction}
              onClick={() => {
                dismissToast();
                openDrawer();
              }}
            >
              Ansehen
            </button>
          </>
        )}
      </div>
    </>
  );
}
