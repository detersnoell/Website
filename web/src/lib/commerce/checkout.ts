import { store } from "../store";
import type { Cart, CheckoutAdapter, CustomerInput, OrderDraft, OrderTotals, ShippingQuote } from "./types";

const VAT_RATE = 0.19;

export function quoteShipping(subtotal: number): ShippingQuote {
  return {
    id: "dhl-de",
    label: "DHL Paket, Deutschland",
    carrier: "DHL",
    priceGross: subtotal >= store.freeShippingThreshold ? 0 : store.shippingCostDE,
  };
}

export function computeTotals(subtotal: number, shipping: number): OrderTotals {
  const total = subtotal + shipping;
  return {
    subtotal,
    shipping,
    total,
    vatIncluded: Math.round(total - total / (1 + VAT_RATE)),
    currency: "EUR",
  };
}

export function buildOrderDraft(cart: Cart, customer: CustomerInput): OrderDraft {
  const shipping = quoteShipping(cart.subtotal);
  return {
    id: `draft_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    lines: cart.lines.map((l) => ({ ...l })),
    customer,
    shipping,
    totals: computeTotals(cart.subtotal, shipping.priceGross),
  };
}

/** Vorschau-Adapter: Zahlung ist noch nicht angebunden. */
export const previewCheckout: CheckoutAdapter = {
  id: "preview",
  async createOrder() {
    return { status: "unavailable", reason: "Die Zahlung ist in dieser Vorschau noch nicht angebunden." };
  },
};
