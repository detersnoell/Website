# Maybrooks Relaunch – Projektregeln

Familien-Manufaktur für natürliche Hunde-Fellpflege (maybrooks.de). Drei Produkte:
Warmduscher, Raufbold (Shampoos), Hasenfüßin (Pfotenbalsam). Kommunikation mit dem
Nutzer auf Deutsch.

## Verbindliche Grundlagen
- `concept/blaupause-v1.md` – Konzept; **Kap. 10 = getroffene Entscheidungen**
- `concept/07-technik-und-integrationen.md` – Architektur, Rechtsrahmen
- `research/` – Bestandsaufnahme und Wettbewerbsanalyse
- `previews/` ist verworfenes Archiv (alte Pastell-/Cloud7-Richtung) – nicht verwenden.

## Arbeitsweise
RESEARCH → DISCUSSION → CONCEPT → DESIGN → IMPLEMENTATION → TESTING → ITERATION.
Strategische Entscheidungen mit dem Nutzer treffen, nicht vorspringen.

## Design-Skills (`.claude/skills/`)
frontend-design, ui-ux-pro-max, design-taste-frontend, redesign-audit – geprüfte
Snapshots, siehe `.claude/skills/SOURCES.md`. **Rangfolge:** Nutzerentscheidungen und
Blaupause gehen jeder Skill-Voreinstellung vor (z. B. ruhiges Motion-System statt
„Motion Intensity 6“). Skills dienen als Prüfraster gegen generische KI-Optik.

## Inhalte
- Nur belegte Fakten. Pflegeaussagen, keine Heilversprechen.
- „Vegan“ nur für die Shampoos, bis die INCI der Hasenfüßin geklärt ist
  (veröffentlichte INCI nennt Bienenwachs, Propolis, Honig).
- Übergangsbilder sind KI-Mockups mit falschen Etiketten (Name, INCI, ml). Keine
  Rückseiten/INCI-Ansichten verwenden; vor Launch durch echte Fotos ersetzen.

## Frontend (`web/`)
Next.js + TypeScript, CSS-Tokens in `src/app/globals.css`, CSS Modules, kein UI-Kit.
Commerce nur über `src/lib/commerce` (Adapter: lokal / WooCommerce Store API).
Prüfen vor Commit: `npx tsc --noEmit`, `npx next build`, Screenshots Desktop 1440 +
Mobile 390 via Playwright.

Playwright in der Cloud-Umgebung: Proxy-CA in NSS importieren
(`certutil -A -d sql:/root/.pki/nssdb -n agent-proxy-ca -t "C,," -i /root/.ccr/agent-proxy-ca.crt`)
und `chromium.launch({channel:'chromium', proxy:{server:process.env.HTTPS_PROXY}})`
für externe Seiten; localhost ohne Proxy.
