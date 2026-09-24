# 07 · Technische Architektur & zukünftige Integrationspunkte

Status: Vorschlag zur Abstimmung, noch nicht implementiert.

## Leitprinzip

**Eine Oberfläche, austauschbare Motoren.**
Alles, was der Kunde sieht (Shop, Warenkorb, Checkout, Bestätigung, E-Mails),
gestalten und bauen wir selbst mit denselben Design-Tokens. Alles dahinter
(Bestellverwaltung, Zahlung, Rechnung, Versand, CRM, Analytics) wird über
schmale **Adapter** angebunden. Anbieter lassen sich damit wechseln, ohne dass
sich die Oberfläche ändert.

```
┌──────────────────────── Storefront (unser Design) ────────────────────────┐
│  Seiten · Produktkarten · Warenkorb-Drawer · Checkout · Danke-Seite         │
│  Design-Tokens · Motion-System · Komponenten                               │
└───────────────┬───────────────────────────────────────────────────────────┘
                │  eigene, stabile Domänen-API (TypeScript-Typen)
┌───────────────▼───────────────────────────────────────────────────────────┐
│  Domänen-Services:  catalog · cart · checkout · orders · content · events  │
└──┬──────────┬──────────┬──────────┬──────────┬──────────┬─────────────────┘
   │          │          │          │          │          │   Adapter
┌──▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼────┐
│Commerce│ │Payment│  │ Email │  │Invoice│  │Shipping│ │CRM/News│ … Analytics
│Woo/    │ │Stripe/│  │Postmark│ │lexoffice││DHL/    │ │Brevo/  │
│Medusa  │ │PayPal/│  │/Resend │ │/sevDesk ││Sendcloud││HubSpot│
│/eigen  │ │Mollie │  │        │ │         ││        │ │        │
└────────┘ └───────┘  └────────┘ └─────────┘└────────┘ └────────┘
```

## Frontend (Empfehlung)

**Next.js (App Router) + TypeScript**, statisch vorgerendert bzw. per ISR.
- Die Produktseiten sind statisch und schnell. Warenkorb und Checkout sind interaktive Inseln.
- Das Ökosystem für Payment-SDKs ist ausgereift (Stripe Payment Element, PayPal JS SDK, Apple Pay/Google Pay über den Payment Request Button).
- **Styling:** CSS mit Custom Properties (Design-Tokens) und CSS Modules. Kein Utility-Framework-Look und kein UI-Kit, damit keine Standardoptik entsteht.
- **Bilder:** AVIF/WebP, `srcset`, Blur-Platzhalter, Priorität für das LCP-Bild.
- **Alternative: Astro + Inseln.** Es wäre noch schlanker, ist aber bei Checkout-Logik und Auth weniger komfortabel. Sinnvoll wäre es, wenn die Seite dauerhaft sehr klein bleibt.

**Performance-Budget:**

| Kennzahl | Ziel |
|---|---|
| LCP (mobil, 4G) | < 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| JS auf Produktseiten | < 120 KB gz |
| Startseite gesamt | < 1,5 MB (heute ~18,5 MB) |

## Backend: drei realistische Optionen

| | **A · WooCommerce headless** | **B · Medusa v2 (Open Source)** | **C · Shopify headless** |
|---|---|---|---|
| Idee | Bestehenden Shop als Backend weiter nutzen, Frontend neu | Eigenes Commerce-Backend (Node + Postgres) mit Admin | Shopify als Backend, eigenes Frontend |
| Checkout im eigenen Design | Ja, über die Woo Store API | Ja, vollständig | **Nur eingeschränkt.** Der Checkout bleibt Shopify-gehostet; Branding ist möglich, echte Freiheit gibt es erst mit Plus |
| Bestehende Bestellungen/Kunden | bleiben | Migration nötig | Migration nötig |
| Admin für die Familie | bekanntes WP-Admin | modernes Medusa-Admin (neu lernen) | Shopify-Admin (sehr gut) |
| Rechtliches DE (Germanized etc.) | vorhanden | selbst abbilden | über Apps |
| Laufende Kosten | Hosting WP | Hosting Node + DB | Abo + ggf. Transaktionsgebühr |
| Wartung/Sicherheit | WP-Updates, Plugins | Updates eigener Stack | minimal |
| Risiko | niedrig (Bestand) | mittel (mehr Eigenbau) | niedrig technisch, **hoch für das UX-Ziel** |

**Empfehlung:**
- **Start mit A.** Der laufende Shop bleibt das Backend: Bestellungen, Rechnungen, E-Mails und Rechtstexte funktionieren weiter. Das neue Frontend spricht ausschließlich über unseren `CommerceAdapter` mit Woo.
- **Später auf B umsteigen, wenn gewünscht.** Wenn WordPress lästig wird, ersetzen wir nur den Adapter; das Frontend bleibt unverändert.
- **C passt nicht zu deiner Anforderung.** Du willst keinen fremd wirkenden Checkout, und genau diesen bringt Shopify mit.

## Datenmodell (anbieterunabhängig)

```ts
Product   { id, slug, name, tagline, forWhom, notFor, description,
            keyIngredients[{name, benefit}], inci, inciPlain,
            usage[step], certifications[], images[ProductImage],
            accent: ColorToken, seo{title, description}, faq[] }
ProductImage { src, alt, role: 'packshot'|'packshot-box'|'texture'
               |'in-use'|'lifestyle'|'label', focalPoint }
Variant   { sku, productId, size: {value, unit: 'ml'}, priceGross: Cents,
            unitPrice: {cents, per: '1 l'}, stock, weightG, gtin }
Bundle    { id, slug, name, items[{sku, qty}], priceGross, savings }
Cart      { id, lines[{sku, qty, priceSnapshot}], totals, shippingEstimate,
            freeShippingThreshold }
Order     { number, status: 'pending'|'paid'|'fulfilled'|'shipped'
            |'delivered'|'cancelled'|'refunded', customer, billingAddress,
            shippingAddress, lines[snapshot], totals{net, tax, shipping, gross},
            payment{provider, reference, method, status},
            invoice{provider, number, url}, shipment{carrier, tracking},
            consent{newsletter, reviewRequest}, events[] }
Customer  { id, email, name, addresses[], orders[], marketingConsent }
Review    { id, productId, orderRef (verifiziert), rating, text, author,
            createdAt, response? }
```

**Geld und Daten:**
- Beträge immer als Integer-Cent, Währung EUR, Preise brutto (B2C).
- Der Grundpreis wird aus der Variante berechnet und nicht gepflegt.
- In einer Bestellposition wird immer ein **Snapshot** gespeichert (Name, Preis, Steuersatz), keine Referenz.

## API-Struktur (Storefront ↔ eigene Services)

```
GET    /api/catalog/products            (build-time + ISR)
GET    /api/catalog/products/:slug
POST   /api/cart                        → Cart anlegen (Cookie: cart_id)
PATCH  /api/cart/lines                  → add/update/remove
POST   /api/checkout/session            → Adresse, Versand, Payment-Intent
POST   /api/checkout/complete           → Bestellung abschließen
POST   /api/webhooks/payment/:provider  → Zahlungsstatus (signiert)
POST   /api/webhooks/commerce           → Statuswechsel aus dem Backend
POST   /api/contact                     → Kontakt-/B2B-Anfrage
POST   /api/newsletter                  → Double-Opt-in
```

**Ereignisse (Event-Bus / Queue) → Handler:**

| Ereignis | Folgeaktion |
|---|---|
| `order.created` | Betreiber-Benachrichtigung |
| `payment.succeeded` | Bestellbestätigung, Rechnung erzeugen, CRM-Sync |
| `order.shipped` | Versandmail mit Tracking |
| `order.delivered + 14 Tage` | Bewertungsanfrage (mit Einwilligung) |
| `order.delivered + ~8 Wochen` | Nachkauf-Erinnerung (mit Einwilligung) |
| `contact.submitted` | Eingangsbestätigung an den Kunden, Mail an den Betreiber |

## Zukünftige Integrationspunkte

| Bereich | Adapter | Kandidaten | Designregel |
|---|---|---|---|
| Zahlung | `PaymentProvider` | **Stripe** (Karte, Apple Pay, Google Pay, PayPal, Klarna, SEPA), alternativ Mollie; PayPal direkt über das JS SDK | Eingebettete Komponenten (Payment Element), mit unseren Tokens gestylt. **Kein Redirect-Checkout** außer den PayPal/3-D-Secure-Pflichtfenstern |
| Bestellungen | `CommerceProvider` | Woo (Start) → Medusa/eigen | Statusseite „Meine Bestellung“ über einen signierten Link, ohne Kundenkonto |
| E-Mail | `EmailProvider` | Postmark, Resend, Brevo | Templates im Code (React Email) mit denselben Tokens; Absender-Domain mit SPF/DKIM/DMARC |
| Rechnung | `InvoiceProvider` | lexoffice/Lexware Office, sevDesk (API) oder Germanized Pro (Woo) | GoBD-konform; die PDF-Vorlage im Markenlayout |
| Versand | `ShippingProvider` | DHL Geschäftskunden-API, Sendcloud | Tracking-Seite im eigenen Design |
| Kunden/CRM | `CrmProvider` | Brevo (inkl. Newsletter), HubSpot Free | Nur mit Einwilligung, Double-Opt-in |
| Bewertungen | `ReviewProvider` | eigene verifizierte Bewertungen, alternativ Judge.me/Trusted Shops | Darstellung im eigenen Design; Hinweis zur Verifizierung direkt bei den Bewertungen (Omnibus-Richtlinie) |
| Analytics | `AnalyticsProvider` | Plausible/Matomo (cookielos), optional GA4/Meta-Pixel nach Consent | E-Commerce-Events nach GA4-Schema: `view_item`, `add_to_cart`, `begin_checkout`, `add_payment_info`, `purchase` |

## Rechtliche Leitplanken für Checkout & Shop (zur Prüfung durch Fachleute)

- **Grundpreis je 1 l** direkt am Preis (PAngV):
  - Warmduscher: 132,50 €/l
  - Raufbold: 119,00 €/l
  - Hasenfüßin: 399,00 €/l
- Versandkosten und Lieferzeit sind vor dem Checkout sichtbar.
- Der Bestellbutton trägt die Beschriftung „**Zahlungspflichtig bestellen**“ (§ 312j BGB).
- AGB und Widerrufsbelehrung sind im Checkout verlinkt. Die Bestätigungsmail enthält die Widerrufsbelehrung und das Muster-Widerrufsformular.
- **Elektronische Widerrufsfunktion („Widerrufsbutton“)** gemäß EU-Richtlinie 2023/2673, anzuwenden seit 19.06.2026.
- Den Link auf die EU-OS-Plattform entfernen, denn die Plattform wurde 2025 eingestellt.
- Den Hinweis zur Echtheitsprüfung von Bewertungen direkt bei den Bewertungen platzieren.
- **Consent-Banner:** „Ablehnen“ ist gleichwertig zu „Akzeptieren“. Der Banner verdeckt nicht das Produkt.
- **Barrierefreiheit:** Nach dem BFSG sind Kleinstunternehmen bei Dienstleistungen ausgenommen. Wir bauen trotzdem nach WCAG 2.2 AA.
- **„100 % vegan“** nur dort verwenden, wo es zutrifft (Hasenfüßin: Bienenwachs, Propolis, Honig).

## Hosting (zu entscheiden)

| Option | Pro | Contra |
|---|---|---|
| Vercel (Region Frankfurt) | Preview-Deploys, sehr einfach, ideal für Next.js | US-Anbieter (AVV + DPF/SCC nötig) |
| Netlify | ähnlich | ähnlich |
| Hetzner + Coolify (DE) | DSGVO-einfach, günstig | mehr Eigenbetrieb |

Das Woo-Backend bleibt beim jetzigen Hoster. Es ist nur noch über die API und das Admin erreichbar; die öffentliche WP-Seite wird abgeschaltet.

**SEO-Migration:**
- 301-Weiterleitungen aller alten URLs, zum Beispiel `/produkt/warmduscher-v2/` → `/warmduscher`.
- Product-JSON-LD mit Preis, Verfügbarkeit und später Bewertungen.
- Meta-Descriptions und OG-Bilder pro Seite.
