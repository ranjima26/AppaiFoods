import { notFound } from "next/navigation";
import PageOverview from "@/app/components/pageOverview";
import { products } from "@/app/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <PageOverview key={product.slug} product={product} />;
}
