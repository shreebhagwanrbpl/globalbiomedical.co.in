import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "../items/ProductsClient";

export const revalidate = 3600;

export const metadata = {
  title: "Biomedical & Diagnostic Equipment Catalog | Global Biomedical",
  description:
    "Explore our complete catalog of hematology analyzers, biochemistry instruments, electrolyte analyzers, and pathology diagnostic equipment.",
  alternates: {
    canonical: "https://globalbiomedical.co.in/items",
  },
};

export default async function ProductsPage() {
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
    />
  );
}