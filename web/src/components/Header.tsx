"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { allProducts } from "@/lib/catalog/products";
import { formatPrice } from "@/lib/money";
import { useCart } from "./CartProvider";
import { Icon } from "./Icon";
import styles from "./Header.module.css";

export function Header() {
  const { cart, openDrawer, badgePulse, ready } = useCart();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  // Beim Herunterscrollen ausblenden, beim Hochscrollen zeigen
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (y < 120) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      if (Math.abs(delta) > 8) last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setPanelOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openPanel = () => {
    clearTimeout(panelTimer.current);
    panelTimer.current = setTimeout(() => setPanelOpen(true), 120);
  };
  const closePanel = () => {
    clearTimeout(panelTimer.current);
    panelTimer.current = setTimeout(() => setPanelOpen(false), 200);
  };

  return (
    <>
      <header className={styles.header} data-hidden={hidden && !menuOpen && !panelOpen}>
        <div className={`container ${styles.bar}`}>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
            <span className="visually-hidden">{menuOpen ? "Menü schließen" : "Menü öffnen"}</span>
          </button>

          <Link href="/" className={styles.wordmark} aria-label="Maybrooks – Startseite">
            Maybrooks
          </Link>

          <nav className={styles.nav} aria-label="Hauptnavigation">
            <div className={styles.navItem} onMouseEnter={openPanel} onMouseLeave={closePanel}>
              <button
                type="button"
                className={styles.navLink}
                aria-expanded={panelOpen}
                aria-controls="products-panel"
                onClick={() => setPanelOpen((o) => !o)}
              >
                Produkte
              </button>
              <div id="products-panel" className={styles.panel} data-open={panelOpen}>
                <div className={`container ${styles.panelInner}`}>
                  {allProducts.map((p) => (
                    <Link key={p.slug} href={`/${p.slug}`} className={styles.panelCard}>
                      <span className={styles.panelImage}>
                        <Image src={p.images[0].src} alt="" fill sizes="96px" style={{ objectPosition: p.images[0].focus }} />
                      </span>
                      <span>
                        <span className={styles.panelName}>{p.name}</span>
                        <span className={`small muted ${styles.panelFor}`}>{p.forWhom}</span>
                        <span className="small num">{formatPrice(p.variants[0].priceGross)}</span>
                      </span>
                    </Link>
                  ))}
                  <div className={styles.panelAside}>
                    <Link href="/#sets" className="link small">
                      Sets &amp; Duos
                    </Link>
                    <Link href="/#auswahl" className="link small">
                      Welche Pflege passt?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/manufaktur" className={styles.navLink} aria-current={pathname === "/manufaktur" ? "page" : undefined}>
              Manufaktur
            </Link>
            <Link href="/hilfe" className={styles.navLink} aria-current={pathname === "/hilfe" ? "page" : undefined}>
              Hilfe
            </Link>
          </nav>

          <button type="button" className={styles.cartButton} onClick={openDrawer}>
            <Icon name="bag" size={22} />
            <span className={styles.cartLabel}>Warenkorb</span>
            <span key={badgePulse} className={styles.badge} data-empty={!ready || cart.itemCount === 0}>
              {cart.itemCount}
            </span>
            <span className="visually-hidden">, {cart.itemCount} Artikel</span>
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={styles.sheet} data-open={menuOpen} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Menü">
          <p className={`label muted ${styles.sheetLabel}`}>Produkte</p>
          <ul className={styles.sheetProducts}>
            {allProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className={styles.sheetProduct}>
                  <span className={styles.sheetImage}>
                    <Image src={p.images[0].src} alt="" fill sizes="72px" style={{ objectPosition: p.images[0].focus }} />
                  </span>
                  <span>
                    <span className={styles.sheetName}>{p.name}</span>
                    <span className="small muted">{p.forWhom}</span>
                  </span>
                  <span className="small num">{formatPrice(p.variants[0].priceGross)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.sheetLinks}>
            <li>
              <Link href="/#sets">Sets &amp; Duos</Link>
            </li>
            <li>
              <Link href="/manufaktur">Manufaktur</Link>
            </li>
            <li>
              <Link href="/hilfe">Hilfe &amp; Kontakt</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
