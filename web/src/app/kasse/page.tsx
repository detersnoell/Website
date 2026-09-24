import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = { title: "Kasse", robots: { index: false } };

export default function Kasse() {
  return <Checkout />;
}
