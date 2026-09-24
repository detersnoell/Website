import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/lib/catalog/products";
import { store } from "@/lib/store";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>Maybrooks</p>
          <p className={styles.claim}>Natürliche Pflege für Fell, Haut und Pfoten. Hergestellt in einer Naturkosmetik-Manufaktur im Allgäu.</p>
        </div>

        <nav aria-label="Produkte" className={styles.col}>
          <p className={styles.heading}>Produkte</p>
          <ul>
            {allProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/#sets">Sets &amp; Duos</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Maybrooks" className={styles.col}>
          <p className={styles.heading}>Maybrooks</p>
          <ul>
            <li>
              <Link href="/manufaktur">Manufaktur</Link>
            </li>
            <li>
              <Link href="/manufaktur#standards">Qualität &amp; Standards</Link>
            </li>
            <li>
              <Link href="/hilfe#kontakt">Für Händler</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Hilfe" className={styles.col}>
          <p className={styles.heading}>Hilfe</p>
          <ul>
            <li>
              <Link href="/hilfe#fragen">Häufige Fragen</Link>
            </li>
            <li>
              <Link href="/hilfe#versand">Versand &amp; Lieferung</Link>
            </li>
            <li>
              <Link href="/hilfe#rueckgabe">Rückgabe</Link>
            </li>
            <li>
              <Link href="/hilfe#kontakt">Kontakt</Link>
            </li>
            <li>
              <a href={`mailto:${store.contact.email}`}>{store.contact.email}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.seal}`} aria-hidden="true">
        <Image src="/images/brand/wappen.png" alt="" width={150} height={171} className={styles.sealImage} />
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.cert}>
          {store.certification.short} · {store.certification.long}
        </p>
        <ul className={styles.legal}>
          <li>
            <Link href="/impressum">Impressum</Link>
          </li>
          <li>
            <Link href="/datenschutz">Datenschutz</Link>
          </li>
          <li>
            <Link href="/agb">AGB</Link>
          </li>
          <li>
            <Link href="/widerruf">Widerruf</Link>
          </li>
          <li>
            <Link href="/versand-zahlung">Versand &amp; Zahlung</Link>
          </li>
        </ul>
        <p>
          © {new Date().getFullYear()} {store.legalName} · Alle Preise inkl. MwSt.
        </p>
      </div>
    </footer>
  );
}
