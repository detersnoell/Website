import s from "@/app/content.module.css";

/** Platzhalter: Rechtstexte werden unverändert aus dem bestehenden Shop übernommen. */
export function LegalStub({ title }: { title: string }) {
  return (
    <header className={`container ${s.hero}`}>
      <h1 className="display-l">{title}</h1>
      <p className={`muted ${s.intro}`}>
        Dieser Rechtstext wird vor dem Start unverändert aus dem bestehenden Shop übernommen und rechtlich geprüft.
      </p>
    </header>
  );
}
