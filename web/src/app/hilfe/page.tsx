import Image from "next/image";
import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";
import s from "../content.module.css";

export const metadata: Metadata = {
  title: "Hilfe & Kontakt",
  description: "Häufige Fragen, Versand, Rückgabe und Kontakt zu Maybrooks.",
};

const fragen = [
  { title: "Warum schäumen die Shampoos nicht?", content: "Schaum sagt nichts über die Reinigungsleistung aus. Unsere Shampoos reinigen mit milden, pflanzlichen Tensiden, ohne Seife und Schaum, und lassen sich dadurch leichter ausspülen." },
  { title: "Welches Shampoo passt zu meinem Hund?", content: "Bei empfindlicher, zu Reizungen neigender Haut der Warmduscher. Bei robustem Fell, wenn Glanz und Kämmbarkeit im Vordergrund stehen, der Raufbold. Die Hasenfüßin ergänzt beide." },
  { title: "Wie oft kann ich meinen Hund waschen?", content: "Beide Shampoos sind mild genug für die regelmäßige Anwendung, zum Beispiel auch für die Pfoten nach dem Spaziergang." },
  { title: "Was bedeutet NPS-zertifiziert?", content: "Der Natural Product Standard, approved by BDIH, zeichnet die Natürlichkeit von Pflegeprodukten aus, die keine Kosmetik im rechtlichen Sinn sind. Die Einhaltung kontrolliert die IONC GmbH." },
  { title: "Werden die Produkte an Tieren getestet?", content: "Nein. Wir testen grundsätzlich nicht an Tieren." },
];

export default function Hilfe() {
  return (
    <>
      <header className={`container ${s.hero}`}>
        <h1 className="display-xl">Wie können wir helfen?</h1>
      </header>

      <section id="fragen" className="section">
        <div className={`container ${s.split}`}>
          <h2 className="display-m">Häufige Fragen</h2>
          <Accordion items={fragen} />
        </div>
      </section>

      <section id="versand" className={`section ${s.border}`}>
        <div className={`container ${s.split}`}>
          <h2 className="display-m">Versand &amp; Lieferung</h2>
          <div className={s.prose}>
            <table className={s.table}>
              <tbody>
                <tr>
                  <td>Deutschland, {store.carrier}</td>
                  <td className="num">{formatPrice(store.shippingCostDE)}</td>
                </tr>
                <tr>
                  <td>Ab {formatPrice(store.freeShippingThreshold)} Bestellwert</td>
                  <td>versandkostenfrei</td>
                </tr>
                <tr>
                  <td>Europa</td>
                  <td>auf Anfrage</td>
                </tr>
              </tbody>
            </table>
            {/* TODO(Betreiber): Lieferzeit ergänzen */}
          </div>
        </div>
      </section>

      <section id="rueckgabe" className={`section ${s.border}`}>
        <div className={`container ${s.split}`}>
          <h2 className="display-m">Rückgabe</h2>
          <div className={s.prose}>
            {/* TODO(Betreiber): Rückgabebedingungen für geöffnete Produkte */}
            <p className="muted">
              Du hast ein gesetzliches Widerrufsrecht von 14 Tagen. Alle Einzelheiten stehen in der <a className="link" href="/widerruf">Widerrufsbelehrung</a>.
            </p>
          </div>
        </div>
      </section>

      <section id="kontakt" className={`section ${s.tinted}`}>
        <div className={`container ${s.contact}`}>
          <div className={s.contactImage}>
            <Image
              src="/images/brand/gruenderin-mit-hund.jpg"
              alt="Daniela Köchling, Gründerin von Maybrooks, mit ihrem Hund"
              fill
              sizes="(max-width: 899px) 100vw, 40vw"
            />
          </div>
          <div className={s.prose}>
            <h2 className="display-l">Kontakt</h2>
            <p className="body-l">
              Hinter Maybrooks steht Daniela Köchling, Züchterin, Hundetrainerin und Gründerin. Bei Fragen zu einer Bestellung, zur Pflege deines Hundes oder
              zu unseren Produkten sind wir für dich da.
            </p>
            <p className="body-l">
              <a className="link" href={`mailto:${store.contact.email}`}>
                {store.contact.email}
              </a>
            </p>
            <h3>Für Händler</h3>
            <p className="muted">
              Du möchtest Maybrooks in deinem Geschäft anbieten oder im Salon verwenden? Schreib uns mit dem Betreff „Händleranfrage“.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
