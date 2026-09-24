"use client";

import Link from "@/components/AppLink";
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
  const headerRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelButtonRef = useRef<HTMLButtonElement>(null);
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

  // Mobiles Menü: Scroll sperren, Fokus hinein und beim Schließen zurück zum Button
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Produkte-Panel: Escape und Klick außerhalb schließen
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        panelButtonRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [panelOpen]);

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
      <header ref={headerRef} className={styles.header} data-hidden={hidden && !menuOpen && !panelOpen}>
        <div className={`container ${styles.bar}`}>
          <button
            ref={menuButtonRef}
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
                ref={panelButtonRef}
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
                    <Link href="/#auswahl" className="link small">
                      Welche Pflege passt?
                    </Link>
                    <Link href="/#sets" className="link small">
                      Sets
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/ueber-uns" className={styles.navLink} aria-current={pathname === "/ueber-uns" ? "page" : undefined}>
              Über uns
            </Link>
            <Link href="/hilfe" className={styles.navLink} aria-current={pathname === "/hilfe" ? "page" : undefined}>
              Hilfe
            </Link>
          </nav>

          <button type="button" className={styles.cartButton} onClick={openDrawer}>
            <span className={styles.cartIcon}>
              <Icon name="bag" size={22} />
            </span>
            <span className={styles.cartLabel}>Warenkorb</span>
            <span key={badgePulse} className={`num ${styles.count}`} data-empty={!ready || cart.itemCount === 0}>
              {ready ? cart.itemCount : 0}
            </span>
            <span className="visually-hidden"> Artikel</span>
          </button>
        </div>
      </header>

      <div ref={sheetRef} id="mobile-menu" className={styles.sheet} data-open={menuOpen} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Menü">
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
              <Link href="/#sets">Sets</Link>
            </li>
            <li>
              <Link href="/ueber-uns">Über uns</Link>
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
