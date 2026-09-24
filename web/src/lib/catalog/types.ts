/**
 * Anbieterunabhängiges Katalogmodell.
 * Redaktionelle Inhalte (Texte, Bilder, INCI) liegen hier; Preis und Bestand
 * können zur Laufzeit vom Commerce-Backend überschrieben werden.
 */

export type Cents = number;

export type ProductSlug = "warmduscher" | "raufbold" | "hasenfuessin";

export type ImageRole =
  | "packshot"
  | "texture"
  | "in-use"
  | "lifestyle"
  | "label"
  | "packaging";

export interface ProductImage {
  src: string;
  alt: string;
  role: ImageRole;
  width: number;
  height: number;
  /** Bildausschnitt bei Beschnitt (CSS object-position), z. B. "74% 55%" */
  focus?: string;
}

export interface Ingredient {
  name: string;
  benefit: string;
}

export interface InciEntry {
  inci: string;
  plain: string;
  organic?: boolean;
}

export interface Variant {
  sku: string;
  size: { value: number; unit: "ml" };
  priceGross: Cents;
  /** IDs im jeweiligen Commerce-Backend, z. B. WooCommerce-Produkt-ID */
  commerceIds: { woocommerce?: number };
  inStock: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  kind: "Shampoo" | "Pfotenbalsam";
  /** Klartext-Zeile: für welchen Hund, welches Problem */
  forWhom: string;
  /** Kurzform für Bedarfs-Segment */
  need: string;
  lead: string;
  notFor: { text: string; alternative?: ProductSlug };
  highlights: string[];
  keyIngredients: Ingredient[];
  usage: string[];
  inci: InciEntry[];
  vegan: boolean;
  scent: string;
  frequency: string;
  images: ProductImage[];
  variants: Variant[];
  accent: `var(--accent-${ProductSlug})`;
  faq: FaqItem[];
  seo: { title: string; description: string };
}

export interface Bundle {
  slug: string;
  name: string;
  description: string;
  items: { slug: ProductSlug; qty: number }[];
  /** undefined = Summe der Einzelpreise (noch kein Set-Rabatt entschieden) */
  priceGross?: Cents;
}
