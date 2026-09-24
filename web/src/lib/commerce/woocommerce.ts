import { allProducts } from "../catalog/products";
import type { AddItem, Cart, CartLine, CommerceAdapter } from "./types";
import { summarize } from "./types";

/**
 * Adapter für die WooCommerce Store API (wc/store/v1).
 * Headless-Betrieb über Cart-Token: kein WordPress-Cookie, keine WP-Oberfläche.
 *
 * Konfiguration: NEXT_PUBLIC_WC_STORE_URL=https://www.maybrooks.de
 */
const TOKEN_KEY = "mb-wc-cart-token";

interface WcCartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  sku: string;
  prices: { price: string; currency_minor_unit: number };
  images: { thumbnail: string }[];
}

const skuByWooId = new Map<number, { sku: string; slug: CartLine["slug"]; size: string }>();
const wooIdBySku = new Map<string, number>();
for (const p of allProducts)
  for (const v of p.variants)
    if (v.commerceIds.woocommerce) {
      skuByWooId.set(v.commerceIds.woocommerce, { sku: v.sku, slug: p.slug, size: `${v.size.value} ${v.size.unit}` });
      wooIdBySku.set(v.sku, v.commerceIds.woocommerce);
    }

function toMinor(price: string, minorUnit: number): number {
  // Store API liefert Preise bereits in der kleinsten Einheit als String
  return minorUnit === 2 ? Number(price) : Math.round(Number(price) * 10 ** (2 - minorUnit));
}

function mapCart(items: WcCartItem[]): Cart {
  return summarize(
    items.map((i) => {
      const local = skuByWooId.get(i.id);
      return {
        id: i.key,
        sku: local?.sku ?? i.sku,
        slug: local?.slug,
        name: i.name,
        qty: i.quantity,
        unitPrice: toMinor(i.prices.price, i.prices.currency_minor_unit),
        image: allProducts.find((p) => p.slug === local?.slug)?.images[0]?.src ?? i.images[0]?.thumbnail,
        size: local?.size,
      };
    }),
  );
}

export function createWooCommerceAdapter(baseUrl: string): CommerceAdapter {
  const api = `${baseUrl.replace(/\/$/, "")}/wp-json/wc/store/v1`;

  async function call(path: string, init?: { method?: string; body?: unknown }): Promise<Cart> {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    const res = await fetch(`${api}${path}`, {
      method: init?.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Cart-Token": token } : {}),
      },
      body: init?.body ? JSON.stringify(init.body) : undefined,
    });
    const next = res.headers.get("Cart-Token");
    if (next) localStorage.setItem(TOKEN_KEY, next);
    if (!res.ok) throw new Error(`Store API ${res.status}`);
    const data = (await res.json()) as { items: WcCartItem[] };
    return mapCart(data.items);
  }

  return {
    id: "woocommerce",
    getCart: () => call("/cart"),
    async addItems(items: AddItem[]) {
      let cart: Cart | undefined;
      for (const item of items) {
        const id = wooIdBySku.get(item.sku);
        if (!id) throw new Error(`Keine WooCommerce-ID für ${item.sku}`);
        cart = await call("/cart/add-item", { method: "POST", body: { id, quantity: item.qty } });
      }
      return cart ?? call("/cart");
    },
    setQuantity: (key, quantity) =>
      call("/cart/update-item", { method: "POST", body: { key, quantity } }),
    removeLine: (key) => call("/cart/remove-item", { method: "POST", body: { key } }),
  };
}
