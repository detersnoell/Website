import { createLocalAdapter } from "./local";
import { createWooCommerceAdapter } from "./woocommerce";
import type { CommerceAdapter } from "./types";

export type { Cart, CartLine, CommerceAdapter } from "./types";

/** Wählt das Backend per Umgebungsvariable; Standard ist der lokale Warenkorb. */
export function createCommerceAdapter(): CommerceAdapter {
  const kind = process.env.NEXT_PUBLIC_COMMERCE_ADAPTER;
  const wcUrl = process.env.NEXT_PUBLIC_WC_STORE_URL;
  if (kind === "woocommerce" && wcUrl) return createWooCommerceAdapter(wcUrl);
  return createLocalAdapter();
}
