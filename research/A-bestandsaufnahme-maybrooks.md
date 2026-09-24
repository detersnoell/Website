# Research A — Bestandsaufnahme maybrooks.de

Stand: 2026-09-24 · Methode: Playwright-Crawl (Desktop 1440 px, Mobile 390 px),
alle über die Navigation erreichbaren Seiten + 3 Produktseiten, Quelltext- und
Text-Extraktion. Ausgangspunkt des kompletten Neustarts; frühere Designrichtungen
sind verworfen.

## Fakten, die wir weiterverwenden

| Produkt | Typ | Inhalt | Preis | Versprechen laut Seite |
|---|---|---|---|---|
| **Warmduscher** | Fellshampoo | 200 ml | 26,50 € | für sensible/allergische Hunde, Bio-Lavendel, beruhigt, schaumfrei |
| **Raufbold** | Fellshampoo | 200 ml | 23,80 € | für robuste Hunde, Bio-Arganöl, Glanz, Kämmbarkeit, Feuchtigkeit |
| **Hasenfüßin** | Pfotenbalsam | 50 ml | 19,95 € | Bienenwachs + Propolis, rissige Pfoten, Wundheilung, auch Nase/Haut |

Starke Vertrauens-Assets, die aktuell versteckt sind:
- **NPS-Zertifizierung** (Natural Product Standard, approved by BDIH, kontrolliert durch IONC) — nur auf Unterseite „Qualitätsstandards“ erklärt.
- **Manufaktur im Allgäu**, Deutschland.
- **Gründerin Daniela Köchling**: Züchterin, Hundetrainerin, 35 Jahre Hundeerfahrung, Ursprung = Hunde mit Hautproblemen.
- Keine synthetischen Duftstoffe, kein Erdöl, keine Silikone, keine Tierversuche, pH-hautneutral, seifenfrei.
- **FSC-zertifizierte Verpackung**, in Deutschland hergestellt.
- Versand: DHL, 4,95 € (bis 2 kg), **versandkostenfrei ab 70 €**.
- Zahlung bereits möglich: PayPal, Apple Pay, Google Pay (WooCommerce).
- **Produktnamen mit Charakter** (Warmduscher / Raufbold / Hasenfüßin) — echtes Markenkapital.

## Was vom Produkt ablenkt

1. **Startseite verlinkt kein einziges Produkt.** Keine Preise, kein Warenkorb-Button, keine Produktlinks — nur zwei generische „MEHR ERFAHREN“-Buttons.
2. **Header frisst den ersten Bildschirm.** Desktop: 8 Rechtslinks in der Topbar + großes Wappenlogo + 6 Menüpunkte (~200 px vor Inhalt). Mobile: ~280 px Header mit *zwei* Menü-Schaltern („Menü“ + Hamburger); darunter verdeckt der Cookie-Banner ~40 % des Screens → auf dem Handy ist beim Einstieg **kein Produkt sichtbar**.
3. **„Stadtköterei“ im Hauptmenü** schickt Nutzer auf eine externe Website.
4. **„Ideenräuber“-Blog** im Hauptmenü, Top-Artikel „Das Corona-Virus und mein Hund“, ein Artikel „folgt in Kürze“ — veraltet, produktfern.
5. **Dekor statt Produkt:** Aquarell-Flecken, Wabenmuster, handschriftliche Pfeil-Annotationen, Lavendel/Kakaobohnen-Deko.
6. **Story-Texte mit Füllhumor** („fast so fancy wie in Berlin. Bäm!“) an Stellen, an denen Käufer Fakten suchen.
7. **Sechs gleichwertige USP-Icons** am Seitenende — niemand scrollt bis dorthin, und keines ist priorisiert.

## Was Käufer wirklich brauchen — und wo es heute steht

| Käuferfrage | Heute | Bewertung |
|---|---|---|
| Was wird verkauft? | Hero zeigt 2 Flaschen, Balsam erst nach Scroll | teilweise |
| Welches passt zu meinem Hund? | Nur implizit (sensibel vs. robust), keine Vergleichshilfe | fehlt |
| Was kostet es? | Nur im Shop / auf Produktseite | zu spät |
| Warum hochwertig / vertrauenswürdig? | NPS-Siegel versteckt auf Unterseite; Gründerin auf Über-uns | versteckt |
| Kundenstimmen? | **Keine** (obwohl eine Seite „Echtheit von Bewertungen“ existiert) | fehlt |
| Versand/Kosten/Lieferzeit? | Nur Unterseite; Gratis-Versand ab 70 € nirgends am Produkt | versteckt |
| Anwendung / Inhaltsstoffe | Auf Produktseite vorhanden, aber als Fließtext | vorhanden, schlecht strukturiert |
| Kontakt | Kein sichtbarer Kontaktweg außer Impressum | fehlt |

## Produktseiten (PDP)

- Nur **1 Bild** pro Produkt (Hasenfüßin: 1 Kombi-Bild), Lupen-Zoom der Woo-Standardgalerie.
- **Produktname fehlt neben dem Preis**; die H1 steht weiter unten im Beschreibungstext.
- Nutzer sieht eine **SEO-Schlagwort-Wolke** („Ekzem, Grasmilben, jucken, kratzen …“).
- „Ähnliche Produkte“-Überschrift ohne Inhalt.
- Keine Versandkosten/Lieferzeit am Kaufbutton, keine Bewertungen, kein Bundle/Set.
- Layout nutzt auf Desktop nur ~60 % der Breite.

## Shop-Übersicht

3 Produkte in 2-Spalten-Standardraster mit Sortier-Dropdown (bei drei Produkten sinnlos),
Produktnamen als rosa Links, keine Differenzierung („für wen?“), kein Vergleich.

## Inhaltliches Risiko (vor Relaunch klären!)

**„100 % vegan“** wird prominent auf der Startseite beworben (Hero + USP).
Die Hasenfüßin enthält laut INCI **Bienenwachs (cera alba), Propolis und Honig (mel)** —
das ist nach gängiger Definition *nicht vegan*. Das ist ein Glaubwürdigkeits- und
potenziell wettbewerbsrechtliches Risiko und muss in der neuen Kommunikation
präzisiert werden (z. B. „Shampoos 100 % vegan“).

## Technik / SEO

- Stack: WordPress 7.1 + WooCommerce 11 + Elementor + Slider Revolution + jQuery + Bootstrap 3.3.7 + Font Awesome 4.7 + Theme „Envo Multipurpose“, PayPal-Plus-Plugin (Stand 2020), Facebook-Pixel, Jetpack.
- **Startseite: ~18,5 MB Transfer, ~120 Requests**, Server-Antwort 4–9 s. Inhalte werden per Scroll-Animation nachgeladen (bei schnellem Scrollen große leere Flächen).
- `<title>` aller Seiten: „… – –“ (Seitenname fehlt), **keine Meta-Descriptions, keine OG-Bilder**.
- Startseite und Über-uns: je **4 × H1**; Startseite: **9 von 10 Bildern ohne Alt-Text**.
- Warenkorb ohne H1; Produkt-URLs uneinheitlich (`warmduscher-v2`, `hasenfuss`).
- Positiv: Product-JSON-LD vorhanden (WooCommerce), Consent-Tool (Complianz), Germanized für DE-Rechtstexte.
- Schriften: Merriweather (Headlines) + Montserrat (Body); Cookie-Banner in markenfremdem Blau.

## Fazit für den Relaunch

Das Produkt ist gut, die Beweise sind stark (NPS/BDIH, Allgäu-Manufaktur,
Züchterin-Gründerin, klare Inhaltsstoffe, faire Preise), und die Produktnamen
sind einprägsam. Die Website versteckt genau diese Stärken hinter Deko,
Navigation, Blog und Rechtslinks. Der Relaunch ist daher vor allem eine
**Umpriorisierung**: Produkte + Auswahlhilfe + Beweise nach vorn, Story
als Stütze, Technik schlank.
