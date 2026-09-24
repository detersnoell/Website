import type { Metadata } from "next";
import Link from "@/components/AppLink";
import { notFound } from "next/navigation";
import { allProducts, bundles, bundlePrice, getProduct, productOrder, products } from "@/lib/catalog/products";
import { formatPrice, unitPricePerLitre } from "@/lib/money";
import { store } from "@/lib/store";
import { Gallery } from "@/components/Gallery";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { TrackView } from "@/components/TrackView";
import Image from "next/image";
import { ComparisonDialog } from "@/components/ComparisonDialog";
import { Accordion } from "@/components/Accordion";
import { ProductCard } from "@/components/ProductCard";
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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackView
        event="view_item"
        payload={{ value: v.priceGross / 100, items: [{ item_id: v.sku, item_name: p.name, price: v.priceGross / 100, quantity: 1 }] }}
      />

      <div className={`container ${styles.top}`}>
        <div className={styles.gallery}>
          <Gallery images={p.images} name={p.name} />
        </div>

        <aside className={styles.buy} aria-label="Kaufen">
          <div className={styles.title}>
            <h1 className="display-l">{p.name}</h1>
            <p className={`body-l ${styles.for}`}>{p.forWhom}</p>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.price}>
              <span className="num">{formatPrice(v.priceGross)}</span>
              <span className={`num ${styles.unit}`}>
                {v.size.value} {v.size.unit}, {unitPricePerLitre(v.priceGross, v.size.value)}
              </span>
            </p>
            <p className="small muted">
              Inkl. MwSt., zzgl.{" "}
              <Link href="/hilfe#versand" className="link">
                Versand
              </Link>
              . Ab {formatPrice(store.freeShippingThreshold)} versandkostenfrei.
            </p>
            <p className={`small ${styles.stock}`} data-in={v.inStock}>
              {v.inStock ? "Auf Lager." : "Derzeit nicht verfügbar."} {store.dispatchNote}.
            </p>
          </div>

          <div id="kaufen">
            <AddToCartButton items={[{ sku: v.sku, qty: 1 }]} productLabel={p.name} />
          </div>

          <ul className={`ticks ${styles.highlights}`} style={{ "--tick": p.accent } as React.CSSProperties}>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
            <li>
              {store.certification.short}
              {p.vegan ? ", vegan" : ""}
            </li>
          </ul>

          <ComparisonDialog current={p.slug} />

          {companion && (
            <div className={styles.companion}>
              <p className={styles.companionLabel}>Passt dazu</p>
              <Link href={`/${companion.slug}`} className={styles.companionLink}>
                <span className={styles.companionImage}>
                  <Image
                    src={companion.images[0].src}
                    alt=""
                    fill
                    sizes="72px"
                    style={{ objectPosition: companion.images[0].focus }}
                  />
                </span>
                <span className={styles.companionText}>
                  <span className={styles.companionName}>{companion.name}</span>
                  <span className="small muted">{companion.forWhom}</span>
                </span>
                <span className="num small">{formatPrice(companion.variants[0].priceGross)}</span>
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* A · Für wen – und für wen nicht */}
      <section className={`section ${styles.module}`} aria-labelledby="fuer-wen">
        <div className={`container ${styles.split}`}>
          <h2 id="fuer-wen" className="display-m">
            Für wen {p.name} gemacht ist
          </h2>
          <div className={styles.prose}>
            <p className="body-l">{p.lead}</p>
            <p className={styles.notFor}>
              <strong>Nicht ideal, wenn</strong> {p.notFor.text}{" "}
              {alt && (
                <Link href={`/${alt.slug}`} className="link">
                  Zu {alt.name}
                </Link>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* B · Inhaltsstoffe: die wichtigsten farbig, Zertifikat hervorgehoben, Liste zum Aufklappen */}
      <section
        id="inhaltsstoffe"
        className={`section ${styles.module} ${styles.ingredients}`}
        style={{ "--accent": p.accent, "--accent-ink": `var(--accent-${p.slug}-ink)` } as React.CSSProperties}
        aria-labelledby="wirkstoffe"
      >
        <div className="container">
          <h2 id="wirkstoffe" className={`display-m ${styles.moduleTitle}`}>
            Die wichtigsten Inhaltsstoffe
          </h2>
          <ul className={styles.keys}>
            {p.keyIngredients.map((k) => (
              <li key={k.name}>
                <p className={styles.keyName}>{k.name}</p>
                <p className={styles.keyText}>{k.benefit}.</p>
              </li>
            ))}
          </ul>

          <div className={styles.ingredientsFoot}>
            <div className={styles.cert}>
              <p className={styles.certTitle}>
                <svg className={styles.certSeal} viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 24V13M16 17c-3.5 0-5.5-2.2-5.5-5.5 3.5 0 5.5 2 5.5 5.5Zm0 2.5c3.5 0 5.5-2.2 5.5-5.5-3.5 0-5.5 2-5.5 5.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                {store.certification.short}
              </p>
              <p>
                {store.certification.long}, kontrolliert durch die {store.certification.controlledBy}. Nur natürliche, nicht gentechnisch veränderte Rohstoffe.
              </p>
              <p className="small">Hergestellt in einer Naturkosmetik-Manufaktur im Allgäu. Verpackung FSC-zertifiziert.</p>
            </div>

            <div className={styles.inciWrap}>
              <Accordion
                items={[
                  {
                    title: `Alle Inhaltsstoffe (${p.inci.length})`,
                    content: (
                      <>
                        <p className="small">Vollständig und in der Reihenfolge der Menge. * aus kontrolliert biologischem Anbau.</p>
                        <table className={styles.inci}>
                          <thead>
                            <tr>
                              <th scope="col">Bezeichnung (INCI)</th>
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
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* C · Anwendung: eigener, geschlossener Bereich */}
      <section
        className={`section ${styles.module}`}
        style={{ "--accent-ink": `var(--accent-${p.slug}-ink)` } as React.CSSProperties}
        aria-labelledby="anwendung"
      >
        <div className="container">
          <div className={styles.howto}>
            <div className={styles.howtoHead}>
              <h2 id="anwendung" className="display-m">
                Anwendung
              </h2>
              <p className="muted">In drei Schritten.</p>
            </div>
            <ol className={styles.steps}>
              {p.usage.map((u, i) => (
                <li key={i}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>{u}</p>
                </li>
              ))}
            </ol>
            <dl className={styles.facts}>
              <div>
                <dt>Duft</dt>
                <dd>{p.scent}</dd>
              </div>
              <div>
                <dt>Wie oft</dt>
                <dd>{p.frequency}</dd>
              </div>
              <div>
                <dt>Inhalt</dt>
                <dd className="num">
                  {v.size.value} {v.size.unit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* G · Fragen */}
      <section className={`section ${styles.module}`} aria-labelledby="fragen">
        <div className={`container ${styles.split}`}>
          <h2 id="fragen" className="display-m">
            Fragen zu {p.name}
          </h2>
          <Accordion items={p.faq.map((f) => ({ title: f.q, content: f.a }))} />
        </div>
      </section>

      {/* H · Passt dazu / Duo */}
      <section className={`section ${styles.module} ${styles.tinted}`} aria-labelledby="dazu">
        <div className="container">
          <h2 id="dazu" className={`display-m ${styles.moduleTitle}`}>
            Passt dazu
          </h2>
          <div className={styles.related}>
            {others.map((o) => (
              <ProductCard key={o.slug} product={o} />
            ))}
            {duo && (
              <div className={styles.duo}>
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
