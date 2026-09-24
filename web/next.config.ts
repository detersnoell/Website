import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Alte WordPress-URLs → neue Struktur (SEO-Erhalt)
    return [
      { source: "/produkt/warmduscher-v2", destination: "/warmduscher", permanent: true },
      { source: "/produkt/raufbold", destination: "/raufbold", permanent: true },
      { source: "/produkt/hasenfuss", destination: "/hasenfuessin", permanent: true },
      { source: "/shop", destination: "/#produkte", permanent: true },
      { source: "/ueber-maybrooks-cottage", destination: "/manufaktur", permanent: true },
      { source: "/qualitaetsstandards", destination: "/manufaktur#standards", permanent: true },
      { source: "/versandarten", destination: "/hilfe#versand", permanent: true },
      { source: "/warenkorb", destination: "/kasse", permanent: false },
      { source: "/ideenraeuber", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
