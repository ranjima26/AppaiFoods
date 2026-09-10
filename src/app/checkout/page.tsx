import Checkout from "@/app/components/checkout";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f7f6ef] px-5 pt-28 text-[#003820]" role="status">Loading checkout...</main>}>
      <Checkout />
    </Suspense>
  );
}
