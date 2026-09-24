# Research B/C — Referenzen & Wettbewerb

Stand: 2026-09-24.

**Methode:**
- Playwright auf Desktop (1440 px) und Mobile (390 px, Touch).
- Gemessen: berechnete Styles (Schriften, Größen, Transitions), Hover-Zeitreihen (0/120/250/500/1000 ms), Galerie- und Lightbox-Verhalten, Add-to-Cart-Ablauf, Sticky-Elemente.
- Ergänzend die Shopify-Katalogdaten (`/products.json`).

Cloud7 ist hier eine **Analyse-Referenz**, keine Designvorlage.

| Kategorie | Seite | Warum im Set |
|---|---|---|
| B · Referenz des Nutzers | **cloud7.de** | Premium-Hundemarke DE mit eigenständiger Designsprache |
| C · direkter Wettbewerb (Pflege) | **dogbydrlisa.com** | Hautpflege für Hunde, Tierärztin als Gründerin (Parallele zu Daniela) |
| C · direkter Wettbewerb (Pflege) | **4-legger.com** | zertifiziert biologisches Hundeshampoo, Fokus auf Inhaltsstoff-Transparenz |
| C · ähnliche Marktgröße, eigene Designsprache | **fablepets.com** | designgetriebene D2C-Tiermarke |
| C · ähnliche Marktgröße, eigene Designsprache | **wildone.com** | starke Farb-Markenidentität |
| C · ähnliche Marktgröße, eigene Designsprache | **maxbone.com** | Lifestyle/Luxus |
| C · DE-Marktreferenz | **petsdeli.de** | Bedarfs-Navigation im deutschen Heimtiermarkt |
| ausgeschlossen | hownd.com | Die Domain gehört inzwischen einer Loyalty-Software, nicht mehr der Hundemarke |
| blockiert | aesop.com | 403 bei automatisiertem Zugriff |

---

## 1 · Cloud7 (cloud7.de): ausführliche Analyse

### Design

- **Typografie:**
  - Headlines: Roboto Condensed, Bold, VERSALIEN, 64 px, Laufweite +3,2 px, nur für wenige Kampagnen-Headlines.
  - Fließtext und Interface: Harmonia Sans, 14 px, Laufweite +0,68 px.
  - Die Produktnamen sind bewusst *nicht* laut, sondern normal gesetzt: Regular, etwa 18 px.
- **Farbe:** Schwarz/Weiß, Produktflächen in kühlem Hellgrau. Die Farbe kommt *ausschließlich* aus den Fotos.
- **Form:** Radius 0 überall, keine Schatten auf Karten, Linien als Haarlinien.
- **Weißraum:** großzügig um das Produktbild. Der Text unter den Karten ist sehr knapp: Name, „ab 80,00 €“, Farbpunkte.
- **Das wichtigste Designmittel ist die Bilddisziplin.** Jedes Produkt hat den gleichen grauen Studiohintergrund und die gleiche Seitenansicht, oft mit demselben Modellhund (Vizsla „Jago“). Das Raster wirkt dadurch wie ein Katalog aus einem Guss. Median: **5 Bilder pro Produkt** (max. 13).

### UX & Navigation

- **Header:**
  - Logo zentriert, die Navigation links und rechts davon aufgeteilt.
  - Links: Alle Produkte, Neu, Spezialgrößen, Kollektionen, Sale.
  - Rechts: Über CLOUD7, Qualität, Tierschutz, Sprache/Währung, Konto, Suche, Warenkorb.
  - Der Header liegt über dem Hero und bleibt beim Scrollen im Katalog sichtbar.
- **Mega-Menü bei Hover auf „Alle Produkte“:** vollbreites weißes Panel mit 6 Textspalten (Kategorie → Unterkategorien → „Alle entdecken“). Es enthält *keine* Bilder.
- **Hero:** vollflächiges Foto (Hund im Produkt), Versal-Headline, eine Zeile Unterzeile und als CTA nur ein unterstrichener Textlink („JETZT ENTDECKEN“), kein Button.
- **Vertrauen direkt nach dem Hero:** „Bekannt aus“ mit Presselogos (dogs, Monocle, Martha Stewart). Später folgen „Vielfach prämiertes Produktdesign“, eine About-Sektion und Community-Fotos.

### Produktkarte: exakte Interaktion (Desktop)

| Zeit | Was passiert |
|---|---|
| 0 ms | Packshot: ganzer Hund seitlich, 1:1, grauer Grund |
| Mouseenter | Das zweite Bild (`product-item__bg__under`) blendet ein: `opacity 0 → 1`, **250 ms ease-in-out** |
| 120 ms | Beide Bilder liegen halb übereinander, man sieht die Überblendung |
| 250 ms | Überblendung fertig. Das zweite Bild ist ein **Detail-Close-up** (Kragen, Reißverschluss), keine andere Perspektive |
| Maus bewegt sich horizontal | Keine Veränderung, kein Bild-Scrubbing |
| Überall | Kein Zoom, kein Anheben der Karte, kein Schatten, kein Quick-Add-Button |
| Farbpunkte | Sichtbar unter der Karte; beim Hover auf einen Punkt wird das Geschwister-Bild eingeblendet (`opacity .3s`) |
| Scroll-Einstieg | Die Bilder faden beim ersten Erscheinen ein (`img-in`, 800 ms, ease-out-quart) |

**Prinzip:** Der Hover gibt eine **zusätzliche Information** (Detail/Material). Er ist kein Effekt.

### Produktdetailseite (Desktop)

- Breadcrumb, darunter zwei Spalten:
  - **Links die Galerie:** ein großes Bild, darunter ein 2er-Raster mit den weiteren Bildern, man scrollt durch alle.
  - **Rechts die Kaufbox:**
    - Kollektions-Label, Name (unaufgeregt), Preis
    - *direkt darunter:* „Inkl. MwSt. zzgl. Versand · Lieferung innerhalb Deutschlands in 3–5 Werktagen“
    - Farbe als runde Swatches, Passform als Hundesilhouetten-Icons (Regulär/Dackel), Größe als quadratische Buttons, Link zur „Größentabelle“
    - **Zwei gleich starke Buttons nebeneinander:** „In den Warenkorb“ und „Jetzt zum Checkout“
    - Accordions: Highlights (offen), Beschreibung, Material & Pflege; danach Kundenbewertungen
- **Sehr konkrete Kaufhilfe:** „Unser Model Jago (Vizsla) wiegt ca. 26 kg … trägt Größe 9.“
- **Bundle-Anreiz in der Kaufbox:** „10 % Rabatt auf passenden Wechselbezug“, automatisch angewendet.
- **Feature-Band:** typografische Callouts zwischen Haarlinien, daneben ein Materialfoto.
- **Bild-Hover:** eigener Zoom-in-Cursor (SVG). Ein Klick öffnet eine **Vollbild-Lightbox:**
  - weißer Grund, Bild zentriert
  - Pfeile links und rechts, runde Thumbnails unten
  - Produktname mit Zurück-Pfeil oben links, Schließen-X oben rechts
  - Die Maus schwenkt das Bild nicht (kein Pan-Zoom)
- **Sticky-Leiste unten**, sobald die Kaufbox aus dem Bild scrollt: „Name • Preis“ plus Button „Größe auswählen ⌃“, auf Desktop und Mobile.

### Add-to-Cart → Warenkorb

1. Der Button wechselt in einen umrandeten Ladezustand mit Spinner und dann mit Häkchen.
2. **Von rechts gleitet ein Drawer herein**, die Seite dahinter wird abgedunkelt. Von oben nach unten enthält er:
   - Hinweis auf Gutscheine
   - **eine Fortschrittsleiste für kostenlosen Versand** („Noch 20,00 € bis zum kostenlosen Standardversand“)
   - die Position mit Mengen-Stepper und „Entfernen“
   - „Wird oft zusammen gekauft“ mit Hinzufügen per Klick
   - Zwischensumme und „Sicher zur Kasse“ mit Schloss-Icon
   - eine Reihe mit Zahlungsarten-Logos

### Mobile

- **Header:** Menü und Suche · Logo · Sprache, Konto, Warenkorb.
- **Menü:** Vollbild-Drawer von links mit Pfeilen für die Unterebenen; Service-Links und Sprache weiter unten.
- **Galerie:** volle Breite, horizontales Scroll-Snap (`x mandatory`). **Segmentierte Fortschrittslinie** statt Punkten. Titel und Preis stehen noch im ersten Screen.
- **Sticky-Kaufleiste unten** nach dem Scrollen.
- **Reibung:** Geo-/Sprach-Popup beim Einstieg (für ausländische IPs) und ein Popup vor dem Produkt.

### Was wir daraus lernen

**Übernehmen:**
- Bilddisziplin
- nur ein informativer Hover
- Radius 0 und Zurückhaltung
- Lieferinfo direkt unter dem Preis
- Sticky-Leiste
- Drawer mit Fortschrittsleiste zum Gratisversand
- Beweise direkt nach dem Hero

**Nicht übernehmen, weil es Mittel für einen 250-Produkte-Katalog sind:**
- Mega-Menü, Filter, Swatches, Kollektionslogik
- Versal-Condensed als Markenstimme (das *ist* Cloud7)
- Einstiegs-Popups

---

## 2 · Dog by Dr Lisa: Wettbewerb Hautpflege

- **Positionierung:** Tierärztin als Markengesicht. Der Name *ist* die Expertise („Recommended and used by vets – especially Dr Lisa Chimes“).
- **Einstieg über das Problem:** „Is your dog licking or scratching? Is their skin red, bumpy …“ und ein Supplement-Quiz.
- **Vertrauensleiste direkt unter dem Hero** (dunkles Band): Recyclable & compostable · Not tested on animals · We're Australian · B Corp certified · Natural ingredients.
- **Produktseite:**
  - Zahl der Bewertungen direkt beim Titel („107 Reviews“)
  - Nutzen als Liste („Why you'll love it“)
  - Accordions für Inhaltsstoffe und Anwendung
  - Preis und Kaufbutton kompakt, dazu Ratenzahlung und **„100 % money back guarantee“**
  - ein Aufklärungsteil zum Problem, FAQ auf der Produktseite, „Pairs well with“ mit Sets
- **Sets mit Ersparnis** („Save up to 25 %“), benannt nach Problemen („Skin Allergy Set“, „Dandruff Set“).
- **Karten-Hover:** keine Veränderung.
- **Schwäche:** Store-Auswahl-Popup und eine überladene Navigation (mehr als 25 Links).

## 3 · 4-Legger: Wettbewerb Bio-Shampoo

- **Navigation extrem reduziert:** Shampoo · Reviews · Our Mission · Learn.
- „**What does your dog need help with?**“ ist Auswahl nach Bedarf auf der Startseite.
- **Maximale Transparenz:** „✓ What's in the bottle / ✗ What's not in the bottle“. *Jeder* Inhaltsstoff wird einzeln mit seinem Zweck erklärt.
- **In der Kaufbox:**
  - ein Bundle-Hinweis zum Problem („Tackle yeast — Shop the Yeast Bundle →“)
  - ein Zitat eines verifizierten Käufers
  - „In stock, ready to ship“
- „Bundle & Save“, Bewertungs-Karussell (Judge.me).
- **Galerie:** 13 Bilder mit 11 Thumbnails, Kaufbox sticky.
- **Lehre:** Die Inhalte sind stark, die Optik ist beliebiges Theme-Niveau (Schreibmaschinen-Monospace, Emojis). **Die Inhalte übernehmen, die Gestaltung nicht.**

## 4 · Fable: eigene Designsprache

- **Karten-Hover, die reichhaltigste Variante im Set:**
  - Überblendung auf ein **annotiertes Bild** mit Feature-Callouts, 300 ms
  - gleichzeitig gleiten Name und Unterzeile 40 px nach oben
  - von unten blenden zwei Buttons ein: „Add to Cart“ und „See Details“
- **Auf der Karte:** Badges („Wirecutter Pick“, „Best Seller“) und Sterne mit Anzahl („261 Reviews“).
- Sets, ein Quiz („Pet Gear Quiz“), „Real Pets“ (Fotos von Kunden).
- Median **8 Bilder pro Produkt**.
- **Lehre:** Ein zweites Bild mit Annotationen erklärt das Produkt, ohne dass man klicken muss. Quick-Add im Hover ist bei wenigen, variantenarmen Produkten sinnvoll.

## 5 · Wild One: Markenidentität über Farbe

- Farbflächen (Terracotta/Türkis) und dekorative Wellenkante: sofort wiedererkennbar.
- **Karten-Hover:** Bild skaliert auf **1,03 in 500 ms**, sonst nichts.
- Hinweis auf Gratisversand in der Announcement-Leiste.
- **Produktseite:** Die Info-Spalte ist sticky, die Accordions enthalten auch „Shipping & Returns“ und „Product FAQs“. **Sticky „Add to Cart“ auf Mobile.**

## 6 · maxbone: Lifestyle-Luxus

- Riesige Wortmarke über einem Lifestyle-Foto als Hero, Karussell, sticky Header. Kollaboration (Marc Jacobs) als Statussignal.
- **Lehre:** Das trägt, wenn die Marke das Produkt ist. Bei uns muss das Produkt die Marke tragen.

## 7 · Pets Deli: deutscher Markt

- **Navigation nach Bedürfnis** (Verdauung, Unverträglichkeiten, Haut- & Fellprobleme …), **Alter** und **Rasse**.
- Hero stellt eine Frage mit zwei Antworten: „Für wen suchst du …? [Für Hunde] [Für Katzen]“.
- **Negativbeispiel:** ein Cookie-Banner, das fast die halbe Seite belegt.

---

## Muster über alle Seiten

1. **Pflege wird über das Problem gekauft, nicht über den Produktnamen** (Dr Lisa, 4-Legger, Pets Deli). Unsere Namen sind charmant, verraten aber nichts über die Funktion. **Jeder Name braucht eine Klartext-Zeile.**
2. **Beweise direkt nach dem Hero** (Cloud7 Presse, Dr Lisa Vertrauensleiste).
3. **Sets mit Ersparnis** sind in allen Wettbewerber-Shops Standard.
4. **Bewertungen mit Anzahl** am Titel und oft auf der Karte. Die Ausnahme ist Cloud7, das auf Presse und Design setzt.
5. **Transparenz der Inhaltsstoffe als Vertrauensbeweis** in der Pflegekategorie.
6. **Ein durchgängiges Fotosystem** (Cloud7, Fable) ist der größte Einzelfaktor für die Wahrnehmung als Premium. Die Benchmarks liegen bei **5–8 Bildern pro Produkt**; Maybrooks hat heute 1.
7. **Lieferinfo am Preis**, die Schwelle für Gratisversand in der Announcement-Leiste *und* als Fortschritt im Warenkorb.
8. **Warenkorb als Drawer**, nicht als eigene Seite.
9. **Sticky-Kaufleiste**, sobald der Hauptbutton aus dem Bild scrollt.
10. **Hover:** genau *eine* subtile Aktion, entweder Überblendung (250–300 ms) oder Scale 1,03 (500 ms). Niemand nutzt Tilt, Schatten oder Glow.

**Lücke im Markt, bezogen auf dieses Set:** Keiner der Pflege-Wettbewerber verbindet Gestaltung auf Cloud7-Niveau mit zertifizierter Natürlichkeit und voller Transparenz. Die mit starkem Design (Cloud7, Fable, Wild One) verkaufen Zubehör, die mit starken Inhalten (4-Legger, Dr Lisa) sehen aus wie ein Theme. **Genau dazwischen kann Maybrooks sich positionieren.**

## Synthese

### Must have

- Die drei Produkte mit Preis im ersten Bildschirm, auf Desktop *und* Mobile.
- Pro Produkt eine Klartext-Zeile: für welchen Hund, welches Problem.
- Auswahlhilfe bzw. Vergleich nach Bedarf.
- Eine Beweisleiste direkt nach dem Hero: NPS/BDIH, Manufaktur im Allgäu, Gründerin mit Züchter-Expertise, seifenfrei und pH-angepasst.
- Ein durchgängiges Fotosystem mit mindestens 4–6 Bildern pro Produkt.
- Transparente Inhaltsstoffe (INCI mit Übersetzung in Alltagssprache).
- Lieferzeit und Versandkosten am Preis; Gratisversand ab 70 € sichtbar.
- Grundpreis pro Liter (gesetzlich vorgeschrieben).
- Warenkorb-Drawer mit Fortschritt bis zum Gratisversand.
- Sticky-Kaufleiste auf der Produktseite.
- Checkout im eigenen Design; Gastbestellung ohne Kundenkonto.
- Schlanke Navigation mit höchstens 3–4 Punkten; die Rechtslinks gehören in den Footer.

### Should have

- **Set „Alle drei“:** 70,25 € liegt genau über der Grenze für Gratisversand.
- Echte, verifizierte Bewertungen, ab dem Start gesammelt.
- Anwendung in 3 Schritten mit Bildern.
- Produktspezifische FAQ.
- E-Mails nach dem Kauf: Anwendungstipps, Bewertungsanfrage, Nachkauf-Erinnerung.
- Übergang vom Karten- zum Produktbild (View Transitions) als progressive Verbesserung.

### Don't

- Einstiegs-Popups (Newsletter, Land, Rabatt) vor dem ersten Produktkontakt.
- Mega-Menü und Filter: Wir haben 3 Produkte.
- Deko-Grafiken statt Produktfotos; Icons in Kreisen für USPs.
- Mehr als eine Hover-Aktion; Tilt, Parallax, Autoplay-Karussells.
- „100 % vegan“ pauschal.
- Ein Cookie-Banner, das das Produkt verdeckt.
- Ein Blog im Hauptmenü.
- Externe Links in der Hauptnavigation.
