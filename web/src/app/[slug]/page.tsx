import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProducts, bundles, bundlePrice, getProduct, productOrder, products } from "@/lib/catalog/products";
import { formatPrice, unitPricePerLitre } from "@/lib/money";
import { store } from "@/lib/store";
import { Gallery } from "@/components/Gallery";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Accordion } from "@/components/Accordion";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";
import styles from "./page.module.css";

export function generateStaticParams() {
  return productOrder.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: p.seo.title, description: p.seo.description, images: [p.images[0].src] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const v = p.variants[0];
  const alt = p.notFor.alternative ? products[p.notFor.alternative] : undefined;
  const isShampoo = p.kind === "Shampoo";
  const companion = isShampoo ? products.hasenfuessin : undefined;
  const duo = bundles.find((b) => b.items.some((i) => i.slug === p.slug) && b.items.length === 2);
  const others = allProducts.filter((x) => x.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.seo.description,
    image: p.images.map((i) => `https://www.maybrooks.de${i.src}`),
    sku: v.sku,
    brand: { "@type": "Brand", name: "Maybrooks" },
    offers: {
      "@type": "Offer",
      price: (v.priceGross / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: v.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://www.maybrooks.de/${p.slug}`,
    },
  };

  return (
    <div style={{ "--accent": p.accent } as React.CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className={`container ${styles.top}`}>
        <div className={styles.gallery}>
          <Gallery images={p.images} name={p.name} />
        </div>

        <aside className={styles.buy} aria-label="Kaufen">
          <nav className={`small muted ${styles.crumbs}`} aria-label="Brotkrumen">
            <Link href="/">Start</Link> / <Link href="/#produkte">Produkte</Link> / <span aria-current="page">{p.name}</span>
          </nav>
          <p className={`label ${styles.kind}`}>{p.kind}</p>
          <h1 className="display-l">{p.name}</h1>
          <p className="body-l">{p.forWhom}</p>

          <div className={styles.priceBlock}>
            <p className={styles.price}>
              <span className="num">{formatPrice(v.priceGross)}</span>
              <span className="small muted num">
                {v.size.value} {v.size.unit} · {unitPricePerLitre(v.priceGross, v.size.value)}
              </span>
            </p>
            <p className="small muted">
              Inkl. MwSt., zzgl.{" "}
              <Link href="/hilfe#versand" className="link">
                Versand
              </Link>{" "}
              · ab {formatPrice(store.freeShippingThreshold)} versandkostenfrei
            </p>
            <p className={`small ${styles.stock}`}>
              <span className={styles.dot} data-in={v.inStock} /> {v.inStock ? "Auf Lager" : "Derzeit nicht verfügbar"} · {store.dispatchNote}
            </p>
          </div>

          <div id="kaufen">
            <AddToCartButton items={[{ sku: v.sku, qty: 1 }]} productLabel={p.name} />
          </div>

          <ul className={styles.highlights}>
            {p.highlights.map((h) => (
              <li key={h}>
                <Icon name="check" size={18} />
                {h}
              </li>
            ))}
            <li>
              <Icon name="check" size={18} />
              {store.certification.short}
              {p.vegan ? " · vegan" : ""}
            </li>
          </ul>

          {companion && (
            <div className={styles.companion}>
              <p className="label muted">Passt dazu</p>
              <Link href={`/${companion.slug}`} className={styles.companionLink}>
                <span className={styles.companionName}>{companion.name}</span>
                <span className="small muted">{companion.forWhom}</span>
              </Link>
              <span className="num small">{formatPrice(companion.variants[0].priceGross)}</span>
            </div>
          )}
        </aside>
      </div>

      {/* A · Für wen – und für wen nicht */}
      <section className={`section ${styles.module}`} aria-labelledby="fuer-wen">
        <div className={`container ${styles.split}`}>
          <h2 id="fuer-wen" className="display-m reveal">
            Für wen {p.name} gemacht ist
          </h2>
          <div className={`${styles.prose} reveal`}>
            <p className="body-l">{p.lead}</p>
            <p className={styles.notFor}>
              <strong>Nicht ideal, wenn …</strong> {p.notFor.text}{" "}
              {alt && (
                <Link href={`/${alt.slug}`} className="link">
                  Zu {alt.name}
                </Link>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* B · Wirkstoffe */}
      <section className={`section ${styles.module} ${styles.tinted}`} aria-labelledby="wirkstoffe">
        <div className="container">
          <h2 id="wirkstoffe" className={`display-m reveal ${styles.moduleTitle}`}>
            Was es besonders macht
          </h2>
          <ol className={styles.keys}>
            {p.keyIngredients.map((k, i) => (
              <li key={k.name} className="reveal">
                <span className="small muted num">0{i + 1}</span>
                <p className={styles.keyName}>{k.name}</p>
                <p className="muted">{k.benefit}.</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* C · Anwendung */}
      <section className={`section ${styles.module}`} aria-labelledby="anwendung">
        <div className={`container ${styles.split}`}>
          <div className="reveal">
            <h2 id="anwendung" className="display-m">
              Anwendung
            </h2>
            <dl className={styles.facts}>
              <div>
                <dt className="small muted">Duft</dt>
                <dd>{p.scent}</dd>
              </div>
              <div>
                <dt className="small muted">Anwendung</dt>
                <dd>{p.frequency}</dd>
              </div>
              <div>
                <dt className="small muted">Inhalt</dt>
                <dd className="num">
                  {v.size.value} {v.size.unit}
                </dd>
              </div>
            </dl>
          </div>
          <ol className={`${styles.steps} reveal`}>
            {p.usage.map((u, i) => (
              <li key={i}>
                <span className={styles.stepNum}>{i + 1}</span>
                <p>{u}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* D · Alle Inhaltsstoffe + E · Zertifikat */}
      <section id="inhaltsstoffe" className={`section ${styles.module}`} aria-labelledby="inci">
        <div className={`container ${styles.split}`}>
          <div className="reveal">
            <h2 id="inci" className="display-m">
              Alle Inhaltsstoffe
            </h2>
            <p className="muted" style={{ marginTop: "var(--s-4)" }}>
              Vollständig und in der Reihenfolge der Menge. * aus kontrolliert biologischem Anbau.
            </p>
            <p className={`small ${styles.certNote}`}>
              <strong>{store.certification.short}</strong> · {store.certification.long}, kontrolliert durch die {store.certification.controlledBy}. Hergestellt in einer
              Naturkosmetik-Manufaktur im Allgäu, Verpackung FSC-zertifiziert.
            </p>
          </div>
          <table className={`${styles.inci} reveal`}>
            <thead>
              <tr>
                <th scope="col">INCI</th>
                <th scope="col">Was es ist</th>
              </tr>
            </thead>
            <tbody>
              {p.inci.map((x) => (
                <tr key={x.inci}>
                  <td>
                    {x.inci}
                    {x.organic ? "*" : ""}
                  </td>
                  <td>{x.plain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* G · Fragen */}
      <section className={`section ${styles.module}`} aria-labelledby="fragen">
        <div className={`container ${styles.split}`}>
          <h2 id="fragen" className="display-m reveal">
            Fragen zu {p.name}
          </h2>
          <Accordion items={p.faq.map((f) => ({ title: f.q, content: f.a }))} />
        </div>
      </section>

      {/* H · Passt dazu / Duo */}
      <section className={`section ${styles.module} ${styles.tinted}`} aria-labelledby="dazu">
        <div className="container">
          <h2 id="dazu" className={`display-m reveal ${styles.moduleTitle}`}>
            Passt dazu
          </h2>
          <div className={styles.related}>
            {others.map((o, i) => (
              <ProductCard key={o.slug} product={o} index={i} />
            ))}
            {duo && (
              <div className={`${styles.duo} reveal`}>
                <p className="label muted">Set</p>
                <p className="display-m">{duo.name}</p>
                <p className="muted">{duo.description}</p>
                <p className={styles.price}>
                  <span className="num">{formatPrice(bundlePrice(duo))}</span>
                </p>
                <AddToCartButton
                  items={duo.items.map((it) => ({ sku: products[it.slug].variants[0].sku, qty: it.qty }))}
                  label="Set in den Warenkorb"
                  variant="secondary"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <StickyBuyBar targetId="kaufen" name={p.name} sku={v.sku} price={v.priceGross} />
    </div>
  );
}
