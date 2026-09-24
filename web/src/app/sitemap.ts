import type { MetadataRoute } from "next";
import { productOrder } from "@/lib/catalog/products";

const base = "https://www.maybrooks.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/manufaktur", "/hilfe", "/impressum", "/datenschutz", "/agb", "/widerruf", "/versand-zahlung"];
  return [
    ...productOrder.map((slug) => ({ url: `${base}/${slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.5 })),
  ];
}
