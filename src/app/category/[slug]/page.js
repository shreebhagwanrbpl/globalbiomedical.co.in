import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import { fetchCategoriesServer, fetchFullCatalog } from "@/lib/data-fetcher-server";
import { Award, CheckCircle2, HelpCircle } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await fetchCategoriesServer();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await fetchCategoriesServer();
  const cat = categories.find((c) => c.slug === slug);

  const categoryName = cat?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const title = `${categoryName} Supplier & Dealer in India | Global Biomedical`;
  const description = `Buy ${categoryName} equipment and diagnostic analyzers at best price in India. Top supplier and service provider for hospitals, pathology labs, and medical diagnostic centers.`;
  const url = `https://globalbiomedical.co.in/category/${slug}`;

  return {
    title,
    description,
    keywords: [
      categoryName,
      `${categoryName} Supplier`,
      `${categoryName} Dealer`,
      `${categoryName} Price in India`,
      `${categoryName} Distributor`,
      "Medical Laboratory Equipment",
      "Biomedical Diagnostic Analyzers",
      "Global Biomedical",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Global Biomedical",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await fetchCategoriesServer();
  const allProducts = await fetchFullCatalog();

  const categoryItem = categories.find((c) => c.slug === slug);
  const categoryName = categoryItem?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Filter products for this category
  const categoryProducts = allProducts.filter((p) => {
    if (!p.category) return false;
    const pCatSlug = p.category.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    return pCatSlug === slug || p.category.toLowerCase().includes(categoryName.toLowerCase());
  });

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Equipment & Analyzers`,
    description: `Leading supplier of ${categoryName} for hospitals and clinical laboratories across India.`,
    url: `https://globalbiomedical.co.in/category/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Global Biomedical Inc.",
      logo: "https://globalbiomedical.co.in/logo.png",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://globalbiomedical.co.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://globalbiomedical.co.in/items",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `https://globalbiomedical.co.in/category/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageBanner
        title={`${categoryName} Equipment`}
        subtitle={`Discover high-precision ${categoryName} diagnostic instruments, analyzers, and reagents designed for pathology centers and hospital laboratories.`}
      />

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          {/* Breadcrumb Nav */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-amber-600 transition">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/items" className="hover:text-amber-600 transition">Products</Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-slate-800">{categoryName}</li>
            </ol>
          </nav>

          {/* Overview & Authority Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-800">
                  <Award size={14} /> Category Authority
                </span>
                <h2 className="text-3xl font-bold text-slate-900">
                  Professional {categoryName} Solutions
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Global Biomedical supplies ISO-compliant {categoryName.toLowerCase()} instruments engineered for clinical accuracy, robust throughput, and long-term diagnostic reliability. Our team provides complete installation support, calibration, preventive maintenance, and genuine replacement parts.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-amber-500" /> High-Accuracy Results
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-amber-500" /> On-Site Technical Calibration
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-amber-500" /> Certified Quality Guarantee
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-amber-500" /> Rapid Dispatch Across India
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-amber-400">Need Guidance?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unsure which {categoryName.toLowerCase()} model fits your daily sample volume? Speak directly with our biomedical application specialist.
                </p>
                <a
                  href="tel:+919257984336"
                  className="block w-full text-center py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition text-sm shadow-md"
                >
                  Call +91 9257984336
                </a>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <SectionTitle
            badge="Category Products"
            title={`Available ${categoryName} Products (${categoryProducts.length})`}
            description={`Browse verified ${categoryName.toLowerCase()} systems available for immediate delivery.`}
            center
          />

          {categoryProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {categoryProducts.map((product) => (
                <ProductCard key={product.uid || product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 mt-12">
              <p className="text-slate-500 text-lg">
                No specific products listed directly under this category tag yet.
              </p>
              <Link
                href="/items"
                className="inline-block mt-4 px-6 py-2.5 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition text-sm"
              >
                View Full Catalog
              </Link>
            </div>
          )}

          {/* Category FAQ */}
          <div className="mt-24">
            <SectionTitle
              badge="FAQ"
              title={`Frequently Asked Questions about ${categoryName}`}
              description="Common queries from clinical directors, lab managers, and hospital administrators."
              center
            />

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <HelpCircle size={20} className="text-amber-500" />
                  What is {categoryName} used for in medical laboratories?
                </h4>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {categoryName} equipment is utilized in pathology centers and hospital wards to perform automated patient sample analysis, delivering essential diagnostic data for physician decision-making.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <HelpCircle size={20} className="text-amber-500" />
                  Does Global Biomedical provide installation support?
                </h4>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Yes. Our certified biomedical engineers provide full physical setup, electrical calibration, reagent initialization, and operational training for lab technicians across India.
                </p>
              </div>
            </div>
          </div>

          {/* Other Categories Internal Links */}
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Explore Related Equipment Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                    c.slug === slug
                      ? "bg-amber-500 border-amber-500 text-black shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  {c.name} ({c.productCount})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
