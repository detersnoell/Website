import Image from "next/image";
import Link from "@/components/AppLink";
import { allProducts } from "@/lib/catalog/products";
import { store } from "@/lib/store";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Image src="/images/brand/wappen.png" alt="Maybrooks Cottage" width={150} height={171} className={styles.seal} />
          <p className={styles.claim}>Natürliche Pflege für Fell, Haut und Pfoten. Hergestellt in einer Naturkosmetik-Manufaktur im Allgäu.</p>
        </div>

        <nav aria-label="Produkte" className={styles.col}>
          <ul>
            {allProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/#sets">Sets</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Service" className={styles.col}>
          <ul>
            <li>
              <Link href="/ueber-uns">Über uns</Link>
            </li>
            <li>
              <Link href="/hilfe">Hilfe und Kontakt</Link>
            </li>
            <li>
              <Link href="/hilfe#versand">Versand</Link>
            </li>
            <li>
              <Link href="/hilfe#kontakt">Für Händler</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.col}>
          <p className={styles.small}>Fragen zu einer Bestellung oder zur Pflege deines Hundes?</p>
          <a className="link" href={`mailto:${store.contact.email}`}>
            {store.contact.email}
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {new Date().getFullYear()} {store.legalName}. Alle Preise inkl. MwSt.
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
            <Link href="/versand-zahlung">Versand und Zahlung</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
