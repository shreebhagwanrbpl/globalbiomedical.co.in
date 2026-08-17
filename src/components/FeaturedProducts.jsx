"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Download, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { fetchFullCatalog } from "@/lib/data-fetcher";

const sampleFeatured = [
  {
    title: "HD Consortium Automatic Abbott Blood Analyzer",
    slug: "hd-consortium-automatic-abbott-blood-analyzer-hdc-lyte-plus",
    brand: "HD Consortium",
    model: "HDC-LYTE PLUS",
    category: "Hematology & Blood Analyzers",
    description: "Fully automatic blood analyzer providing rapid, high-precision electrolyte and cell count diagnostics for hospitals and clinical laboratories.",
    instrument: "Electrolyte Blood Analyzer",
    automation: "Fully Automatic",
    images: ["/hdc_lyte_analyzer.svg"],
  },
  {
    title: "Fully Automatic Biochemistry Analyzer",
    slug: "fully-automatic-biochemistry-analyzer-model-bm-300",
    brand: "Global Biomedical",
    model: "BM-300 High Speed",
    category: "Biochemistry Analyzers",
    description: "Advanced biochemistry testing system with 300 tests/hour throughput, automated reagent cooling, and audit-ready precision.",
    instrument: "Biochemistry Analyzer",
    automation: "Fully Automatic",
    images: ["/biochemistry_analyzer.svg"],
  },
  {
    title: "Compact 3-Part Differential Hematology Analyzer",
    slug: "compact-3-part-differential-hematology-analyzer",
    brand: "Global Biomedical",
    model: "HemaCount 3000",
    category: "Hematology & Blood Analyzers",
    description: "Compact 60 samples/hour 3-part WBC differential hematology analyzer engineered for pathology labs and diagnostic centres.",
    instrument: "Hematology Counter",
    automation: "Semi-Automatic",
    images: ["/hdc_lyte_analyzer.svg"],
  },
  {
    title: "Automated Microplate ELISA Reader & Washer",
    slug: "automated-microplate-elisa-reader-washer",
    brand: "BioLab Pro",
    model: "ELISA-96V",
    category: "Diagnostic Equipment",
    description: "High-precision 96-well microplate reader with dual wavelength optics and automated plate washing for serology and immunology tests.",
    instrument: "ELISA Spectrophotometer",
    automation: "Fully Automatic",
    images: ["/biochemistry_analyzer.svg"],
  },
];

export default function FeaturedProducts({ city }) {
  const [products, setProducts] = useState(sampleFeatured);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const catalog = await fetchFullCatalog();
        if (catalog && catalog.length > 0) {
          // Take top 4 or published items
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
          ) : (
            products.map((product) => (
              <ProductCard key={product.slug || product.uid} product={product} district={districtSlug} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
