# Maybrooks Relaunch — Konzept-Blaupause v1

Stand: 2026-09-24 · Status: **Entwurf zur Abstimmung**. Code wird erst nach den Entscheidungen in Kapitel 9 geschrieben.

**Grundlage:**
- [`research/A-bestandsaufnahme-maybrooks.md`](../research/A-bestandsaufnahme-maybrooks.md)
- [`research/B-C-referenzen-und-wettbewerb.md`](../research/B-C-referenzen-und-wettbewerb.md)

**Technik im Detail:** [`07-technik-und-integrationen.md`](07-technik-und-integrationen.md)

---

## 1 · Positionierung

### Positionierungssatz

> Für Hundehalter, denen Haut und Fell ihres Hundes wichtig sind — besonders bei
> empfindlichen Hunden — ist **Maybrooks** die **zertifiziert natürliche Pflege** aus
> einer Allgäuer Naturkosmetik-Manufaktur, entwickelt von einer Züchterin mit 35
> Jahren Hundeerfahrung. Anders als übliche Hundeshampoos ist sie **seifenfrei,
> pH-angepasst und bis zum letzten Inhaltsstoff offengelegt**.

### Die 5-Sekunden-Botschaft

Ein Besucher muss ohne Scrollen und ohne Lesen von Fließtext drei Dinge verstehen:
1. **Was?** Natürliche Pflege für Hunde: zwei Shampoos und ein Pfotenbalsam. Das zeigen die Produkte selbst, mit Preis.
2. **Für wen?** Für jedes Produkt eine Klartext-Zeile: *empfindliche Haut* · *robustes, langes Fell* · *Pfoten & Nase*.
3. **Warum glauben?** Eine Zeile Beweis: *NPS-zertifiziert (BDIH) · Manufaktur im Allgäu · entwickelt von einer Züchterin*.

**Headline-Vorschläge** (Copy wird später finalisiert):
- „Natürliche Pflege für Fell, Haut und Pfoten.“ Das ist die sachlichste Variante und gleichzeitig die stärkste für SEO.
- „Sanft zu Hundehaut. Nachweislich natürlich.“

### Der zentrale USP

**Nachweislich natürliche Pflege, gemacht für empfindliche Hundehaut.**

Getragen wird er von drei Beweisen, die kein Wettbewerber im Set in dieser Kombination hat:

| Beweis | Was er belegt |
|---|---|
| **Zertifiziert:** NPS, approved by BDIH, kontrolliert durch IONC | Neutrale Stelle bestätigt „natürlich“ |
| **Verträglich:** seifenfrei, schaumfrei, pH-angepasst, ohne synthetische Duftstoffe, Silikone, Erdöl | Das Produkt passt zu Haut*problemen* |
| **Expertise:** Daniela, Züchterin und Hundetrainerin, 35 Jahre mit allergischen und empfindlichen Hunden | Ein Mensch mit Erfahrung steht dahinter, kein Marketing |

### Warum gerade eines unserer drei Produkte?

Jedes Produkt löst eine klar benannte Situation. Dabei gilt eine **Oder/Und-Logik**, die die gesamte Produktstrategie bestimmt:
- **Shampoo, oder-Entscheidung:** Warmduscher (empfindlich) **oder** Raufbold (robust).
- **Pfotenpflege, und-Ergänzung:** Die Hasenfüßin passt zu **jedem** Hund und kommt zusätzlich dazu.

### Welche Rolle spielt was?

| Thema | Rolle | Wo es erscheint |
|---|---|---|
| **Familiengeschichte** | **Beleg der Expertise**, keine Nostalgie. Warum Daniela weiß, was empfindliche Hunde brauchen | eine Sektion auf der Startseite, die Manufaktur-Seite, ein Satz in der Bestellbestätigung |
| **Qualität** | wird **gezeigt, nicht behauptet**: Zertifikat, vollständige INCI, Herstellung, Verpackung | Beweisleiste, Inhaltsstoff-Sektion, Produktseiten, Manufaktur-Seite |
| **Tradition** | Handwerk der **Manufaktur**: kleine Chargen, Allgäu, echtes Siegel. Keine inszenierte Heritage-Deko | Siegel/Wappen als Stempel, Fotos aus der Herstellung, Serifenschrift |
| **Modernität** | steckt in der **Erfahrung**: Tempo, Klarheit, Transparenz, reibungsloser Checkout, präzise Typografie | überall; sie wird nie als Stilzitat eingesetzt |

**Tonalität (Vorschlag): Charme im Namen, Klarheit in der Sache.**
- Die Namen Warmduscher, Raufbold und Hasenfüßin bleiben das Augenzwinkern der Marke, ebenso gelegentliche Mikrotexte.
- Aussagen zu Wirkung, Inhaltsstoffen, Preis und Versand sind nüchtern und präzise.
- „Bäm!“ und „fast so fancy wie Berlin“ entfallen.

---

## 2 · Informationsarchitektur

### Die Struktur folgt den Fragen des Käufers

| Käuferfrage | Wird beantwortet auf | ohne zusätzlichen Klick? |
|---|---|---|
| Was gibt es? Was kostet es? | Startseite, erster Screen | ja |
| Welches passt zu meinem Hund? | Startseite, Bedarfs-Sektion; Produktseite „Für wen / nicht für wen“ | ja |
| Ist das seriös und wirklich natürlich? | Beweisleiste, Inhaltsstoffe, Gründerin (Startseite); Manufaktur-Seite für Tiefe | ja (Tiefe: 1 Klick) |
| Wie wende ich es an? Was ist drin? | Produktseite | 1 Klick |
| Was kostet der Versand, wann kommt es? | am Preis, in der Announcement-Leiste, im Warenkorb | ja |
| Wie kaufe ich? | Karte oder Produktseite → Drawer → Kasse | 2–3 Schritte |
| Was passiert danach? | Danke-Seite, Bestellbestätigung, Versandmail | automatisch |

### Sitemap-Vorschlag

```
/                              Startseite = Schaufenster + Auswahlhilfe + Beweise
├── /warmduscher               Produktseite
├── /raufbold                  Produktseite
├── /hasenfuessin              Produktseite
├── /sets/…                    Set-Seite(n) (optional, siehe Entscheidung 6)
├── /manufaktur                Über uns + Qualität & Standards (zusammengelegt)
├── /hilfe                     FAQ + Versand & Lieferung + Rückgabe + Kontakt
│   └── #kontakt               Kontaktformular (inkl. Händler/Hundefriseure)
├── /kasse                     Checkout (eine Seite, eigenes Design)
│   └── /kasse/danke           Bestellbestätigung
├── /bestellung/[token]        Bestellstatus über signierten Link (Phase 2)
└── Recht: /impressum · /datenschutz · /agb · /widerruf · /versand-zahlung
   (+ Widerrufsfunktion, siehe Technik-Dokument)

Warenkorb = Drawer (Fallback /warenkorb für Direktaufrufe ohne JS)
```

Die Produkt-URLs sind bewusst kurz und stehen auf erster Ebene (`/warmduscher`), weil die Namen Marken sind. Die Alternative `/produkte/warmduscher` wird in Entscheidung 10 festgelegt. Alle alten URLs werden per 301 weitergeleitet.

### Welche Seiten sind wirklich notwendig?

| Seite | Notwendig? | Begründung |
|---|---|---|
| Startseite | **ja** | Sie ist zugleich die Produktübersicht |
| Eigene Produktübersicht / Shop-Seite | **nein** | Bei 3 Produkten ist sie eine leere Zwischenstation. Startseite und Menü übernehmen ihre Aufgabe; `/shop` leitet auf `/#produkte` weiter |
| 3 Produktseiten | **ja** | Einstieg aus Google und Ads; müssen allein überzeugen |
| Warenkorb-Seite | **nein** (nur Fallback) | Der Drawer spart einen Seitenwechsel |
| Checkout | **ja** | eine Seite, alles sichtbar |
| Danke-Seite | **ja** | Bestätigung und nächste Schritte |
| Über uns | **zusammenlegen** | mit Qualität zu **Manufaktur**: eine Geschichte, ein Beweisort |
| Qualität / Standards | **zusammenlegen** | siehe oben |
| FAQ | **zusammenlegen** | mit Versand, Rückgabe und Kontakt zu **Hilfe**: ein Ort für alle Restzweifel |
| Kontakt | **zusammenlegen** | als Abschnitt in Hilfe; E-Mail und Telefon zusätzlich im Footer |
| Rechtsseiten | **ja** | nur im Footer und im Checkout |
| Blog „Ideenräuber“ | **nein** (zum Start) | veraltet und produktfern. Später eventuell als „Ratgeber“ zu Haut und Fell für SEO (Entscheidung 8) |
| Kundenkonto | **nein** (zum Start) | Gastbestellung plus Statuslink per Mail. Ein Konto ist eine Kaufbarriere |
| „Echtheit von Bewertungen“ | **als Hinweis** | direkt bei den Bewertungen, statt als eigene Seite |

**Ergebnis:** 8 inhaltliche Seiten statt heute 14 und mehr. Die Hauptnavigation hat **3 Punkte:** Produkte · Manufaktur · Hilfe, dazu der Warenkorb.

---

## 3 · User Journey

```
EINSTIEG            ENTDECKEN          VERSTEHEN           VERTRAUEN          KAUFEN              DANACH
─────────────────────────────────────────────────────────────────────────────────────────────────────────
Google „Hunde-      Startseite:        Produktseite:       Beweisleiste,      + Warenkorb         Danke-Seite:
shampoo Allergie“   3 Produkte +       Für wen / nicht     INCI + Klartext,   → Drawer (Fort-     Bestellnr.,
→ Produktseite      Preis im 1.        für wen, Wirkstoffe, Zertifikat,       schritt Gratis-     Lieferzeit,
                    Screen             Anwendung in 3      Gründerin,         versand, Set-       Anwendungstipp
Instagram / Ads     Bedarfs-Sektion:   Schritten           Bewertungen,       Hinweis)            Mail 1: Bestätigung
→ Startseite oder   „Welche Pflege                         Versand/Rückgabe   → Kasse (Express-   Mail 2: Versand +
  Produktseite      braucht dein                           am Preis           Pay oben, Gast)     Tracking
                    Hund?“                                                    → „Zahlungspflichtig Mail 3 (+3 T.):
Empfehlung /                                                                    bestellen“        Anwendung
Hundefriseur →                                                                                    Mail 4 (+14 T.):
Startseite                                                                                        Bewertung*
                                                                                                  Mail 5 (~8 Wo.):
                                                                                                  Nachkauf*
─────────────────────────────────────────────────────────────────────────────────────────────────────────
Frage:  „Bin ich    „Was gibt es,      „Passt das zu       „Kann ich dem      „Wie schnell,       „Hat es geklappt,
hier richtig?“      was kostet es?“    meinem Hund?“       trauen?“           wie sicher?“        was nun?“
                                                                         * nur mit Einwilligung
```

**Kritischer Befund:** Viele Käufer landen **direkt auf einer Produktseite**, zum Beispiel über Google oder eine Anzeige. Die Produktseite muss deshalb alle Vertrauensfragen **allein** beantworten. Sie darf nicht voraussetzen, dass jemand die Startseite gesehen hat.

**Kürzester Kaufweg:** Startseite → „+“ auf der Karte → Drawer → Kasse → Bestellen. Das sind **3 Klicks bis zur Kasse**; mit Express-Pay in der Kasse sind es 4 Interaktionen bis zur fertigen Bestellung.

---

## 4 · Startseite: Wireframe als textuelle Struktur

Die Reihenfolge folgt den Fragen des Käufers:
*Was? → Seriös? → Welches? → Warum gut? → Wer? → Andere zufrieden? → Bester Weg zu kaufen? → Restzweifel?*

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 0  Versandkostenfrei ab 70 € · Versand in 1–2 Werktagen (Fakten prüfen)  │ Announcement 36px
├──────────────────────────────────────────────────────────────────────────┤
│ MAYBROOKS            Produkte   Manufaktur   Hilfe                 Korb (0)│ Header 64px
├──────────────────────────────────────────────────────────────────────────┤
│ 1  HERO-REGAL                                                            │
│    Natürliche Pflege für Fell, Haut und Pfoten.                          │ H1
│    NPS-zertifiziert · Manufaktur im Allgäu · von einer Züchterin         │ Beweiszeile
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│   │  Packshot    │  │  Packshot    │  │  Packshot    │  4:5, gleicher     │
│   │  Warmduscher │  │  Raufbold    │  │  Hasenfüßin  │  Studiogrund       │
│   └──────────────┘  └──────────────┘  └──────────────┘                   │
│    Warmduscher        Raufbold           Hasenfüßin                      │
│    Shampoo für        Shampoo für        Balsam für Pfoten               │
│    empfindliche Haut  robustes Fell      & Nase                          │
│    26,50 € · 200 ml [+]  23,80 € · 200 ml [+]  19,95 € · 50 ml [+]       │
│    132,50 €/l          119,00 €/l          399,00 €/l                    │
├──────────────────────────────────────────────────────────────────────────┤
│ 2  BEWEISLEISTE  (Haarlinien, typografisch, keine Icons in Kreisen)      │
│    NPS / BDIH │ Allgäuer Manufaktur │ Seifen- & schaumfrei │ 35 J. Zucht │
├──────────────────────────────────────────────────────────────────────────┤
│ 3  WELCHE PFLEGE BRAUCHT DEIN HUND?                                      │
│    [Empfindliche Haut / Allergie]  [Robust, langes Fell]  [Pfoten & Nase]│ Segmente
│    → Produkt groß + 3 Gründe + „Nicht ideal, wenn …“ + [In den Korb]     │
│    Kleingedruckt: „Shampoo wählen, Hasenfüßin ergänzen“ → Duo-Set        │
├──────────────────────────────────────────────────────────────────────────┤
│ 4  WAS DRIN IST — UND WAS NICHT                                          │
│    3 Schlüsselwirkstoffe (Lavendel · Arganöl · Propolis/Bienenwachs)     │
│    ✗ Seife ✗ synthetische Duftstoffe ✗ Silikone ✗ Erdöl ✗ Tierversuche   │
│    Siegel NPS + 2 Sätze, was es bedeutet → Manufaktur                    │
├──────────────────────────────────────────────────────────────────────────┤
│ 5  DANIELA                                                               │
│    Foto (Frau mit Hund)  │ Zitat, 3 Sätze, warum es Maybrooks gibt       │
│                          │ → Die Manufaktur kennenlernen                 │
├──────────────────────────────────────────────────────────────────────────┤
│ 6  STIMMEN  (nur wenn echte, verifizierte Bewertungen vorliegen)         │
│    3 Zitate mit Hund/Rasse + Produkt │ Durchschnitt + Anzahl │ Hinweis   │
├──────────────────────────────────────────────────────────────────────────┤
│ 7  DAS SET / DUO                                                         │
│    Bild aller Produkte │ „Shampoo + Hasenfüßin“ · Preis · spart X €      │
│    Hinweis Gratisversand                            [Set in den Korb]    │
├──────────────────────────────────────────────────────────────────────────┤
│ 8  FAQ (5 Fragen, Accordion) → alle Fragen in der Hilfe                  │
├──────────────────────────────────────────────────────────────────────────┤
│ 9  FOOTER: Produkte · Manufaktur · Hilfe/Kontakt · Recht · Siegel ·      │
│    Zahlarten · E-Mail/Telefon · ©                                        │
└──────────────────────────────────────────────────────────────────────────┘
```

### Die Sektionen im Detail

**1 · Hero-Regal**

| | |
|---|---|
| Ziel | Die Produkte *sind* der Hero. Der Besucher sieht in 5 Sekunden, was es gibt, für wen und zu welchem Preis |
| Inhalt | H1, Beweiszeile, 3 Produktkarten mit Klartext-Zeile, Preis und Grundpreis |
| Frage des Nutzers | „Was wird hier verkauft, und was kostet es?“ |
| CTA | Karte → Produktseite; „+“ → direkt in den Warenkorb |
| Visuell | ruhige Papierfläche; drei Packshots auf identischem Studiogrund und in identischer Lichtführung, wie ein Regal; großer Weißraum; Produktnamen in der Display-Schrift |
| Animation | einmalig beim Laden: die Karten blenden gestaffelt ein (opacity + 12 px, 60 ms Versatz, 600 ms); danach nur Hover |
| Conversion | Kaufen ohne Seitenwechsel möglich. Kein Bild-Karussell und kein Lifestyle-Banner verdrängt das Produkt |

**2 · Beweisleiste**

| | |
|---|---|
| Ziel | Den Vertrauensvorschuss sofort geben |
| Inhalt | 4 kurze Fakten, jeweils Kennwort plus Halbsatz |
| Frage des Nutzers | „Ist das seriös? Was heißt ‚natürlich‘ hier?“ |
| CTA | keiner; ein Klick auf NPS öffnet eine kleine Erklärung (Popover) |
| Visuell | vier Spalten zwischen Haarlinien, reine Typografie; das echte NPS-Siegel als einzige Grafik |
| Animation | keine |
| Conversion | senkt das Risikoempfinden, bevor jemand zu vergleichen beginnt |

**3 · Bedarfs-Auswahl**

| | |
|---|---|
| Ziel | Die Frage „Welches passt?“ in einem Klick beantworten; die Oder/Und-Logik vermitteln |
| Inhalt | 3 Bedarfs-Segmente. Pro Segment: Produktbild (Anwendung oder Textur), 3 Gründe, „Nicht ideal, wenn …“ (Ehrlichkeit schafft Vertrauen), Button |
| Frage des Nutzers | „Welches ist für meinen Hund?“ |
| CTA | „In den Warenkorb“ · „Mehr zum Produkt“ |
| Visuell | links ein Segment-Schalter, rechts der Inhalt; Produktakzentfarbe als feine Linie beim aktiven Segment |
| Animation | Segmentwechsel: der Inhalt blendet über (200 ms), das Bild über (320 ms); keine Slide-Bewegung |
| Conversion | nimmt die Unsicherheit, falsch zu wählen; der Duo-Hinweis erhöht den Warenkorbwert |

**4 · Was drin ist**

| | |
|---|---|
| Ziel | Qualität belegen |
| Inhalt | 3 Schlüsselwirkstoffe mit Makrofoto und Wirkung in einem Satz; Ausschlussliste; das Zertifikat erklärt |
| Frage des Nutzers | „Warum ist das besser als ein Drogerie-Shampoo?“ |
| CTA | „Alle Inhaltsstoffe“ → Produktseite (Anker); „Unsere Standards“ → Manufaktur |
| Visuell | große Makrofotos (Lavendel, Arganöl, Wabe/Propolis) als echte Fotografie, keine Aquarell-Deko |
| Animation | Bilder blenden beim ersten Erscheinen ein (opacity, 600 ms) |
| Conversion | rechtfertigt den Preis |

**5 · Daniela**

| | |
|---|---|
| Ziel | Einem Menschen hinter dem Produkt vertrauen |
| Inhalt | Foto (Gründerin mit Hund), ein Zitat mit echter Motivation (Hunde mit Allergien), Unterschrift |
| Frage des Nutzers | „Wer steckt dahinter, und versteht sie etwas davon?“ |
| CTA | „Die Manufaktur kennenlernen“ (Textlink) |
| Visuell | 5/7-Aufteilung, Foto im Hochformat, Zitat in der Display-Schrift |
| Animation | keine |
| Conversion | emotionale Bestätigung, platziert *nach* dem rationalen Vergleich |

**6 · Stimmen**

| | |
|---|---|
| Ziel | Soziale Bestätigung |
| Inhalt | 3 verifizierte Bewertungen mit Hund/Rasse und Produkt; Durchschnitt und Anzahl; Hinweis zur Echtheitsprüfung |
| Frage des Nutzers | „Hat es bei anderen Hunden funktioniert?“ |
| CTA | Link auf das bewertete Produkt |
| Visuell | typografisch, ohne Sterne-Kitsch; eine Rasse-Angabe macht die Stimme konkret |
| Animation | keine; **kein Autoplay-Karussell** |
| Conversion | stärkster Einzelfaktor, wenn vorhanden. **Die Sektion entfällt, solange es keine echten Bewertungen gibt** |

**7 · Set / Duo**

| | |
|---|---|
| Ziel | Höherer Warenkorbwert und Gratisversand |
| Inhalt | Set-Bild, Inhalt, Preis, Ersparnis, Hinweis auf Gratisversand |
| Frage des Nutzers | „Wie kaufe ich am besten?“ |
| CTA | „Set in den Warenkorb“ |
| Visuell | ein ruhiges Querformat-Bild, daneben die Kaufbox |
| Animation | keine |
| Conversion | Die Kombination aus Shampoo und Balsam ist die logische Einheit; alle drei Produkte zusammen kosten 70,25 €, damit ist der Versand frei |

**8 · FAQ**

| | |
|---|---|
| Ziel | Die letzten Kaufbarrieren ausräumen |
| Inhalt | Wie oft darf ich waschen? Auch für Welpen? Was, wenn es nicht passt? Versand und Lieferzeit? Warum schäumt es nicht? |
| CTA | „Alle Fragen & Kontakt“ → Hilfe |
| Visuell | Accordion mit Haarlinien |
| Animation | Höhe 240 ms, Plus dreht sich zum Minus |
| Conversion | fängt Unentschlossene ab, bevor sie abspringen |

**9 · Footer**

| | |
|---|---|
| Ziel | Service und Rechtliches, ohne abzulenken |
| Inhalt | 4 Spalten; Siegel; Zahlungsarten; direkte Kontaktdaten |
| Frage des Nutzers | „Wie erreiche ich euch? Wie ist der Rechtsrahmen?“ |
| Visuell | dunkle Fläche (Ink), helle Schrift |

---

## 5 · Produktsystem

### 5.1 Produktstrategie: gleichwertig oder mit Hierarchie?

| Option | Idee | Vorteile | Nachteile |
|---|---|---|---|
| **A · gleichwertig** | drei gleich große Karten | kleine Auswahlmenge (3 ist ideal: keine Überforderung); jedes Produkt hat einen eigenen Bedarf | keine Führung; der Balsam konkurriert scheinbar mit den Shampoos |
| **B · Hero-Produkt** | ein Produkt (z. B. Warmduscher) als Signature | klare Geschichte, klare Werbebotschaft | die anderen beiden werden zu Nebenrollen; der Balsam ist eine andere Kategorie |
| **C · Oder + Und** *(Empfehlung)* | **gleiche visuelle Gewichtung**, aber eine **inhaltliche Logik:** Shampoo *wählen* (Warmduscher **oder** Raufbold), Hasenfüßin *ergänzen* | entspricht dem echten Bedarf (ein Hund braucht *ein* Shampoo, aber jeder Hund profitiert vom Balsam); natürlicher Cross-Sell; Duo-Set ergibt sich logisch | braucht klare Texte in Bedarfs-Sektion und Warenkorb |

**Empfehlung C:**
- Im Hero stehen alle drei gleichrangig nebeneinander (Produkt vor Story).
- Die Führung passiert *danach*: in der Bedarfs-Sektion, auf der Produktseite („Passt dazu“) und im Drawer („Ergänze die Hasenfüßin – dann ist der Versand fast frei“).
- Das **Duo „Shampoo + Hasenfüßin“** ist das empfohlene Set.
- **Ob ein Produkt zusätzlich als Signature hervorgehoben wird, entscheiden wir anhand der Verkaufszahlen** (Entscheidung 3).

### 5.2 Fotosystem: Voraussetzung für alles Weitere

Die Interaktionen funktionieren nur mit mehreren, einheitlichen Bildern. **Shotlist pro Produkt:**

| # | Motiv | Einsatz |
|---|---|---|
| 1 | Packshot frontal, Studiogrund (identisch für alle 3), gleiche Lichtrichtung, 4:5 | Karte, Galerie-Bild 1 |
| 2 | Detail/Textur: Shampoo als Tropfen oder Film, Balsam offen mit Spatel-Spur | **Hover-Bild der Karte**, Galerie |
| 3 | Anwendung: Hände im Hundefell bzw. an der Pfote | Galerie, Anwendungsschritte |
| 4 | Hund nach der Pflege (passender Typ: sensibel/robust/Pfote) | Galerie, Bedarfs-Sektion |
| 5 | Etikett/INCI-Detail | Galerie (Transparenz) |
| 6 | Verpackung (FSC-Karton) | Galerie, Set |
| + | Set-Bild (alle drei), Makros der Wirkstoffe, Manufaktur, Daniela | Startseite, Manufaktur |

Die vorhandenen Fotos reichen für einen **Prototyp**, nicht für den Launch (heute 1 Bild pro Produkt; Benchmarks 5–8).

### 5.3 Produktkarte

**Aufbau von oben nach unten:**
- Bild 4:5, Radius 0
- Name in der Display-Schrift
- Klartext-Zeile (Typ + Bedarf)
- Preis, Inhalt, Grundpreis
- „+“-Button unten rechts im Bild; eine Bewertung erst, wenn es Bewertungen gibt

Die gesamte Karte ist ein Link zur Produktseite. Der „+“-Button ist ein eigener Button und hat keinen Link-Charakter.

**DESKTOP-MOUSEOVER, exakt:**

| Zeit | Element | Verhalten |
|---|---|---|
| 0 ms | Cursor betritt die Karte | **80 ms Verzögerung.** Wer nur darüberfährt, löst nichts aus (kein Flackern beim Überfahren des Rasters) |
| 80 ms | Bild 2 (Textur/Detail) | blendet über Bild 1 ein: `opacity 0→1`, **320 ms**, `cubic-bezier(.22,1,.36,1)`. Bild 2 ist vorgeladen (`fetchpriority=low` nach dem ersten Laden), damit nie ein leerer Frame entsteht |
| 80 ms | beide Bilder | Scale 1,00 → **1,02** über **900 ms** (kaum wahrnehmbar, gibt Tiefe); Ausschnitt fest (`overflow:hidden`) |
| 80 ms | „+“-Button | ist immer sichtbar (auch für Touch und Tastatur). Beim Hover wird aus dem Kreis-Icon eine Pille: **„In den Warenkorb · 26,50 €“** (Breite animiert, 240 ms) |
| 0 ms | Name | Unterstreichung wächst von links: `scaleX 0→1`, 240 ms |
| Mouseleave | alles | zurück in 240 ms (Exits sind schneller als Entries) |
| — | nie | kein Anheben, kein Schatten, kein Tilt, kein Bild-Scrubbing per Mausposition, keine Farbflächen |

**Tastatur:** `:focus-visible` auf der Karte löst denselben Bildwechsel aus; Fokusring 2 px Ink mit 3 px Abstand.

**MOBILE-TOUCH, exakt:**

| Geste | Verhalten |
|---|---|
| Tap auf das Bild oder den Namen | → Produktseite. Mit View Transition wandert das Kartenbild in das erste Galeriebild (progressive Verbesserung) |
| Tap auf „+“ (44 × 44 px, unten rechts im Bild) | Produkt wird hinzugefügt. Der Button wird zum Häkchen (200 ms), das Warenkorb-Badge im Header pulsiert einmal (Scale 1→1,15→1, 300 ms). **Unten erscheint ein Toast** („Warmduscher im Warenkorb · Zur Kasse“), 4 s, wegwischbar. Der Drawer öffnet *nicht* automatisch, damit der Nutzer weiter vergleichen kann |
| Kein Hover-Bild | Auf Touch-Geräten (`@media (hover:none)`) gibt es keine Überblendung. Das Texturbild erscheint stattdessen in der Bedarfs-Sektion und in der Galerie |
| Horizontal wischen | nur im Kartenkarussell, siehe Kapitel 7; **keine verschachtelte Wisch-Galerie in der Karte** (Gestenkonflikt) |
| Long-Press | Systemverhalten, nicht überschrieben |

### 5.4 Produktgalerie (Produktseite)

**Desktop (≥ 1024 px):**
- **Layout:** links 7 von 12 Spalten mit den Bildern *untereinander*. Bild 1 ist groß, die Bilder 2 und 3 stehen nebeneinander, dann folgen einzelne. Rechts, in 5 von 12 Spalten, steht die **Kaufbox sticky** (`top: header + 24 px`).
- **Hover auf ein Bild:** Der Cursor wird zu einem eigenen, feinen „+“-Cursor (24 px). Es gibt **keine** Lupe im Bild.
- **Klick auf ein Bild** öffnet eine **Vollbild-Ansicht**:
  - Papierfläche 98 %, Bild zentriert, mit Blende von der Kartenposition aus (320 ms)
  - Pfeile, Tastatur (←/→/Esc), Zähler „2 / 6“, Schließen
  - **Zoom per zweitem Klick:** Das Bild wird auf 2× skaliert und **folgt der Maus** (`transform`, gedämpft mit lerp 0,12 pro Frame). Das ist mehr als die Lightbox bei Cloud7, die nicht zoomt
  - Ein weiterer Klick oder Esc beendet den Zoom
- **Ohne JavaScript:** Die Bilder sind normale `<img>` mit `srcset` und bleiben voll sichtbar.

**Mobile:**
- **Die Galerie steht ganz oben, randlos über die volle Breite**, 4:5, horizontales Scroll-Snap (`x mandatory`), native Physik.
- **Indikator:** segmentierte Linie unter dem Bild (ein Segment pro Bild, das aktive in Ink). Keine Punkte, keine Pfeile.
- **Tap** öffnet den Vollbild-Viewer. Darin: Pinch-Zoom, Doppeltipp zoomt auf 2,5×, Herunterwischen schließt ihn (mit Ausblenden).
- **Titel, Klartext-Zeile und Preis** müssen im ersten Screen sichtbar sein. Die Galerie ist dafür maximal 62 % der Viewport-Höhe hoch.

### 5.5 Produktdetailseite: Aufbau

```
DESKTOP                                              MOBILE (Reihenfolge)
┌──────────────────────────────┬─────────────────┐   1 Galerie (Swipe)
│ Galerie (Stack)              │ KAUFBOX sticky  │   2 Name · Klartext · Bewertung
│                              │ Eyebrow: Shampoo│   3 Preis · Grundpreis · MwSt/Versand
│                              │ WARMDUSCHER     │   4 Lieferzeit
│                              │ für empfindliche│   5 [In den Warenkorb]
│                              │ & allergische   │   6 3 Kernnutzen
│                              │ Haut            │   … Module wie links
│                              │ ★ 4,9 (48)*     │
│                              │ 26,50 € · 200 ml│
│                              │ 132,50 €/l      │
│                              │ inkl. MwSt.,    │
│                              │ zzgl. Versand   │
│                              │ ● Versand in    │
│                              │   1–2 Werktagen │
│                              │ [– 1 +] [In den │
│                              │  Warenkorb]     │
│                              │ ✓ seifenfrei    │
│                              │ ✓ pH-angepasst  │
│                              │ ✓ NPS-zertif.   │
│                              │ ──────────────  │
│                              │ Passt dazu:     │
│                              │ Hasenfüßin [+]  │
└──────────────────────────────┴─────────────────┘
 Module darunter (volle Breite, ruhig):
 A  Für wen — und für wen nicht   (ehrliche Abgrenzung + Link zum anderen Shampoo)
 B  Wirkstoffe                     (3 Schlüsselwirkstoffe: Foto + Wirkung)
 C  Anwendung in 3 Schritten       (Fotos/Illustration, Mengenangabe, Häufigkeit)
 D  Alle Inhaltsstoffe             (INCI + Übersetzung in Alltagssprache, Tabelle)
 E  Zertifikat & Herkunft          (NPS/BDIH, Allgäu, FSC-Verpackung — kompakt)
 F  Bewertungen*                   (verifiziert, mit Hund/Rasse, Echtheitshinweis)
 G  Fragen zu diesem Produkt       (3–5, Accordion)
 H  Passt dazu / Duo-Set
 * nur wenn vorhanden
```

**Prinzipien der Produktseite:**
- Alles, was die Kaufentscheidung betrifft, steht **in der Kaufbox**.
- Alles zum Vertiefen steht **darunter**.
- Lange Texte stehen nie über dem Kaufbutton.

### 5.6 Produktvergleich

- **Auf der Startseite:** als Bedarfs-Sektion (siehe oben). Das ist emotional und schnell.
- **Als Tabelle:** auf jeder Produktseite im Modul A als Link „Vergleichen“. Er öffnet einen Drawer mit der Tabelle.
  - Zeilen: Geeignet für · Hauttyp/Fell · Hauptwirkstoff · Duft · Häufigkeit · Inhalt · Preis · Grundpreis
  - Spalten: die 3 Produkte, jeweils mit einem „+“
- **Mobile:** Die Tabelle wird zu einem **Segment-Schalter** (Warmduscher | Raufbold | Hasenfüßin) mit untereinander stehenden Werten. Keine horizontal scrollende Tabelle.

### 5.7 Variantenauswahl

- **Heute gibt es genau eine Größe pro Produkt.** Die Größe erscheint deshalb nur als Text („200 ml“), **ohne** Auswahlfeld. Ein Auswahlfeld mit nur einer Option ist Rauschen.
- **Das Datenmodell ist trotzdem auf Varianten ausgelegt** (siehe Technik-Dokument). Kommen später Größen dazu, zum Beispiel ein Nachfüllpack mit 500 ml:
  - Segment-Buttons statt Dropdown: rechteckig, Radius 0, 48 px hoch, aktiv mit Ink-Rahmen 1,5 px
  - der Preis aktualisiert sich über eine sanfte Ziffern-Überblendung
  - die URL bekommt `?groesse=500`
- **Sets** wählt man als eigene Produkte, nicht als Variante.

### 5.8 Add to Cart

| Zustand | Darstellung |
|---|---|
| Ruhe | Ink-Fläche, Text „In den Warenkorb“ |
| Hover | Fläche wird minimal dunkler, der Pfeil rückt 4 px nach rechts (200 ms) |
| Klick | Der Button bleibt gleich breit (kein Layout-Sprung). Der Text blendet zu einem feinen Spinner über; die Ladezeit wird mindestens 300 ms angezeigt, damit nichts flackert |
| Erfolg Desktop | **Der Drawer gleitet von rechts herein** (360 ms), Hintergrund 40 % abgedunkelt. Die neue Position wird kurz hervorgehoben (Hintergrund blendet aus, 1,2 s) |
| Erfolg Mobile (Produktseite) | Der Drawer öffnet als **Bottom-Sheet** mit 88 % Höhe, Griff oben, Schließen per Wischen nach unten |
| Fehler | Inline unter dem Button: „Konnte nicht hinzugefügt werden – bitte erneut versuchen“. Der Zustand wird zurückgesetzt |

**Inhalt des Drawers:**
1. Titel „Warenkorb (2)“ und Schließen
2. **Fortschritt bis Gratisversand** (Linie plus Text „Noch 23,70 € bis versandkostenfrei“, bei Erreichen „Versandkostenfrei ✓“, ohne Konfetti)
3. Positionen mit Stepper und Entfernen
4. **Eine einzige Empfehlung** nach der Oder/Und-Logik: Liegt ein Shampoo im Korb, wird die Hasenfüßin empfohlen, und umgekehrt
5. Zwischensumme, Hinweis „Versand wird im nächsten Schritt berechnet“
6. [Zur Kasse], darunter Express-Buttons (Apple Pay / PayPal) und Zahlungsarten-Logos in Graustufen

### 5.9 Kauf- vs. Anfrage-CTA

- **Endkunden:** direkter Kauf. Der Shop existiert bereits, eine Anfrage wäre ein Rückschritt.
- **Anfrage** nur für **Hundefriseure, Züchter und Händler** (Großgebinde, Wiederverkauf): in der Hilfe → Kontakt mit dem Thema „Gewerblich“ und ein Link im Footer. Relevanz siehe Entscheidung 7.

---

## 6 · Design System

Die konkreten Schriften und Farbwerte sind ein **Vorschlag**. Die Regeln, Abstände, Größen und Verhaltensweisen gelten unabhängig davon.

**Richtung (Vorschlag): „Manufaktur-Präzision“.**
- Warmes Papier, tiefes Ink, sehr wenig Farbe.
- Farbe kommt aus der Fotografie und aus feinen Produktakzenten.
- Eine Serifenschrift trägt die Produktnamen und das Handwerk, eine neutrale Grotesk das Interface.
- Das Ergebnis soll eigenständig und hochwertig wirken, nicht nach Pastell-Shop und nicht nach Cloud7-Klon.

### 6.1 Typografie

| Rolle | Vorschlag A (Empfehlung) | Vorschlag B |
|---|---|---|
| Display (Produktnamen, Headlines) | Serif mit optischer Größe, z. B. **Newsreader Display** (frei) oder lizenziert **GT Alpina / Canela** | Grotesk-Display, z. B. **Neue Montreal** / **Switzer** |
| Text & Interface | **Hanken Grotesk** (frei) oder lizenziert **Söhne** | dieselbe Grotesk |
| Wirkung | handwerklich, warm, trotzdem modern | klinisch-modern, „Apotheke“ |

**Typografische Skala** (fluid, `clamp`):

| Token | Größe | Zeilenhöhe | Laufweite | Einsatz |
|---|---|---|---|---|
| `display-xl` | clamp(44px, 6vw, 96px) | 1.0 | -0.02em | H1 Startseite |
| `display-l` | clamp(36px, 4.5vw, 64px) | 1.05 | -0.015em | Produktname auf der Produktseite, Sektions-Headlines |
| `display-m` | clamp(28px, 3vw, 40px) | 1.1 | -0.01em | Zitate, Unter-Headlines |
| `title` | 22px / 24px | 1.25 | 0 | Produktname auf der Karte |
| `body-l` | 18px | 1.55 | 0 | Einleitungen |
| `body` | 16px | 1.6 | 0 | Fließtext; mobil nie kleiner (verhindert iOS-Zoom in Formularen) |
| `small` | 14px | 1.5 | 0.005em | Grundpreis, Hinweise |
| `label` | 12px | 1.3 | 0.08em, VERSAL | Eyebrows, sparsam (höchstens 1 pro Sektion) |

**Regeln:**
- Maximale Zeilenlänge 65 Zeichen.
- Preise mit **Tabellenziffern** (`font-variant-numeric: tabular-nums`).
- Höchstens 2 Schriftfamilien und 3 Schnitte insgesamt.
- Keine Versal-Headlines in Display-Größe (Abgrenzung zu Cloud7).
- Fonts selbst hosten, `font-display: swap`, nur benötigte Subsets.

### 6.2 Farben

| Token | Wert (Vorschlag) | Einsatz |
|---|---|---|
| `--paper` | #F5F2EC | Seitenhintergrund (warmes Papier) |
| `--paper-2` | #ECE7DF | Flächen, Fotohintergrund, Drawer-Kopf |
| `--studio` | #E7E4DF | **ein** einheitlicher Packshot-Grund für alle Produkte |
| `--ink` | #1C1B19 | Text, primäre Buttons, Footer-Fläche |
| `--ink-2` | #5E5A53 | Sekundärtext (AA auf Papier) |
| `--line` | rgba(28,27,25,.14) | Haarlinien, Rahmen |
| `--accent-warmduscher` | #6F6488 (gedämpftes Lavendel-Violett) | Akzentlinie, Bedarfs-Segment, Etikett-Bezug |
| `--accent-raufbold` | #9A7B4F (Arganöl-Gold) | dito |
| `--accent-hasenfuessin` | #B7792F (Honig/Propolis) | dito |
| `--success` | #2F6B4F | Gratisversand erreicht, Bestätigungen |
| `--error` | #A23B2A | Fehlermeldungen |
| `--focus` | = `--ink`, 2 px + 3 px Abstand | Fokusring |

**Regeln:**
- 90 % der Fläche sind Papier und Ink.
- Produktakzente sind **nie** Flächen und **nie** Buttons. Sie erscheinen nur als Linie, Punkt, Kennzeichen oder Unterstreichung, maximal 4 % der Fläche.
- **Es gibt nur eine CTA-Farbe: Ink.**
- Alle Paarungen erreichen mindestens WCAG AA.
- Ein Dark Mode ist für den Shop nicht vorgesehen, weil die Produktfarben und Fotos auf Papier kalibriert sind.

### 6.3 Abstände, Raster, Container

- **Basis 4 px**, Skala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
- **Vertikaler Sektionsabstand:** Desktop 128–160 px, Tablet 96, Mobile 72.
- **Raster:**
  - Desktop ≥ 1200 px: 12 Spalten, Gutter 24 px (32 px ab 1440 px)
  - Tablet 768–1199 px: 8 Spalten, Gutter 20 px
  - Mobile: 4 Spalten, Gutter 16 px
- **Seitenrand:** `clamp(20px, 5vw, 72px)`.
- **Container:** Inhalt max. 1320 px; Textblöcke max. 640 px; Bilder dürfen randlos über die volle Breite laufen.
- **Rhythmus:** Innerhalb einer Karte gelten 8/12/16 px, zwischen den Karten Gutter-Abstände. Headline zu Inhalt 32–48 px.

### 6.4 Formen, Linien, Schatten

| Element | Regel |
|---|---|
| Bilder, Karten | Radius **0** |
| Buttons, Inputs | Radius **2 px** (wirkt präzise, nicht rund) |
| Chips/Badges | Radius 2 px, nie als Pille |
| „+“ auf der Karte | Kreis (die einzige runde Form, bewusst als Signatur) |
| Linien | 1 px `--line`; aktive Zustände 1,5 px Ink |
| Schatten | **keine** auf Karten und Buttons. Nur schwebende Ebenen (Drawer, Popover, Toast): `0 24px 64px rgba(28,27,25,.14)` |

### 6.5 Buttons

| Typ | Aussehen | Hover | Aktiv | Fokus | Deaktiviert |
|---|---|---|---|---|---|
| Primär | Ink-Fläche, Papier-Text, 52 px (mobil 56 px) hoch, 28 px Innenabstand, `body` Medium | Fläche #000, Pfeil +4 px, 200 ms | `translateY(1px)` | Fokusring | 40 % Deckkraft, `cursor:not-allowed` |
| Sekundär | transparent, Rahmen 1 px Ink | füllt sich mit `--paper-2`, 200 ms | wie primär | Fokusring | wie primär |
| Textlink | Ink, Unterstreichung 1 px mit Abstand 4 px | Unterstreichung läuft neu von links ein, 240 ms | — | Fokusring | — |
| Icon-Button | 44 × 44 px Trefferfläche, Icon 20 px | Hintergrund `--paper-2` | — | Fokusring | — |

**Regeln:**
- Pro Viewport gibt es **genau einen** Primär-Button.
- Keine Button-Skalierung, kein Glow.

### 6.6 Formulare

- **Labels** stehen immer sichtbar über dem Feld. Keine Platzhalter als Label.
- **Felder:** 52 px hoch, Rahmen 1 px `--line`, Papier-Hintergrund. Fokus: Rahmen Ink 1,5 px plus Fokusring.
- **Validierung:** beim Verlassen des Felds (on blur), nicht bei jedem Tastendruck. Fehlertext unter dem Feld, `--error`, mit Icon. Erfolg wird nicht ständig markiert.
- **Browser-Hilfen:**
  - korrekte `autocomplete`-Werte (`email`, `given-name`, `postal-code` …)
  - `inputmode` (numerisch bei PLZ und Telefon)
  - die Postleitzahl füllt den Ort vor
- **Pflichtfelder** bekommen keine Sternchen; optionale Felder sind mit „(optional)“ markiert.
- **Checkbox/Radio:** eigene Gestaltung, 20 px, mit Trefferfläche 44 px.

### 6.7 Navigation, Header, Footer

**Header Desktop:**
- 64 px hoch, Papier-Hintergrund, Haarlinie unten.
- Wortmarke links, Navigation mittig: **Produkte · Manufaktur · Hilfe**. Rechts der Warenkorb mit Anzahl.
- **Keine Suche** (3 Produkte) und **kein Konto** (Gastbestellung).

**Sticky-Verhalten:**
- Beim Herunterscrollen blendet der Header nach oben aus (Scroll-Delta über 8 px, 240 ms).
- Beim Hochscrollen kommt er zurück.
- Oberhalb von 120 px Scrollposition ist er immer sichtbar.

**Menü „Produkte“ (Hover oder Klick):**
- Ein flaches Panel mit den **3 Produktkarten in klein** (Bild, Name, Klartext-Zeile, Preis), dazu Set und „Vergleichen“.
- Hover-Verzögerung beim Öffnen 120 ms, beim Schließen 200 ms (verhindert Zufallsöffnungen). Das Panel blendet mit 8 px Weg ein, 240 ms.

**Announcement-Leiste:**
- *eine* Botschaft, ohne Laufschrift und ohne Rotation, schließbar.

**Footer:**
- Ink-Fläche mit 4 Spalten: Produkte · Maybrooks (Manufaktur, Qualität) · Hilfe (FAQ, Versand, Rückgabe, Kontakt) · Rechtliches.
- Darunter: Siegel, Zahlungsarten, E-Mail und Telefon, Instagram, ©.

### 6.8 Icons

- **Nur funktionale Icons:** Warenkorb, Menü, Schließen, Pfeil, Plus/Minus, Häkchen, Chevron, Info, Schloss.
- **Ein Set:** 1,5 px Linienstärke, auf 24er-Raster, eckige Linienenden. Als Basis Phosphor (Light) oder Lucide, angepasst, oder ein eigenes kleines Set.
- **Keine dekorativen Icons** für USPs. Beweise werden über Typografie, echte Siegel und Fotos erbracht.

### 6.9 Bildbehandlung

- Packshots auf **einem** Studiogrund (`--studio`), gleiche Lichtrichtung (Licht von oben links, weicher Schatten), gleiche Kamerahöhe, Format 4:5.
- **Lifestyle-Fotos:** natürliches, warmes Tageslicht, echte Hunde, keine Filter, keine Vignetten, keine Aquarell-Überlagerungen.
- **Makros** der Inhaltsstoffe mit geringer Schärfentiefe.
- **Formate:** AVIF/WebP mit `srcset`, verschwommener LQIP-Platzhalter in Bildfarbe, feste Seitenverhältnisse (kein Layout-Sprung).
- **Alt-Texte** beschreiben das Motiv, nicht die Keywords.

### 6.10 Hover-Zustände: Übersicht

| Element | Hover-Verhalten |
|---|---|
| Produktkarte | Bildwechsel (320 ms) + Scale 1,02 (900 ms) + „+“ wird zur Pille |
| Textlink | Unterstreichung läuft von links ein |
| Nav-Link | Unterstreichung, Farbe bleibt |
| Primär-Button | Fläche dunkler, Pfeil +4 px |
| Sekundär-Button | Fläche füllt sich |
| Galeriebild | eigener „+“-Cursor, keine Bildveränderung |
| Accordion-Zeile | Ink-2 wird zu Ink, das Plus dreht sich erst beim Öffnen |
| Icon-Button | `--paper-2`-Kreisfläche |

Alle Hover-Effekte gelten nur mit `@media (hover:hover) and (pointer:fine)`.

---

## 7 · Motion System

**Grundsatz:** Bewegung hat einen von drei Zwecken: **Rückmeldung** (etwas hat funktioniert), **Orientierung** (woher kommt etwas, wohin geht es) oder **Kontinuität** (ein Objekt bleibt dasselbe). Alles andere entfällt.

### Tokens

| Token | Dauer | Einsatz |
|---|---|---|
| `--dur-xs` | 120 ms | Farbe und Deckkraft kleiner UI-Teile |
| `--dur-s` | 200 ms | Buttons, Unterstreichungen, Häkchen |
| `--dur-m` | 320 ms | Bildüberblendung, Panels, Segmentwechsel |
| `--dur-l` | 360–420 ms | Drawer, Bottom-Sheet, Vollbild-Galerie |
| `--dur-xl` | 600–900 ms | einmalige Einblendungen, langsamer Bild-Scale |

| Easing | Kurve | Einsatz |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22,1,.36,1)` | alles, was erscheint |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Bewegungen von A nach B (Drawer) |
| `--ease-exit` | `cubic-bezier(.4,0,1,1)` | Verschwinden; Exits dauern 75 % der Entry-Dauer |

### Was animiert wird: wann, wie lange, wie stark

| Element | Auslöser | Bewegung | Dauer | Intensität |
|---|---|---|---|---|
| Hero-Karten | erstes Laden | opacity 0→1, y 12→0, gestaffelt 60 ms | 600 ms | niedrig |
| Sektions-Headlines und Bilder | erstes Erscheinen (IntersectionObserver, 15 %) | opacity 0→1, y 16→0 | 600 ms | niedrig, **nur einmal** |
| Kartenbild | Hover | Überblendung + Scale 1,02 | 320 / 900 ms | sehr niedrig |
| „+“ → Pille | Hover | Breite und Textblende | 240 ms | niedrig |
| Add to Cart | Klick | Spinner → Häkchen; Badge-Puls 1,15 | 200–300 ms | Rückmeldung |
| Drawer / Bottom-Sheet | Öffnen | x 100 %→0 bzw. y 100 %→0, Overlay 0→40 % | 360 ms | mittel |
| Galerie Vollbild | Öffnen | Blende und Scale von der Bildposition aus | 320 ms | mittel |
| Accordion | Klick | Höhe (`grid-template-rows 0fr→1fr`), Plus→Minus | 240 ms | niedrig |
| Header | Scrollrichtung | y 0 ↔ -100 % | 240 ms | niedrig |
| Karte → Produktseite | Navigation | View Transition: das Bild morpht | 400 ms | Kontinuität; nur wo unterstützt |
| Preis bei Variante | Wechsel | Ziffern blenden über | 200 ms | niedrig |

**Technische Regeln:**
- Animiert werden **nur `opacity` und `transform`** (bei der Accordion-Höhe über den CSS-Grid-Trick).
- Kein JavaScript-Animationsframework nötig; CSS und Web Animations API reichen.
- Keine Animation darf Inhalte blockieren. Ist ein Bild nicht geladen, wird trotzdem nichts verzögert.
- **`prefers-reduced-motion: reduce`:** alle `transform`-Bewegungen entfallen, Überblendungen dauern maximal 120 ms, keine View Transitions, kein Scale.

**Bewusst vermieden:**
- Parallax, Scroll-Jacking, gepinnte Scroll-Sequenzen
- Autoplay-Karussells, Laufbänder
- Hochzählende Zahlen
- Text Wort für Wort oder Buchstabe für Buchstabe einblenden, Schreibmaschinen-Effekt
- Cursor-Follower, magnetische Buttons, 3D-Tilt
- Bounce, Elastic, Overshoot
- Ladebildschirme, Seiten-Fades beim Start
- Hero-Video mit Autoplay
- Konfetti
- Hover-Effekte auf Touch-Geräten

---

## 8 · Mobile, eigenständig gedacht

| Bereich | Lösung |
|---|---|
| **Header** | 56 px: Menü links · Wortmarke mittig · Warenkorb rechts. Blendet beim Herunterscrollen aus |
| **Menü** | Vollbild-Sheet von links. **Oben stehen die 3 Produkte als große Zeilen** mit Bild, Klartext und Preis, denn das Menü ist auch Shop. Darunter Manufaktur, Hilfe, dann Kontakt (Telefon/E-Mail antippbar). Große Schrift, 56 px Zeilenhöhe |
| **Erster Screen der Startseite** | H1 in 2–3 Zeilen, Beweiszeile, darunter bereits die **erste Produktkarte samt Preis**. Kein Hero-Bild über dem Produkt |
| **Produktkarten** | **Horizontales Snap-Karussell**: Kartenbreite 78 vw, die nächste Karte ragt 22 vw ins Bild (signalisiert „es gibt mehr“), dazu der Segment-Indikator. Alternative: 3 Karten untereinander in zwei Spalten (Entscheidung 10). „+“ immer sichtbar |
| **Bedarfs-Sektion** | Segment-Schalter oben (sticky innerhalb der Sektion), Inhalt darunter |
| **Produktbilder / Galerie** | randlos, Swipe, Segment-Linie, Tap → Vollbild mit Pinch und Doppeltipp, Herunterwischen schließt |
| **CTA** | Der Kaufbutton liegt im ersten Screen der Produktseite. Sobald er aus dem Bild scrollt, erscheint die **Sticky-Kaufleiste** unten (Name, Preis, Button), mit Abstand `safe-area-inset-bottom`. Sie verschwindet über dem Footer und wenn der Original-Button wieder sichtbar ist |
| **Weitere Sticky-Elemente** | Nur Header und Kaufleiste; nie gleichzeitig ein Chat-Widget oder Cookie-Banner darüber |
| **Warenkorb** | Bottom-Sheet mit 88 % Höhe; Button „Zur Kasse“ fest am unteren Rand des Sheets |
| **Checkout** | eine Spalte. **Oben Express-Zahlung** (Apple Pay / Google Pay / PayPal): damit sind Adresse und Zahlung in einem Schritt erledigt. Die Bestellübersicht ist oben eingeklappt, der Gesamtbetrag bleibt immer sichtbar |
| **Checkout-Reihenfolge** | E-Mail → Lieferadresse (Autocomplete) → Versand (vorgewählt) → Zahlung → Prüfen → „Zahlungspflichtig bestellen“ |
| **Formulare** | 16 px Schrift, 52–56 px Felder, passende Tastatur je Feld, keine Pflicht zum Konto, Rechnungsadresse „wie Lieferadresse“ vorausgewählt |
| **Cookie-Banner** | Bottom-Sheet, maximal 30 % der Höhe, „Ablehnen“ und „Akzeptieren“ gleichwertig; verdeckt nie den Kaufbutton |
| **Daumenzonen** | Primäre Aktionen liegen unten; Schließen-Buttons in Sheets zusätzlich per Wischgeste |
| **Performance** | LCP mobil unter 2,0 s: das erste Kartenbild bekommt `fetchpriority=high`, der Rest lädt lazy. Kein JavaScript für die Darstellung des ersten Screens |

---

## 9 · Technische Architektur & Integrationspunkte (Kurzfassung)

→ Details, Datenmodell, API und Rechtsrahmen: [`07-technik-und-integrationen.md`](07-technik-und-integrationen.md)

- **Frontend:** Next.js + TypeScript. Das eigene Design-System ist in CSS-Tokens umgesetzt; es gibt kein UI-Kit.
- **Backend:**
  - **zum Start:** WooCommerce headless, der bestehende Shop läuft als Backend weiter
  - **später optional:** Wechsel zu Medusa v2
  - **nicht empfohlen:** Shopify headless, weil der Checkout dort fremd gestaltet bleibt
- **Adapter-Schicht** für Commerce, Payment, E-Mail, Rechnung, Versand, CRM, Bewertungen und Analytics. Anbieter werden gewechselt, ohne die Oberfläche zu ändern.
- **Payment:** eingebettete Komponenten (z. B. Stripe Payment Element für Karte, Apple Pay, Google Pay, PayPal, Klarna, SEPA) im eigenen Design; kein Weiterleitungs-Checkout.
- **Events:** `order.created`, `payment.succeeded`, `order.shipped` usw. lösen Mails, Rechnungen und den CRM-Abgleich aus.
- **Analytics:** cookielos als Basis; Marketing-Pixel nur mit Einwilligung; E-Commerce-Events nach dem GA4-Schema.

---

## 10 · Offene Entscheidungen

Die Liste mit Optionen und Empfehlungen steht im Chat. Die dort getroffenen Antworten werden hier nachgetragen.

| # | Entscheidung | Status |
|---|---|---|
| 1 | Designrichtung (Typografie A/B, Farbsystem) | offen |
| 2 | Wortmarke / Wappen / Name „Maybrooks“ vs. „Maybrooks Cottage“ | offen |
| 3 | Produkthierarchie (Empfehlung C) + Verkaufszahlen | offen |
| 4 | Tonalität | offen |
| 5 | Fotoshooting (Budget/Zeitpunkt) | offen |
| 6 | Sets & Preise | offen |
| 7 | B2B / Hundefriseure | offen |
| 8 | Blog „Ideenräuber“ & Link „Stadtköterei“ | offen |
| 9 | Backend + Hosting + wer betreibt es | offen |
| 10 | Kleinere Festlegungen: URLs, mobile Karten, Fakten (vegan, Lieferzeit, Rückgabe, Bewertungen) | offen |
