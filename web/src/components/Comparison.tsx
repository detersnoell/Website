import Link from "next/link";
import { allProducts } from "@/lib/catalog/products";
import type { ProductSlug } from "@/lib/catalog/types";
import { formatPrice, unitPricePerLitre } from "@/lib/money";
import styles from "./Comparison.module.css";

const rows: { label: string; value: (p: (typeof allProducts)[number]) => string }[] = [
  { label: "Geeignet für", value: (p) => p.need },
  { label: "Hauptwirkstoff", value: (p) => p.keyIngredients[0].name },
  { label: "Duft", value: (p) => p.scent },
  { label: "Anwendung", value: (p) => p.frequency },
  { label: "Inhalt", value: (p) => `${p.variants[0].size.value} ${p.variants[0].size.unit}` },
  { label: "Preis", value: (p) => formatPrice(p.variants[0].priceGross) },
  { label: "Grundpreis", value: (p) => unitPricePerLitre(p.variants[0].priceGross, p.variants[0].size.value) },
];

/** Vergleichstabelle; das aktuelle Produkt ist hervorgehoben. Auf Mobile horizontal scrollbar mit fixierter erster Spalte. */
export function Comparison({ current }: { current: ProductSlug }) {
  return (
    <div className={styles.scroller} role="region" aria-label="Produktvergleich" tabIndex={0}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td />
            {allProducts.map((p) => (
              <th key={p.slug} scope="col" data-current={p.slug === current}>
                {p.slug === current ? (
                  <span>{p.name}</span>
                ) : (
                  <Link href={`/${p.slug}`} className="link">
                    {p.name}
                  </Link>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {allProducts.map((p) => (
                <td key={p.slug} data-current={p.slug === current} className={r.label.includes("preis") || r.label === "Preis" ? "num" : undefined}>
                  {r.value(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
