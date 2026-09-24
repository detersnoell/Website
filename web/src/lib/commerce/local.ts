import { allProducts } from "../catalog/products";
import type { AddItem, Cart, CartLine, CommerceAdapter } from "./types";
import { summarize } from "./types";

/**
 * Lokaler Warenkorb (localStorage) für Entwicklung und Vorschau.
 * Preise stammen aus dem Katalog; es wird nichts an ein Backend gesendet.
 */
const KEY = "mb-cart-v1";

function bySku(sku: string) {
  for (const p of allProducts) {
    const v = p.variants.find((x) => x.sku === sku);
    if (v) return { p, v };
  }
  return undefined;
}

function read(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function write(lines: CartLine[]): Cart {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* privater Modus o. Ä.: Warenkorb lebt dann nur im Speicher */
  }
  return summarize(lines);
}

export function createLocalAdapter(): CommerceAdapter {
  return {
    id: "local",
    async getCart() {
      return summarize(read());
    },
    async addItems(items: AddItem[]) {
      const lines = read();
      for (const item of items) {
        const found = bySku(item.sku);
        if (!found) throw new Error(`Unbekannte SKU ${item.sku}`);
        const existing = lines.find((l) => l.sku === item.sku);
        if (existing) existing.qty += item.qty;
        else
          lines.push({
            id: item.sku,
            sku: item.sku,
            slug: found.p.slug,
            name: found.p.name,
            qty: item.qty,
            unitPrice: found.v.priceGross,
            image: found.p.images[0]?.src,
            size: `${found.v.size.value} ${found.v.size.unit}`,
          });
      }
      return write(lines);
    },
    async setQuantity(lineId, qty) {
      const lines = read()
        .map((l) => (l.id === lineId ? { ...l, qty } : l))
        .filter((l) => l.qty > 0);
      return write(lines);
    },
    async removeLine(lineId) {
      return write(read().filter((l) => l.id !== lineId));
    },
  };
}
