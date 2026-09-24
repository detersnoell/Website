import Image from "next/image";
import Link from "@/components/AppLink";
import { allProducts, bundles, bundlePrice, products } from "@/lib/catalog/products";
import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { NeedsSelector } from "@/components/NeedsSelector";
import { Accordion } from "@/components/Accordion";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ButtonLink } from "@/components/Button";
import styles from "./page.module.css";

const proofs = [
  { title: "NPS-zertifiziert", text: "Natural Product Standard, approved by BDIH." },
  { title: "Aus dem Allgäu", text: "Hergestellt in einer Naturkosmetik-Manufaktur." },
  { title: "Seifen- und schaumfrei", text: "Mild und auf Hundehaut abgestimmt." },
  { title: "Von einer Züchterin", text: "Entwickelt aus 35 Jahren Erfahrung mit Hunden." },
];

const faq = [
  {
    title: "Warum schäumen die Shampoos nicht?",
    content:
      "Schaum sagt nichts über die Reinigungsleistung aus. Unsere Shampoos reinigen mit milden, pflanzlichen Tensiden und kommen ohne Seife und Schaum aus. So lassen sie sich leichter und vollständig ausspülen.",
  },
  {
    title: "Was bedeutet NPS-zertifiziert?",
    content:
      "Der Natural Product Standard (NPS), approved by BDIH, zeichnet die Natürlichkeit von Pflegeprodukten aus, die keine Kosmetik im rechtlichen Sinn sind, etwa Pflege für Tiere. Erlaubt sind nur natürliche, nicht gentechnisch veränderte Rohstoffe und naturidentische Konservierungsstoffe. Die Einhaltung kontrolliert die IONC GmbH.",
  },
  {
    title: "Welches Shampoo passt zu meinem Hund?",
    content: (
      <>
        Bei empfindlicher, zu Reizungen neigender Haut der Warmduscher. Bei robustem Fell, wenn Glanz und Kämmbarkeit zählen, der Raufbold.{" "}
        <Link href="#auswahl" className="link">
          Zur Auswahlhilfe
        </Link>
      </>
    ),
  },
  {
    title: "Was kostet der Versand?",
    content: `Innerhalb Deutschlands ${formatPrice(store.shippingCostDE)} mit ${store.carrier}, ab ${formatPrice(store.freeShippingThreshold)} Bestellwert versandkostenfrei. Versand innerhalb Europas auf Anfrage.`,
  },
  { title: "Werden die Produkte an Tieren getestet?", content: "Nein. Wir testen grundsätzlich nicht an Tieren." },
];

export default function Home() {
  return (
    <>
      {/* Erster Eindruck: das Motiv mit den Notizen, erst danach die Produkte */}
      <section className={styles.intro} aria-labelledby="hero-title">
        <div className={styles.introImage}>
          <Image
            src="/images/brand/hero-shampoos.jpg"
            alt="Warmduscher und Raufbold nebeneinander, mit handschriftlichen Notizen: reinigt gereizte Haut, spendet Feuchtigkeit, mit Lavendelöl; macht starkes, gesundes und glänzendes Fell, mit Bio-Arganöl, sorgt für leichte Kämmbarkeit."
            width={1145}
            height={1270}
            priority
            fetchPriority="high"
            sizes="(max-width: 767px) 100vw, 60vw"
          />
        </div>
        <div className={`container ${styles.introText}`}>
          <h1 id="hero-title" className="display-l">
            Natürliche Pflege für Fell, Haut und Pfoten.
          </h1>
          <p className="body-l muted">Entwickelt von einer Züchterin, hergestellt in einer kleinen Manufaktur im Allgäu.</p>
          <ButtonLink href="#produkte">Unsere Produkte</ButtonLink>
        </div>
      </section>

      <section id="produkte" className={styles.products} aria-labelledby="produkte-title">
        <div className="container">
          <h2 id="produkte-title" className={`display-l ${styles.sectionTitle}`}>
            Unsere Produkte
          </h2>
          <div className={styles.shelf}>
            {allProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Warum Maybrooks" className={styles.proof}>
        <ul className={`container ${styles.proofList}`}>
          {proofs.map((p) => (
            <li key={p.title}>
              <p className={styles.proofTitle}>{p.title}</p>
              <p className={styles.proofText}>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="auswahl" className="section" aria-labelledby="auswahl-title">
        <div className="container">
          <h2 id="auswahl-title" className={`display-l ${styles.sectionTitle}`}>
            Welche Pflege braucht dein Hund?
          </h2>
          <NeedsSelector />
        </div>
      </section>

      <section className="section" aria-labelledby="daniela-title">
        <div className={`container ${styles.founder}`}>
          <div className={styles.founderImage}>
            <Image src="/images/brand/gruenderin-mit-hund.jpg" alt="Daniela Köchling, Gründerin von Maybrooks, mit ihrem Hund" fill sizes="(max-width: 899px) 100vw, 42vw" />
          </div>
          <div className={styles.founderText}>
            <h2 id="daniela-title" className="visually-hidden">
              Die Gründerin
            </h2>
            <blockquote className="display-m">
              „Seit 35 Jahren habe ich Hunde in meinem Leben. Viele von ihnen haben Unverträglichkeiten und Allergien. Hautprobleme sind ein echter
              Stressfaktor, für Tiere und für ihre Besitzer.“
            </blockquote>
            <p className="muted">Daniela Köchling, Züchterin, Hundetrainerin und Gründerin von Maybrooks</p>
            <Link href="/ueber-uns" className="link">
              Unsere Geschichte
            </Link>
          </div>
        </div>
      </section>

      <section id="sets" className={`section ${styles.tinted}`} aria-labelledby="sets-title">
        <div className="container">
          <h2 id="sets-title" className={`display-l ${styles.sectionTitle}`}>
            Sets
          </h2>
          <ul className={styles.sets}>
            {bundles.map((b) => {
              const price = bundlePrice(b);
              return (
                <li key={b.slug} className={styles.set}>
                  <div className={styles.setText}>
                    <h3 className={styles.setName}>{b.name}</h3>
                    <p className={styles.setItems}>{b.items.map((it) => products[it.slug].name).join(" und ")}</p>
                    <p className="muted">{b.description}</p>
                  </div>
                  <p className={styles.setPrice}>
                    <span className="num">{formatPrice(price)}</span>
                    {price >= store.freeShippingThreshold && <span className={styles.freeTag}>Versandkostenfrei</span>}
                  </p>
                  <div className={styles.setAction}>
                    <AddToCartButton
                      items={b.items.map((it) => ({ sku: products[it.slug].variants[0].sku, qty: it.qty }))}
                      label="In den Warenkorb"
                      variant="secondary"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.splitHead}>
            <h2 id="faq-title" className="display-l">
              Häufige Fragen
            </h2>
            <Link href="/hilfe" className="link">
              Alle Fragen und Kontakt
            </Link>
          </div>
          <Accordion items={faq} />
        </div>
      </section>
    </>
  );
}
