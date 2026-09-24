"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createCommerceAdapter, type Cart } from "@/lib/commerce";
import { emptyCart, type AddItem } from "@/lib/commerce/types";
import { allProducts } from "@/lib/catalog/products";
import { track, type AnalyticsItem } from "@/lib/analytics";

function itemsFor(list: AddItem[]): AnalyticsItem[] {
  return list.flatMap((i) => {
    const p = allProducts.find((x) => x.variants.some((v) => v.sku === i.sku));
    const v = p?.variants.find((x) => x.sku === i.sku);
    return p && v ? [{ item_id: v.sku, item_name: p.name, price: v.priceGross / 100, quantity: i.qty }] : [];
  });
}

interface Toast {
  id: number;
  message: string;
}

interface CartContextValue {
  cart: Cart;
  ready: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  /** Fügt Artikel hinzu. `feedback`: Drawer öffnen oder nur Toast zeigen. */
  add: (items: AddItem[], feedback?: "drawer" | "toast", label?: string) => Promise<void>;
  setQuantity: (lineId: string, qty: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
  lastAddedSku: string | null;
  toast: Toast | null;
  dismissToast: () => void;
  badgePulse: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const adapter = useMemo(() => createCommerceAdapter(), []);
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAddedSku, setLastAddedSku] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [badgePulse, setBadgePulse] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    adapter
      .getCart()
      .then(setCart)
      .catch(() => setCart(emptyCart))
      .finally(() => setReady(true));
  }, [adapter]);

  const add = useCallback<CartContextValue["add"]>(
    async (items, feedback = "drawer", label) => {
      const started = performance.now();
      const next = await adapter.addItems(items);
      // Mindestdauer, damit der Ladezustand nicht flackert
      const elapsed = performance.now() - started;
      if (elapsed < 300) await new Promise((r) => setTimeout(r, 300 - elapsed));
      setCart(next);
      const tracked = itemsFor(items);
      track("add_to_cart", { value: tracked.reduce((s, i) => s + i.price * i.quantity, 0), items: tracked });
      setLastAddedSku(items[items.length - 1]?.sku ?? null);
      setBadgePulse((n) => n + 1);
      if (feedback === "drawer") setDrawerOpen(true);
      else {
        clearTimeout(toastTimer.current);
        setToast({ id: Date.now(), message: `${label ?? "Artikel"} im Warenkorb` });
        toastTimer.current = setTimeout(() => setToast(null), 4000);
      }
    },
    [adapter],
  );

  const setQuantity = useCallback(
    async (lineId: string, qty: number) => {
      const before = cart.lines.find((l) => l.id === lineId);
      if (before && qty < before.qty) track("remove_from_cart", { items: itemsFor([{ sku: before.sku, qty: before.qty - qty }]) });
      setCart(await adapter.setQuantity(lineId, qty));
    },
    [adapter, cart.lines],
  );
  const remove = useCallback(
    async (lineId: string) => {
      const before = cart.lines.find((l) => l.id === lineId);
      if (before) track("remove_from_cart", { items: itemsFor([{ sku: before.sku, qty: before.qty }]) });
      setCart(await adapter.removeLine(lineId));
    },
    [adapter, cart.lines],
  );

  const value: CartContextValue = {
    cart,
    ready,
    drawerOpen,
    openDrawer: () => {
      setLastAddedSku(null);
      setDrawerOpen(true);
      track("view_cart", { value: cart.subtotal / 100 });
    },
    closeDrawer: () => setDrawerOpen(false),
    add,
    setQuantity,
    remove,
    lastAddedSku,
    toast,
    dismissToast: () => setToast(null),
    badgePulse,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart außerhalb von CartProvider");
  return ctx;
}
