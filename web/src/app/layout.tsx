import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/hanken-grotesk/index.css";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Announcement } from "@/components/Announcement";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maybrooks.de"),
  title: {
    default: "Maybrooks – Natürliche Pflege für Fell, Haut und Pfoten",
    template: "%s | Maybrooks",
  },
  description:
    "NPS-zertifizierte Naturpflege für Hunde aus einer Allgäuer Manufaktur: seifenfreie Shampoos für empfindliche Haut und robustes Fell sowie ein Pfotenbalsam.",
  openGraph: { siteName: "Maybrooks", locale: "de_DE", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <CartProvider>
          <a href="#inhalt" className="skip-link">
            Zum Inhalt springen
          </a>
          <Announcement />
          <Header />
          <main id="inhalt">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
