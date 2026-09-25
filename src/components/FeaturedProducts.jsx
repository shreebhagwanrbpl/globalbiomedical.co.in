"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { fetchFullCatalog } from "@/lib/data-fetcher";

export default function FeaturedProducts({ city }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const catalog = await fetchFullCatalog();
        if (Array.isArray(catalog)) {
          setProducts(catalog.slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[130px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 mb-3">
              <Sparkles size={14} />
              <span>Diagnostic Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-amber-400">Biomedical Equipment</span>
              {city && <span className="text-slate-400 font-normal"> in {city}</span>}
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl leading-relaxed">
              Explore our certified range of clinical blood analyzers, biochemistry instruments, and hospital diagnostic systems.
            </p>
          </div>

          <Link
            href={districtSlug ? `/${districtSlug}/items` : "/items"}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-black border border-slate-700 font-bold text-sm transition duration-300 text-white flex-shrink-0"
          >
            <span>Browse Full Catalog</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="space-y-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-800/80 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.slug || product.uid} product={product} district={districtSlug} />
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              No products found in catalog.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
