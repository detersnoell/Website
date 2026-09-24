import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import s from "../content.module.css";

export const metadata: Metadata = {
  title: "Die Manufaktur",
  description: "Maybrooks: natürliche Pflege für Hunde, entwickelt von einer Züchterin und hergestellt in einer Naturkosmetik-Manufaktur im Allgäu.",
};

export default function Manufaktur() {
  return (
    <>
      <header className={`container ${s.hero}`}>
        <p className="label muted">Manufaktur</p>
        <h1 className="display-xl">Aus Erfahrung mit empfindlichen Hunden.</h1>
        <p className={`body-l muted ${s.intro}`}>
          Maybrooks ist ein Familienbetrieb. Unsere Pflege entsteht in einer kleinen Naturkosmetik-Manufaktur im Allgäu, nach Standards, die eine unabhängige
          Stelle prüft.
        </p>
      </header>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={`${s.media} reveal`}>
            <Image src="/images/brand/gruenderin-mit-hund.jpg" alt="Daniela Köchling mit ihrem Hund" fill sizes="(max-width: 899px) 100vw, 40vw" />
          </div>
          <div className={`${s.prose} reveal`}>
            <p className="label muted">Die Gründerin</p>
            <h2 className="display-m">Daniela Köchling, Züchterin und Hundetrainerin</h2>
            <p className="body-l">
              Seit 35 Jahren leben Hunde in Danielas Alltag, Hunde vieler Rassen. Viele von ihnen hatten Unverträglichkeiten und Allergien, die sich oft über die
              Haut zeigen. Für Tier und Mensch ist das ein echter Stressfaktor.
            </p>
            <p className="muted">
              Daraus entstand Maybrooks: Pflege, die gründlich reinigt, ohne die Haut zu belasten. Mit Inhaltsstoffen, die man versteht, und ohne alles, was
              empfindliche Haut nicht braucht.
            </p>
          </div>
        </div>
      </section>

      <section id="standards" className={`section ${s.tinted}`}>
        <div className={`container ${s.split}`}>
          <h2 className="display-l reveal">Unsere Standards</h2>
          <div className={`${s.prose} reveal`}>
            <h3>Zertifiziert natürlich</h3>
            <p className="muted">
              Unsere Produkte sind nach dem Natural Product Standard (NPS), approved by BDIH, zertifiziert. Das Label zeichnet die Natürlichkeit von Produkten aus,
              die keine Kosmetik im rechtlichen Sinn sind. Nur natürliche, nicht gentechnisch veränderte Rohstoffe, naturidentische Konservierungsstoffe und
              natürliche Herstellungsverfahren sind erlaubt. Die Einhaltung kontrolliert laufend die IONC GmbH.
            </p>
            <h3>Was nicht hineinkommt</h3>
            <ul className={s.list}>
              <li>keine synthetischen Duftstoffe</li>
              <li>kein Erdöl, keine Silikone und deren Derivate</li>
              <li>keine gentechnisch veränderten Rohstoffe</li>
              <li>keine Seife; die Shampoos sind schaumfrei und pH-angepasst</li>
              <li>keine Tierversuche</li>
            </ul>
            <h3>Bis zur Verpackung</h3>
            <p className="muted">
              Unsere Faltschachteln werden in Deutschland hergestellt und sind FSC-zertifiziert, also aus Papier aus verantwortungsvoller Forstwirtschaft.
            </p>
            <div style={{ marginTop: "var(--s-5)" }}>
              <ButtonLink href="/#produkte" arrow>
                Zu den Produkten
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
