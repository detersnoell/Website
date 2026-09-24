import { forwardRef } from "react";

/**
 * Nur für die statische Vorschau (PREVIEW_EXPORT=1): ersetzt next/link durch
 * normale Links auf die exportierten .html-Dateien, damit die Vorschau unter
 * beliebigem Pfad funktioniert. Der echte Shop nutzt weiterhin next/link.
 */
type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string; hash?: string };
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
};

function toFile(href: Props["href"]): string {
  const raw = typeof href === "string" ? href : `${href.pathname ?? ""}${href.hash ? `#${href.hash}` : ""}`;
  if (/^(https?:|mailto:|tel:|#)/.test(raw)) return raw;
  const [path, hash] = raw.split("#");
  const clean = path.replace(/^\/+|\/+$/g, "");
  const file = clean === "" ? "index.html" : `${clean}.html`;
  return hash !== undefined ? `${file}#${hash}` : file;
}

const PreviewLink = forwardRef<HTMLAnchorElement, Props>(function PreviewLink({ href, prefetch, scroll, replace, ...rest }, ref) {
  void prefetch;
  void scroll;
  void replace;
  return <a ref={ref} href={toFile(href)} {...rest} />;
});

export default PreviewLink;
