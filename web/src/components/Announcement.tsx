import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";

export function Announcement() {
  return (
    <aside
      aria-label="Hinweis"
      style={{
        minHeight: "var(--announce-h)",
        display: "grid",
        placeItems: "center",
        padding: "6px var(--margin)",
        background: "var(--paper-2)",
        color: "var(--ink-2)",
        fontSize: "var(--fs-small)",
        textAlign: "center",
      }}
    >
      Versandkostenfrei ab {formatPrice(store.freeShippingThreshold).replace(",00", "")}
    </aside>
  );
}
