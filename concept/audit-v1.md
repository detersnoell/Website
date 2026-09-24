# Audit v1 – gerendertes Ergebnis

Stand: 2026-09-24. Geprüft im Browser (Playwright/Chromium) auf Desktop 1440, Laptop 1280,
Tablet 834 (Touch) und Mobile 390 (Touch).

## Messwerte

| Prüfung | Ergebnis |
|---|---|
| Interaktionstests (Hover, Drawer, Panel, Tabs, Header, Galerie, Zoom, Accordion, Kasse, Kontakt, 404, Weiterleitung, Mobile-Toast, Menü, Sticky-Leiste, Bottom-Sheet) | 28/28 funktionieren (ein Testfall mit fehlerhaftem Selektor, visuell bestätigt) |
| axe-core (WCAG 2.2 AA + Best Practices), 6 Seiten | 0 Verstöße |
| Lighthouse Mobile Startseite | Performance 91, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse Mobile Produktseite | Performance 98, Accessibility 100, Best Practices 100, SEO 100 |
| Übertragene Datenmenge Startseite | ca. 480 KB (alte Seite: ca. 18,5 MB) |
| Horizontales Scrollen, Rundungen, Versalien | keine |
| JavaScript-Fehler | keine |

## Behoben während des Tests
- Überschriftenhierarchie der Startseite (Produktkarten jetzt h2 unter h1)
- Announcement-Leiste als Landmark
- Kontrast der inaktiven Auswahl-Tabs (3,5:1 → AA)
- Zugänglicher Name der „Hinzufügen“-Buttons enthält den sichtbaren Text (WCAG 2.5.3)
- Touch-Ziele für eigenständige Textlinks und Wortmarke (≥ 44 px)
- Versal-Tabellenkopf in der INCI-Tabelle
- Grammatik der „Nicht ideal, wenn …“-Sätze

## Selbstkritik – wichtigste Verbesserungspunkte
Siehe Chat-Zusammenfassung; hier für die Nachverfolgung:
1. Übergangsbilder sind der größte Qualitätsbremser (Rückseiten, falsche Etiketten, uneinheitliche Hintergründe).
2. Markenidentität noch zu leise: sauber, aber austauschbar. Es fehlt ein Signatur-Element.
3. Tablet nutzt das Mobile-Layout für Produktseite und Kasse (Breakpoint 900 px).
4. Hilfe-Seite: großer leerer Kopf, Kontakt mit Gründerin zu weit unten.
5. Sets-Zeilen: drei zusammengesetzte Einzelbilder wirken unruhig.
6. Kein Social Proof (Bewertungen) – Vertrauenslücke.
7. Startseiten-LCP 3,5 s auf simuliertem 4G (Font-Datei 132 KB mit optischer Größenanpassung).
