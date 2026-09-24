# Projektstatus — Maybrooks Relaunch

Letztes Update: 2026-09-24

## Neustart (verbindlich)

Der Nutzer hat am 2026-09-24 einen **kompletten Neustart** beschlossen.
Alle früheren Designrichtungen und Absprachen sind **verworfen** — insbesondere
die Pastell-Richtung, der Cloud7-Bezug, die Schriftwahl und das Layout aus
`previews/maybrooks-v2.html`. Die Datei bleibt nur als Archiv im Repo und darf
nicht als Grundlage verwendet werden.

Gesetzt ist nur:
- Marke: **Maybrooks** (maybrooks.de), Familien-Manufaktur für natürliche Hunde-Fellpflege.
- Die drei Kernprodukte: **Warmduscher**, **Raufbold**, **Hasenfüßin**.
- Die Produktfotos in `previews/assets/maybrooks/` sind nur Rohmaterial;
  über ihre Nutzung wird neu entschieden.

## Prozess

RESEARCH → DISCUSSION → CONCEPT → DESIGN → IMPLEMENTATION → TESTING → ITERATION.
Nicht vorspringen; strategische Entscheidungen werden mit dem Nutzer getroffen.

## Aktueller Stand: Implementierung v1

- [x] **A — Bestandsaufnahme maybrooks.de:** `research/A-bestandsaufnahme-maybrooks.md`
- [x] **B/C — Referenzen & Wettbewerb** (Cloud7 als Nutzer-Referenz + Dr Lisa,
      4-Legger, Fable, Wild One, maxbone, Pets Deli): `research/B-C-referenzen-und-wettbewerb.md`
- [x] **Konzept-Blaupause v1:** `concept/blaupause-v1.md` +
      `concept/07-technik-und-integrationen.md`
- [x] **Entscheidungen** getroffen (Kap. 10 der Blaupause)
- [x] **Frontend v1** (`web/`): Startseite, Produktseiten, Drawer, Kasse (ohne Zahlung),
      Manufaktur, Hilfe, Rechts-Platzhalter; Commerce-Adapter lokal + WooCommerce
- [x] **Design-Tools**: kostenlose Skills in `.claude/skills/` (frontend-design,
      ui-ux-pro-max, design-taste-frontend, redesign-audit). Stitch und Nano Banana
      auf Wunsch des Nutzers entfernt (keine externen APIs)
- [~] **Übergangsbilder**: Hasenfüßin eingebaut; Shampoo-Bilder kamen nicht als Datei an
- [x] Anti-KI-Optik-Durchgang: keine Rundungen, keine Versal-Labels, keine „A · B · C“-
      Zeilen, keine Pfeile, keine Scheinnummerierung, keine Einblend-Animationen,
      hellerer Papierton, heller Footer, Zeilen statt Dreier-Karten, 404-Seite
- [x] Gründerinnen-Foto im Kontaktbereich (`/hilfe#kontakt`), wer hinter der Marke steht
- [ ] Hochauflösendes Wappen, altes Hero-Motiv (Annotationen, im Code nachbauen):
      kamen nur als Anzeige, nicht als Datei. Vizsla-Foto optional
- [x] Implementierung v1: Checkout-Logik mit Validierung und Bestellentwurf, Kontaktformular
      (+ API mit E-Mail-Adapter), Produktvergleich, Analytics-Ereignisse (GA4-Schema, ohne
      Versand), Sitemap/robots, Tastatur-/Fokus-Handling
- [x] Test & Audit: `concept/audit-v1.md`
- [x] Iteration 2: Tablet zweispaltig (Produktseite, Kasse), Hilfe mit Kontakt/Gründerin zuerst,
      ruhige Set-Zeilen, Anmerkungs-Motiv (Signatur) auf der Startseite, neue Seite
      „Über uns“ (`/ueber-uns`, ersetzt /manufaktur) mit Wappen, Gründerin, Hunden, Allgäu,
      Namen, Standards; Textabgleich mit Originalseite
- [x] Iteration 3 (Nutzerwünsche): altes Hero-Motiv als erster Eindruck (Navigation abgeschnitten,
      Tippfehler „Hautberuhigt“ → „Haut“, „by REDI“ im Siegel entfernt), Button „Unsere Produkte“;
      Wappen-Emblem im Header; mobiles Menü mit „Unsere Produkte“ zum Aufklappen; Hintergründe in
      hellen Beige-Nuancen; Merkmale als Striche in Produktfarbe; „Passt dazu“ mit Bild;
      Inhaltsstoffe farbig, NPS-Block eingefärbt, INCI-Liste aufklappbar; Anwendung als eigener
      Bereich; Vergleich als „Welche Pflege passt?“-Fenster (wie eine Größentabelle)
- [ ] Hero-Motiv ist Übergang: Etiketten zeigen weiter „für Körper & Haar“ und winzig „by REDI“;
      vor Launch durch echtes Foto ersetzen
- [ ] Versand-/Rückgabefakten, Kontaktdaten, Rechtstexte vom Betreiber

## Vorschau-Link

Statische Vorschau (Artifact, privat; Freigabe über das Share-Menü der Seite):
https://claude.ai/artifact/1rXJq4hUdvbP635VNorNPR

Erzeugen: `cd web && npm run build:preview` → `web/out/` (flache .html-Seiten, relative
Pfade, Next-Ordner als `nx/`, keine API-Routen). Aktualisieren: dieselbe URL erneut
veröffentlichen. Hinweis: GitHub Pages dieses Repos zeigt eine andere Seite (Branch
`claude/quirky-hawking-7vb1j5`) – nicht überschreiben.

## Technischer Hinweis (Cloud-Umgebung)

Der Playwright-Browser brauchte die Proxy-CA im NSS-Store:
`certutil -A -d sql:/root/.pki/nssdb -n agent-proxy-ca -t "C,," -i /root/.ccr/agent-proxy-ca.crt`
(`certutil` aus `libnss3-tools`) und den Launch mit
`chromium.launch({channel:'chromium', proxy:{server:process.env.HTTPS_PROXY}})`.
