import type { NextConfig } from "next";

/** Statische Vorschau (teilbarer Link): PREVIEW_EXPORT=1 npm run build:preview */
const preview = process.env.PREVIEW_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(preview
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
      }),
  // Redirects gibt es nur im echten Serverbetrieb (nicht in der statischen Vorschau)
  ...(preview ? {} : { redirects }),
};

async function redirects() {
    // Alte WordPress-URLs → neue Struktur (SEO-Erhalt)
    return [
      { source: "/produkt/warmduscher-v2", destination: "/warmduscher", permanent: true },
      { source: "/produkt/raufbold", destination: "/raufbold", permanent: true },
      { source: "/produkt/hasenfuss", destination: "/hasenfuessin", permanent: true },
      { source: "/shop", destination: "/#produkte", permanent: true },
      { source: "/ueber-maybrooks-cottage", destination: "/ueber-uns", permanent: true },
      { source: "/manufaktur", destination: "/ueber-uns", permanent: true },
      { source: "/qualitaetsstandards", destination: "/ueber-uns#standards", permanent: true },
      { source: "/versandarten", destination: "/hilfe#versand", permanent: true },
      { source: "/warenkorb", destination: "/kasse", permanent: false },
      { source: "/ideenraeuber", destination: "/", permanent: true },
    ];
}

export default nextConfig;
