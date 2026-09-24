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

## Aktueller Stand: Konzept-Phase (wartet auf Entscheidungen)

- [x] **A — Bestandsaufnahme maybrooks.de:** `research/A-bestandsaufnahme-maybrooks.md`
- [x] **B/C — Referenzen & Wettbewerb** (Cloud7 als Nutzer-Referenz + Dr Lisa,
      4-Legger, Fable, Wild One, maxbone, Pets Deli): `research/B-C-referenzen-und-wettbewerb.md`
- [x] **Konzept-Blaupause v1:** `concept/blaupause-v1.md` +
      `concept/07-technik-und-integrationen.md`
- [ ] **Offene Entscheidungen** (Kap. 10 der Blaupause) mit dem Nutzer klären
- [ ] Danach: Prototyp / Implementierung

## Technischer Hinweis (Cloud-Umgebung)

Der Playwright-Browser brauchte die Proxy-CA im NSS-Store:
`certutil -A -d sql:/root/.pki/nssdb -n agent-proxy-ca -t "C,," -i /root/.ccr/agent-proxy-ca.crt`
(`certutil` aus `libnss3-tools`) und den Launch mit
`chromium.launch({channel:'chromium', proxy:{server:process.env.HTTPS_PROXY}})`.
