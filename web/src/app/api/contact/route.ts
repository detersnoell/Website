import { NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/email";
import { store } from "@/lib/store";
import { validate, validators } from "@/lib/validation";

type Topic = "bestellung" | "pflege" | "haendler" | "sonstiges";
const topics: Record<Topic, string> = {
  bestellung: "Bestellung",
  pflege: "Pflege & Produkte",
  haendler: "Händleranfrage",
  sonstiges: "Sonstiges",
};

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  // Honeypot gegen Spam-Bots
  if (body.website) return NextResponse.json({ ok: true });

  const values = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    topic: String(body.topic ?? "sonstiges"),
    message: String(body.message ?? ""),
  };
  const errors = validate(values, {
    name: validators.required,
    email: validators.email,
    message: validators.minLength(10),
  });
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  const provider = getEmailProvider();
  if (!provider) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const topic = topics[values.topic as Topic] ?? topics.sonstiges;
  await provider.send({
    to: store.contact.email,
    replyTo: values.email,
    subject: `[${topic}] Anfrage von ${values.name}`,
    text: values.message,
  });
  // Eingangsbestätigung an Kundin/Kunden (Event contact.submitted → später CRM)
  await provider.send({
    to: values.email,
    subject: "Deine Nachricht an Maybrooks",
    text: `Hallo ${values.name},\n\nvielen Dank für deine Nachricht. Wir melden uns bei dir.\n\nMaybrooks`,
  });
  return NextResponse.json({ ok: true });
}
