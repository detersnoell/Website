import Link from "next/link";
import { allProducts } from "@/lib/catalog/products";
import s from "./content.module.css";

export default function NotFound() {
  return (
    <header className={`container ${s.hero}`}>
      <h1 className="display-l">Diese Seite gibt es nicht.</h1>
      <p className={`body-l muted ${s.intro}`}>Vielleicht suchst du eines unserer Produkte:</p>
      <ul className={s.notFoundList}>
        {allProducts.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`} className="link">
              {p.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/" className="link">
            Zur Startseite
          </Link>
        </li>
      </ul>
    </header>
  );
}
