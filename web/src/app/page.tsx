import Image from "next/image";
import Link from "next/link";
import { allProducts, bundles, bundlePrice, products } from "@/lib/catalog/products";
import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { NeedsSelector } from "@/components/NeedsSelector";
import { Accordion } from "@/components/Accordion";
import { AddToCartButton } from "@/components/AddToCartButton";
import styles from "./page.module.css";

const proofs = [
  { title: "NPS-zertifiziert", text: "Natural Product Standard, approved by BDIH" },
  { title: "Allgäuer Manufaktur", text: "Hergestellt in einer Naturkosmetik-Manufaktur" },
  { title: "Seifen- & schaumfrei", text: "Mild und pH-angepasst an Hundehaut" },
  { title: "Von einer Züchterin", text: "35 Jahre Erfahrung mit empfindlichen Hunden" },
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
        Bei empfindlicher, zu Reizungen neigender Haut der Warmduscher, bei robustem Fell mit Wunsch nach Glanz und Kämmbarkeit der Raufbold.{" "}
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
      {/* 1 · Hero-Regal: die Produkte sind der Hero */}
      <section id="produkte" className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <div className={styles.heroHead}>
            <h1 id="hero-title" className="display-xl">
              Natürliche Pflege für Fell, Haut und&nbsp;Pfoten.
            </h1>
            <p className={`body-l muted ${styles.heroProof}`}>NPS-zertifiziert · Manufaktur im Allgäu · entwickelt von einer Züchterin</p>
          </div>
          <div className={styles.shelf}>
            {allProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i === 0} index={i} entrance="load" />
            ))}
          </div>
        </div>
      </section>

      {/* 2 · Beweisleiste */}
      <section aria-label="Warum Maybrooks" className={styles.proof}>
        <ul className={`container ${styles.proofList}`}>
          {proofs.map((p) => (
            <li key={p.title}>
              <p className={styles.proofTitle}>{p.title}</p>
              <p className="small muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 · Auswahl nach Bedarf */}
      <section id="auswahl" className="section" aria-labelledby="auswahl-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <p className="label muted">Auswahlhilfe</p>
            <h2 id="auswahl-title" className="display-l">
              Welche Pflege braucht dein Hund?
            </h2>
          </header>
          <NeedsSelector />
        </div>
      </section>

      {/* 4 · Was drin ist */}
      <section className={`section ${styles.ingredients}`} aria-labelledby="inhalt-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <p className="label muted">Inhaltsstoffe</p>
            <h2 id="inhalt-title" className="display-l">
              Was drin ist. Und was nicht.
            </h2>
            <p className="body-l muted">Jeder Inhaltsstoff steht offen auf der Produktseite, übersetzt in verständliche Sprache.</p>
          </header>
          <div className={styles.ingredientGrid}>
            {allProducts.map((p) => (
              <div key={p.slug} className={`${styles.ingredient} reveal`} style={{ "--accent": p.accent } as React.CSSProperties}>
                <p className={`label ${styles.ingredientProduct}`}>{p.name}</p>
                <p className="display-m">{p.keyIngredients[0].name}</p>
                <p className="muted">{p.keyIngredients[0].benefit}.</p>
                <Link href={`/${p.slug}#inhaltsstoffe`} className="link small">
                  Alle Inhaltsstoffe
                </Link>
              </div>
            ))}
          </div>
          <div className={`${styles.without} reveal`}>
            <p className="label muted">Nicht in unseren Produkten</p>
            <ul>
              {["Seife", "Synthetische Duftstoffe", "Silikone", "Erdöl & Derivate", "Gentechnik", "Tierversuche"].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.cert} reveal`}>
            <p className={styles.certMark}>NPS</p>
            <div>
              <p className={styles.proofTitle}>Zertifiziert natürlich</p>
              <p className="muted">
                Unsere Produkte tragen den Natural Product Standard, approved by BDIH. Nur natürliche, nicht gentechnisch veränderte Rohstoffe; Herstellung und
                Konservierung nach strengen Kriterien, laufend kontrolliert durch die IONC GmbH.
              </p>
              <Link href="/manufaktur#standards" className="link small">
                Unsere Standards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · Daniela */}
      <section className="section" aria-labelledby="daniela-title">
        <div className={`container ${styles.founder}`}>
          <div className={`${styles.founderImage} reveal`}>
            <Image src="/images/brand/gruenderin-mit-hund.jpg" alt="Daniela, Gründerin von Maybrooks, mit ihrem Hund" fill sizes="(max-width: 899px) 100vw, 42vw" />
          </div>
          <div className={`${styles.founderText} reveal`}>
            <p className="label muted">Die Gründerin</p>
            <h2 id="daniela-title" className="visually-hidden">
              Daniela, Gründerin von Maybrooks
            </h2>
            <blockquote className="display-m">
              „Seit 35 Jahren habe ich Hunde in meinem Leben. Viele von ihnen haben Unverträglichkeiten und Allergien. Hautprobleme sind ein echter
              Stressfaktor, für Tiere und für ihre Besitzer.“
            </blockquote>
            <p className="muted">Daniela Köchling · Züchterin, Hundetrainerin und Gründerin von Maybrooks</p>
            <Link href="/manufaktur" className="link">
              Die Manufaktur kennenlernen
            </Link>
          </div>
        </div>
      </section>

      {/* 7 · Sets */}
      <section id="sets" className={`section ${styles.sets}`} aria-labelledby="sets-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <p className="label muted">Sets</p>
            <h2 id="sets-title" className="display-l">
              Shampoo wählen, Pfoten mitpflegen.
            </h2>
          </header>
          <div className={styles.setGrid}>
            {bundles.map((b) => {
              const price = bundlePrice(b);
              return (
                <article key={b.slug} className={`${styles.set} reveal`}>
                  <div className={styles.setImages}>
                    {b.items.map((it) => (
                      <span key={it.slug} className={styles.setImage}>
                        <Image src={products[it.slug].images[0].src} alt="" fill sizes="(max-width: 899px) 30vw, 12vw" />
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.setName}>{b.name}</h3>
                  <p className="small muted">{b.description}</p>
                  <p className={styles.setPrice}>
                    <span className="num">{formatPrice(price)}</span>
                    {price >= store.freeShippingThreshold && <span className={`small ${styles.freeTag}`}>Versandkostenfrei</span>}
                  </p>
                  <AddToCartButton
                    items={b.items.map((it) => ({ sku: products[it.slug].variants[0].sku, qty: it.qty }))}
                    label="Set in den Warenkorb"
                    variant="secondary"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className={`container ${styles.faq}`}>
          <header className="reveal">
            <p className="label muted">Fragen</p>
            <h2 id="faq-title" className="display-l">
              Gut zu wissen.
            </h2>
            <Link href="/hilfe" className="link">
              Alle Fragen &amp; Kontakt
            </Link>
          </header>
          <Accordion items={faq} />
        </div>
      </section>
    </>
  );
}
