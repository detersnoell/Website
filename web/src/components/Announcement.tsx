import { formatPrice } from "@/lib/money";
import { store } from "@/lib/store";

export function Announcement() {
  return (
    <p
      style={{
        minHeight: "var(--announce-h)",
        display: "grid",
        placeItems: "center",
        padding: "6px var(--margin)",
        background: "var(--paper-2)",
        fontSize: "var(--fs-small)",
        textAlign: "center",
      }}
    >
      Versandkostenfrei ab {formatPrice(store.freeShippingThreshold).replace(",00", "")} · {store.dispatchNote}
    </p>
  );
}
