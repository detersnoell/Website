# Maybrooks – Frontend

Next.js (App Router) + TypeScript, eigenes Design-System in CSS-Tokens (`src/app/globals.css`).
Konzept: `../concept/blaupause-v1.md`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Commerce-Backend

Die Oberfläche spricht nur mit `src/lib/commerce` (Interface `CommerceAdapter`).

| Variable | Wirkung |
|---|---|
| *(nichts gesetzt)* | lokaler Warenkorb im Browser (Entwicklung/Vorschau) |
| `NEXT_PUBLIC_COMMERCE_ADAPTER=woocommerce` + `NEXT_PUBLIC_WC_STORE_URL=https://www.maybrooks.de` | WooCommerce Store API (Cart-Token, headless) |

Die WooCommerce-Produkt-IDs stehen im Katalog (`src/lib/catalog/products.ts`, `commerceIds`).
Der Woo-Adapter ist gegen die öffentliche Store API modelliert, aber noch nicht mit
echten Warenkorb-Schreibzugriffen gegen den Live-Shop getestet (bewusst, um keine
Test-Warenkörbe im Produktivsystem zu erzeugen). Für den Browser-Betrieb muss der Shop
CORS für die neue Domain erlauben.

## Offene Punkte

- Übergangsbilder in `public/images/products/` (Fotoshooting geplant)
- Versanddauer, Rückgabe, Kontaktdaten: `TODO(Betreiber)` in `src/lib/store.ts` und `src/app/hilfe`
- Rechtstexte: Platzhalter, werden aus dem bestehenden Shop übernommen
- Zahlung: Slot im Checkout (`src/components/Checkout.tsx`), Payment-Adapter folgt
