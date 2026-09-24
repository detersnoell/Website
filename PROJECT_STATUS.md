# Projektstatus — Website-Redesign

Letztes Update: 2026-09-24 (v3 — echte Produktbilder eingebaut)

## Aktueller Stand in Kürze

Live-Vorschau: https://claude.ai/artifact/RSnGjJwHZgxYybHbGiuiNY (privat,
nur für den Konto-Inhaber; Freigabe nur über das Share-Menü der Seite selbst).
Quellcode: `previews/maybrooks-v2.html`. Bilder: `previews/assets/maybrooks/`.

**Echte Bilder bereits eingebaut** (als Artifact-Assets hochgeladen, im
`products`-Array per `src`-Feld referenziert):
- Warmduscher (Fellshampoo) — 1 Ansicht
- Raufbold (Fellshampoo) — 1 Ansicht, zusätzlich als Hero-Bild im Einsatz
- Hasenfüßin (Pfotenbalsam) — 4 Ansichten (ein vom Nutzer geliefertes
  Sammelbild wurde per Pillow in 4 Einzelbilder zerlegt: Verpackung,
  geschlossen, geöffnet/Textur, Etikett-Detail)

**Bekannter Mangel:** Ein geliefertes Bild ("Oat Shampoo", Datei
`oat-shampoo-MISMATCH-englisch.jpg`) passt nicht ins Set — englischer
statt deutscher Label-Text, andere Flaschenkappen-Form als die anderen
zwei Shampoos. Wurde NICHT eingebaut, liegt aber im Repo für den Fall,
dass der Nutzer es trotzdem nutzen möchte. Produktkarte 4 ("Glanzstück")
ist weiterhin nur Platzhalter.

**Offen:** Drei Hundefotos (zwei Vizslas in Dünen, Frau mit
Australian-Shepherd-Mix auf einer Bank, drei Vizsla-Welpen) wurden vom
Nutzer im Chat gezeigt, kamen aber OHNE zugreifbaren Dateipfad an (anders
als die Produktbilder) — konnten deshalb technisch nicht als Datei
gespeichert/hochgeladen werden. Nutzer wurde gebeten, sie erneut zu
schicken. Sobald vorhanden: Frau-mit-Hund-Foto → „Über uns"-Sektion
(dafür ist bereits ein Foto-Platzhalter vorgesehen), die beiden anderen
Fotos → ergänzende Familien-/Rudel-Galerie in derselben Sektion.

---


## Zielobjekt

**maybrooks.de** ("Maybrooks Cottage") — Familienbetrieb, Manufaktur für
natürliche/vegane Hunde-Fellpflege (Shampoo, Pfotenbalsam) aus dem Allgäu.
Aktuelle Live-Seite: WordPress, mehrere echte technische/UX-Probleme
(mehrfache H1, fehlende Alt-Texte, keine Meta-Description, kaputte
Layout-Lücken, generische Cookie-Banner-Farbe die nicht zur Marke passt).

## Recherche-Grundlage (Designreferenzen, nicht Zielobjekt)

Als Premium-Referenzen im selben Marktsegment analysiert (echte
Playwright-Crawls, Screenshots, Typografie/Farb-Extraktion):
- **cloud7.de** — Berliner Premium-Hundemarke, Shopify, editorial/reduziert,
  Schwarz-Weiß, Roboto Condensed + HarmoniaSans, 0px Border-Radius.
- **maxbone.com** — US-Lifestyle-Marke, warme Cream/Sage-Töne, GoodSans.
- **wildone.com** — bunte, verspielte Markenidentität, Modern Era Font,
  30px Border-Radius, Coral/Teal-Farbblöcke.

## Entwicklung des Entwurfs (2 Iterationen)

**v1 (Cottage-Richtung, verworfen):** Warme Erdtöne (Coffee/Olive/Sand),
Fraunces-Serife, handgezeichnete Caveat-Annotationen — sollte den
bestehenden Manufaktur-Charme elevieren. Nutzer wollte das explizit NICHT.

**v2 (aktuell, live) — Prestige-Richtung:** Nutzer-Feedback war: "baue
Cloud7 in der Version unseres Familienbetriebs", großer Marken-Auftritt wie
Adidas/Nike, keine Brauntöne sondern helle Pastelltöne, Ton/Sprache
professioneller statt Cottage-Humor.

- **Farben:** Off-White-Basis (`--paper #FAF8F4`), Pastell-Lavendel/Salbei/
  Blush als Akzente statt Braun.
- **Typografie:** "Big Shoulders Display" (kräftige, breite Headlines,
  Großbuchstaben) + "Public Sans" (Body).
- **Struktur:** Sticky Header, große Hero-Fläche, Kategorie-Kacheln in
  Pastelltönen, Produktraster mit Bestseller-Sektion, Qualitäts- und
  Über-uns-Sektionen, aufgeräumter dunkler Footer.
- **Kernfeature: Produktbilder-Lightbox** — Klick auf ein Produktbild öffnet
  eine große Ansicht mit Vor/Zurück-Pfeilen, Punkt-Navigation, Bildzähler,
  Tastatursteuerung (Pfeiltasten/Escape), Fokus-Management. Aktuell zeigt
  jeder Slot einen beschrifteten Platzhalter statt eines echten Fotos.
- **Mobile-Menü** wurde nachträglich ergänzt (Hamburger-Toggle), da die
  Navigation auf Mobile zunächst komplett fehlte — im Selbst-Check
  gefunden und behoben.

## Bilder — offener Punkt

Kein Bildgenerierungs-Tool in dieser Umgebung verfügbar; Stockfoto-Seiten
(Pexels/Unsplash) blockieren automatisierten Zugriff per Bot-Schutz.
Nutzer kümmert sich **extern** um Produktfotos (z. B. via Bing Image
Creator / ChatGPT — Prompts wurden im Chat bereitgestellt) und kommt
damit zurück.

**Wenn echte Bilder vorliegen:** In `previews/maybrooks-v2.html` im
`products`-Array (im `<script>`-Block) pro Bild `label`/`hint` durch eine
echte Bild-URL ersetzen (z. B. `src` statt Platzhalter-Text) — die
Lightbox-Mechanik selbst muss nicht verändert werden.

## Wichtiger Kontext: Netzwerk-Policy

Diese Cloud-Umgebung hat eine restriktive Egress-Policy (nur Infrastruktur-
Domains wie npm/GitHub erlaubt). Der Nutzer hat für diese Session vollen
Zugriff freigegeben, aber mit Auflage: nur auf explizit genannte Domains
zugreifen (`cloud7.de`, `maxbone.com`, `wildone.com`, `maybrooks.de`,
`godly.design`). Eine neue Session startet vermutlich wieder mit der
restriktiven Standard-Policy — ggf. erneut mit dem Nutzer klären.

## Live-Vorschau

Privates Artifact (nur für den Konto-Inhaber sichtbar, nicht öffentlich
auffindbar): https://claude.ai/artifact/RSnGjJwHZgxYybHbGiuiNY

Der Quellcode dieser exakten Version liegt in
[`previews/maybrooks-v2.html`](previews/maybrooks-v2.html) — bei Bedarf
erneut per Artifact-Tool veröffentlichen (`file_path` + `url` des obigen
Links, um denselben Link aktuell zu halten).

## Nächste Schritte (Workflow-Plan laut Nutzer)

Ursprünglicher Prozess: Analyse → Design-Referenzen → Design System →
Planung → **Abstimmung** → Implementierung → Testing → Iteration →
Finalisierung. Aktuell befinden wir uns iterativ zwischen Design-Richtung
und erster visueller Iteration; formale Abstimmung/Design-System-Dokument
wurde zugunsten schneller visueller Iteration übersprungen (auf
ausdrücklichen Wunsch des Nutzers).

Sobald der Nutzer mit Produktfotos zurückkommt:
1. Fotos in die Lightbox-Datenstruktur einpflegen.
2. Hero-/Kategorie-/Über-uns-Foto-Slots ebenfalls befüllen.
3. Weitere Iterationsrunde (visuelles Feedback vom Nutzer einholen).
4. Danach: Unterseiten (Produktdetailseite, Über uns, Kontakt), echtes
   Design-System-Dokument, technische Umsetzung im eigentlichen
   Tech-Stack der Seite (aktuell nur Vorschau-HTML, keine
   Framework-Entscheidung getroffen).
