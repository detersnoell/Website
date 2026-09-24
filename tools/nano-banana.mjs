#!/usr/bin/env node
/**
 * Nano Banana (Gemini Image) – Bildgenerierung/-bearbeitung über die Gemini API.
 * Kein Drittanbieter-MCP: direkter Aufruf der offiziellen API.
 *
 *   GEMINI_API_KEY=… node tools/nano-banana.mjs "Prompt" [-i eingabe.jpg …] [-o out.png] [-m modell]
 *
 * Modelle (Stand 2026-09): gemini-3.1-flash-image (Standard), gemini-3-pro-image,
 * gemini-3.1-flash-lite-image.
 *
 * WICHTIG: Für Moodboards, Hintergründe, Stimmungsbilder und Freisteller.
 * Keine KI-generierten Packshots als „echte“ Produktfotos verwenden – Etikett,
 * Verpackung und Inhalt müssen dem realen Produkt entsprechen.
 */
import { readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const args = process.argv.slice(2);
const inputs = [];
let out = `nano-banana-${Date.now()}.png`;
let model = "gemini-3.1-flash-image";
const prompt = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "-i") inputs.push(args[++i]);
  else if (args[i] === "-o") out = args[++i];
  else if (args[i] === "-m") model = args[++i];
  else prompt.push(args[i]);
}

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("GEMINI_API_KEY fehlt (als Umgebungsvariable der Cloud-Umgebung anlegen).");
  process.exit(1);
}
if (!prompt.length) {
  console.error('Aufruf: node tools/nano-banana.mjs "Prompt" [-i bild.jpg] [-o out.png] [-m modell]');
  process.exit(1);
}

const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const input = [{ type: "text", text: prompt.join(" ") }];
for (const file of inputs) {
  input.push({ type: "image", mime_type: mime[extname(file).toLowerCase()] ?? "image/jpeg", data: (await readFile(file)).toString("base64") });
}

const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
  method: "POST",
  headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
  body: JSON.stringify({ model, input }),
});
const json = await res.json();
if (!res.ok) {
  console.error(`API-Fehler ${res.status}:`, JSON.stringify(json.error ?? json).slice(0, 800));
  process.exit(1);
}

// Antwortformat defensiv durchsuchen: jedes Objekt mit Bild-MIME + Base64-Daten
const images = [];
(function walk(node) {
  if (!node || typeof node !== "object") return;
  const m = node.mime_type ?? node.mimeType;
  const d = node.data;
  if (typeof m === "string" && m.startsWith("image/") && typeof d === "string") images.push({ m, d });
  for (const v of Object.values(node)) walk(v);
})(json);

if (!images.length) {
  console.error("Kein Bild in der Antwort:", JSON.stringify(json).slice(0, 800));
  process.exit(1);
}
for (const [n, img] of images.entries()) {
  const file = images.length === 1 ? out : out.replace(/(\.\w+)?$/, `-${n + 1}$1`);
  await writeFile(file, Buffer.from(img.d, "base64"));
  console.log(`gespeichert: ${file} (${img.m})`);
}
