import Shop from "@/app/components/shop";
import ShopProducts from "@/app/components/shopProducts";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ee]">
      <Shop />
      <ShopProducts />
    </main>
  );
}
