"use client";

import { useSyncExternalStore } from "react";
import { products } from "@/app/data/products";

const storageKey = "appai-wishlist-v1";
const changeEvent = "appai-wishlist-change";
let memory = "[]";
let storageFailed = false;

export function parseWishlist(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((slug): slug is string => typeof slug === "string" && products.some((product) => product.slug === slug)))];
  } catch { return []; }
}

function getSnapshot() {
  if (storageFailed) return memory;
  try { return window.localStorage.getItem(storageKey) ?? "[]"; }
  catch { return memory; }
}

function save(slugs: string[]) {
  memory = JSON.stringify(slugs);
  try { window.localStorage.setItem(storageKey, memory); storageFailed = false; }
  catch { storageFailed = true; }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      memory = event.newValue ?? "[]";
      storageFailed = false;
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

export function useWishlist() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const slugs = parseWishlist(snapshot);
  return {
    items: slugs.map((slug) => products.find((product) => product.slug === slug)!),
    count: slugs.length,
    hasItem: (slug: string) => slugs.includes(slug),
    toggleItem(slug: string) {
      if (!products.some((product) => product.slug === slug)) return;
      const current = parseWishlist(getSnapshot());
      save(current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
    },
    removeItem(slug: string) { save(parseWishlist(getSnapshot()).filter((item) => item !== slug)); },
  };
}
