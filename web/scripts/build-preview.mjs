/**
 * Baut eine statische Vorschau der Website, die unter beliebigem Pfad
 * (z. B. als geteilter Link) funktioniert: alle Seiten flach als .html,
 * alle Verweise relativ. API-Routen entfallen (Formulare zeigen dann den
 * ehrlichen Hinweis auf die E-Mail-Adresse).
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";

// Manche Hosts reservieren Pfade mit „_“ – der Next-Ordner heißt in der Vorschau daher „nx“.
const ASSET_DIR = "nx";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const api = join(root, "src/app/api");
const apiAside = join(root, ".api-aside");
const out = join(root, "out");

rmSync(out, { recursive: true, force: true });
if (existsSync(api)) renameSync(api, apiAside);
try {
  execSync("npx next build", { cwd: root, stdio: "inherit", env: { ...process.env, PREVIEW_EXPORT: "1", NEXT_PUBLIC_STATIC_PREVIEW: "1", NEXT_TELEMETRY_DISABLED: "1" } });
} finally {
  if (existsSync(apiAside)) renameSync(apiAside, api);
}

renameSync(join(out, "_next"), join(out, ASSET_DIR));
rmSync(join(out, "_not-found.html"), { force: true });
rmSync(join(out, "_not-found.txt"), { force: true });
rmSync(join(out, "_not-found"), { recursive: true, force: true });

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

let n = 0;
for (const file of walk(out)) {
  let s;
  if (file.endsWith(".js")) {
    // JavaScript: nur Chunk-Basis und Bildpfade relativ machen. Next ermittelt den
    // Pfad-Präfix zur Laufzeit selbst aus der Skript-Adresse.
    s = readFileSync(file, "utf8");
    const t = s
      .replace('?TURBOPACK_CHUNK_BASE_PATH:"/_next/"', `?TURBOPACK_CHUNK_BASE_PATH:"./${ASSET_DIR}/"`)
      .replace('indexOf("/_next/")', `indexOf("/${ASSET_DIR}/")`)
      .replace(/(["'])\/images\//g, "$1./images/")
      // U+FFFD als Escape-Sequenz schreiben (gleiche Bedeutung, manche Hosts lehnen das Zeichen ab)
      .replaceAll("\uFFFD", "\\uFFFD");
    if (t !== s) {
      writeFileSync(file, t);
      n++;
    }
  } else if (file.endsWith(".html") || file.endsWith(".txt")) {
    s = readFileSync(file, "utf8");
    const before = s;
    // Absolute Pfade → relativ (Seiten liegen alle flach im Wurzelverzeichnis)
    s = s.replace(/(["'(=\\]+)\/(_next\/|images\/|icon\.svg)/g, "$1./$2").replaceAll("./_next/", `./${ASSET_DIR}/`);
    s = s.replace(/(href|src)="\/(icon\.svg|favicon\.ico)/g, '$1="./$2');
    if (s !== before) {
      writeFileSync(file, s);
      n++;
    }
  } else if (file.endsWith(".css")) {
    s = readFileSync(file, "utf8");
    const t = s.replace(/url\((["']?)\/_next\/static\/media\//g, "url($1../media/");
    if (t !== s) {
      writeFileSync(file, t);
      n++;
    }
  }
}
// Kurzer Name für Tab/Galerie des geteilten Links
const home = join(out, "index.html");
writeFileSync(home, readFileSync(home, "utf8").replace(/<title>[^<]*<\/title>/, "<title>Maybrooks</title>"));

console.log(`Vorschau gebaut: ${out} (${n} Dateien angepasst)`);
