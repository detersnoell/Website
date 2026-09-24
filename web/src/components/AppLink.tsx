import NextLink from "next/link";
import PreviewLink from "./PreviewLink";

/**
 * Einheitlicher Link der Website. In der statischen Vorschau
 * (NEXT_PUBLIC_STATIC_PREVIEW=1) werden daraus normale Links auf .html-Dateien.
 */
const AppLink = (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1" ? PreviewLink : NextLink) as typeof NextLink;

export default AppLink;
