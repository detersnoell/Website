import type { Cents, ProductSlug } from "../catalog/types";

export interface CartLine {
  /** Backend-spezifischer Schlüssel der Position */
  id: string;
  sku: string;
  slug?: ProductSlug;
  name: string;
  qty: number;
  unitPrice: Cents;
  image?: string;
  size?: string;
}

export interface Cart {
  lines: CartLine[];
  itemCount: number;
  subtotal: Cents;
  currency: "EUR";
}

export interface AddItem {
  sku: string;
  qty: number;
}

/**
 * Einzige Schnittstelle zwischen Oberfläche und Commerce-Backend.
 * Die UI kennt nur diese Methoden; das Backend (lokal, WooCommerce,
 * später z. B. Medusa) ist austauschbar.
 */
export interface CommerceAdapter {
  readonly id: string;
  getCart(): Promise<Cart>;
  addItems(items: AddItem[]): Promise<Cart>;
  setQuantity(lineId: string, qty: number): Promise<Cart>;
  removeLine(lineId: string): Promise<Cart>;
}

export const emptyCart: Cart = { lines: [], itemCount: 0, subtotal: 0, currency: "EUR" };

export function summarize(lines: CartLine[]): Cart {
  return {
    lines,
    itemCount: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.qty * l.unitPrice, 0),
    currency: "EUR",
  };
}

/* ───────────── Checkout & Bestellung (anbieterunabhängig) ───────────── */

export interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  country: "DE";
}

export interface CustomerInput {
  email: string;
  shipping: Address;
  /** undefined = wie Lieferadresse */
  billing?: Address;
  marketingConsent: boolean;
}

export interface ShippingQuote {
  id: "dhl-de";
  label: string;
  carrier: "DHL";
  priceGross: Cents;
}

export interface OrderTotals {
  subtotal: Cents;
  shipping: Cents;
  total: Cents;
  /** enthaltene Umsatzsteuer (19 %) */
  vatIncluded: Cents;
  currency: "EUR";
}

/** Bestellentwurf: Snapshot aller Positionen, bevor bezahlt wird. */
export interface OrderDraft {
  id: string;
  createdAt: string;
  lines: CartLine[];
  customer: CustomerInput;
  shipping: ShippingQuote;
  totals: OrderTotals;
}

export type PaymentMethod = "card" | "paypal" | "apple_pay" | "google_pay" | "klarna" | "sepa";

export type CheckoutResult =
  | { status: "requires_payment"; draft: OrderDraft; methods: PaymentMethod[]; clientSecret?: string }
  | { status: "unavailable"; reason: string };

/**
 * Schnittstelle für Bestellanlage und Zahlung.
 * Später z. B. WooCommerce Store API (/checkout) + eingebettetes Stripe/PayPal.
 */
export interface CheckoutAdapter {
  readonly id: string;
  createOrder(draft: OrderDraft): Promise<CheckoutResult>;
}
