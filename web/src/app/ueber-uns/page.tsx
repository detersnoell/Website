import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/lib/catalog/products";
import { ButtonLink } from "@/components/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Maybrooks ist ein Familienbetrieb: natürliche Pflege für Hunde, entwickelt von der Züchterin Daniela Köchling und hergestellt in einer Naturkosmetik-Manufaktur im Allgäu.",
};

const names: Record<string, string> = {
  warmduscher: "für die Sensiblen, deren Haut schnell gereizt ist.",
  raufbold: "für die Robusten mit dichtem, langem Fell.",
  hasenfuessin: "für die Pfoten von Jederhund, ob Langstreckenläufer oder Stubenhocker.",
};

export default function UeberUns() {
  return (
    <>
      <header className={`container ${styles.hero}`}>
        <Image src="/images/brand/wappen.png" alt="Wappen von Maybrooks Cottage" width={150} height={171} className={styles.crest} priority />
        <h1 className="display-xl">Aus Erfahrung mit empfindlichen Hunden.</h1>
        <p className={`body-l ${styles.intro}`}>
          Maybrooks ist ein Familienbetrieb. Unsere Pflege entsteht in einer kleinen Naturkosmetik-Manufaktur im Allgäu, nach Standards, die eine unabhängige
          Stelle prüft.
        </p>
      </header>

      <section className={styles.chapter} aria-labelledby="anfang">
        <div className={`container ${styles.founder}`}>
          <div className={styles.founderImage}>
            <Image src="/images/brand/gruenderin-mit-hund.jpg" alt="Daniela Köchling mit ihrem Hund auf einer Bank vor dem Haus" fill sizes="(max-width: 767px) 100vw, 45vw" />
          </div>
          <div className={styles.text}>
            <h2 id="anfang" className="display-m">
              Wie es angefangen hat
            </h2>
            <p className="body-l">
              Seit 35 Jahren leben Hunde in Daniela Köchlings Alltag, als Züchterin, als Hundetrainerin und als Halterin. Viele der Hunde, die sie kennt,
              haben Unverträglichkeiten und Allergien. Oft zeigt sich das an der Haut, und das belastet Hund und Mensch gleichermaßen.
            </p>
            <p>
              Daraus entstand der Wunsch nach einer Pflege, die gründlich reinigt, ohne die Haut zu belasten. Oder, wie Daniela es sagt:
            </p>
            <blockquote className={styles.quote}>„Duschen soll Spaß machen, und Jucken und Kratzen sollen der Vergangenheit angehören.“</blockquote>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.tinted}`} aria-labelledby="philosophie">
        <div className={`container ${styles.split}`}>
          <h2 id="philosophie" className="display-l">
            Inhaltsstoffe, für die man keinen Übersetzer braucht.
          </h2>
          <div className={styles.text}>
            <p className="body-l">
              Wir verwenden nur natürliche Inhaltsstoffe und schreiben jeden davon offen auf die Produktseite, mit einer Erklärung in verständlicher Sprache.
            </p>
            <p>
              Die Shampoos kommen ohne Seife und ohne Schaum aus und sind auf den pH-Wert der Hundehaut abgestimmt. Keine synthetischen Duftstoffe, kein Erdöl,
              keine Silikone, keine Gentechnik. Getestet wird an freiwilligen Menschen, nie an Tieren.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.chapter} aria-labelledby="allgaeu">
        <div className={`container ${styles.dogs}`}>
          <div className={styles.dogTall}>
            <Image src="/images/brand/vizslas-dune.jpg" alt="Zwei Vizslas sitzen nebeneinander in den Dünen" fill sizes="(max-width: 767px) 60vw, 30vw" />
          </div>
          <div className={styles.text}>
            <h2 id="allgaeu" className="display-m">
              Aus dem Allgäu
            </h2>
            <p className="body-l">
              Hergestellt werden unsere Produkte in einer kleinen Manufaktur für Naturkosmetik im Allgäu. Auch die Faltschachteln kommen aus Deutschland und
              sind FSC-zertifiziert, also aus verantwortungsvoller Forstwirtschaft.
            </p>
            <div className={styles.dogWide}>
              <Image src="/images/brand/puppies.jpg" alt="Drei Vizsla-Welpen" fill sizes="(max-width: 767px) 100vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.tinted}`} aria-labelledby="namen">
        <div className={`container ${styles.split}`}>
          <div className={styles.text}>
            <h2 id="namen" className="display-l">
              Warum sie so heißen
            </h2>
            <p className="muted">Unsere Produkte heißen nach den Hunden, für die sie gemacht sind.</p>
          </div>
          <ul className={styles.names}>
            {allProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className={styles.nameRow}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.nameText}>{names[p.slug]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="standards" className={styles.chapter} aria-labelledby="standards-title">
        <div className={`container ${styles.split}`}>
          <h2 id="standards-title" className="display-l">
            Unsere Standards
          </h2>
          <div className={styles.text}>
            <h3>Zertifiziert natürlich</h3>
            <p>
              Alle Produkte sind nach dem Natural Product Standard (NPS), approved by BDIH, zertifiziert. Das Siegel zeichnet die Natürlichkeit von Produkten
              aus, die keine Kosmetik im rechtlichen Sinn sind. Erlaubt sind nur natürliche, nicht gentechnisch veränderte Rohstoffe, naturidentische
              Konservierungsstoffe und natürliche Herstellungsverfahren. Die Einhaltung kontrolliert laufend die IONC GmbH.
            </p>
            <h3>Bis zur Verpackung</h3>
            <p>Vom Tropfen Arganöl im Raufbold bis zur Faltschachtel folgt alles denselben Richtlinien.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.closing}`} aria-label="Weiter">
        <div className={`container ${styles.closingInner}`}>
          <p className="display-m">Drei Produkte, für jeden Hund das passende.</p>
          <div className={styles.actions}>
            <ButtonLink href="/#produkte">Zu den Produkten</ButtonLink>
            <Link href="/hilfe#kontakt" className="link">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
