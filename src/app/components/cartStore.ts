"use client";

import { useSyncExternalStore } from "react";
import { products } from "@/app/data/products";

type CartEntry = { slug: string; quantity: number };
const storageKey = "appai-cart-v1";
const changeEvent = "appai-cart-change";
let memoryCart = "[]";

function getSnapshot() {
  try { return window.localStorage.getItem(storageKey) ?? memoryCart; }
  catch { return memoryCart; }
}

export function parseCart(value: string): CartEntry[] {
  try {
    const entries: unknown = JSON.parse(value);
    if (!Array.isArray(entries)) return [];
    const result = new Map<string, number>();
    for (const entry of entries) {
      if (!entry || typeof entry.slug !== "string" || !products.some((product) => product.slug === entry.slug) || !Number.isInteger(entry.quantity) || entry.quantity < 1) continue;
      result.set(entry.slug, Math.min(99, (result.get(entry.slug) ?? 0) + entry.quantity));
    }
    return Array.from(result, ([slug, quantity]) => ({ slug, quantity }));
  } catch { return []; }
}

function save(entries: CartEntry[]) {
  memoryCart = JSON.stringify(entries);
  try { window.localStorage.setItem(storageKey, memoryCart); } catch { /* Keep cart available in memory when storage is unavailable. */ }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      memoryCart = event.newValue ?? "[]";
      callback();
    }
  };
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const items = parseCart(snapshot).map((entry) => ({ product: products.find((product) => product.slug === entry.slug)!, quantity: entry.quantity }));
  return {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addItem(slug: string, quantity = 1) {
      if (!products.some((product) => product.slug === slug) || !Number.isInteger(quantity) || quantity < 1) return;
      const entries = parseCart(getSnapshot());
      const existing = entries.find((entry) => entry.slug === slug);
      if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
      else entries.push({ slug, quantity: Math.min(99, quantity) });
      save(entries);
    },
    setQuantity(slug: string, quantity: number) {
      if (!Number.isInteger(quantity)) return;
      save(parseCart(getSnapshot()).map((entry) => entry.slug === slug ? { ...entry, quantity: Math.min(99, Math.max(1, quantity)) } : entry));
    },
    moveToCart(slug: string) {
      if (!products.some((product) => product.slug === slug)) return;
      const entries = parseCart(getSnapshot());
      const existing = entries.find((entry) => entry.slug === slug);
      if (existing) {
        existing.quantity = 1;
      } else {
        entries.push({ slug, quantity: 1 });
      }
      save(entries);
    },
    removeItem(slug: string) { save(parseCart(getSnapshot()).filter((entry) => entry.slug !== slug)); },
  };
}

export function deliveryCharge(subtotal: number) { return subtotal === 0 || subtotal > 499 ? 0 : 40; }
export function formatPrice(value: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value); }
