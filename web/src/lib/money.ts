import type { Cents } from "./catalog/types";

const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

export function formatPrice(cents: Cents): string {
  return eur.format(cents / 100);
}

/** Grundpreis nach PAngV, Bezugsgröße 1 Liter */
export function unitPricePerLitre(priceCents: Cents, ml: number): string {
  return `${eur.format(priceCents / 100 / (ml / 1000))}/l`;
}
