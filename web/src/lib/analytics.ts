/**
 * Anbieterunabhängige E-Commerce-Ereignisse (GA4-Schema).
 * Die Oberfläche meldet nur Ereignisse; ein späterer Analytics-Adapter
 * (Plausible, Matomo, GA4 nach Einwilligung) hört auf „mb:analytics“.
 * Ohne Adapter passiert nichts – es werden keine Daten gesendet.
 */
export type AnalyticsEvent =
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "purchase"
  | "generate_lead";

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

export interface AnalyticsPayload {
  currency?: "EUR";
  value?: number;
  items?: AnalyticsItem[];
  [key: string]: unknown;
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mb:analytics", { detail: { event, payload: { currency: "EUR", ...payload } } }));
}
