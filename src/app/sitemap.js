import { fetchFullCatalog, fetchDistrictsServer, fetchCategoriesServer } from "@/lib/data-fetcher-server";
import { evaluateSeoQualityScore } from "@/lib/constants";

export const revalidate = 86400; // Revalidate sitemap daily

export default async function sitemap() {
  const baseUrl = "https://globalbiomedical.co.in";
  const urls = [];

  // Static High-Authority Pages
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/services`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/items`, priority: 0.9, changeFrequency: "daily" },
  ];

  staticPages.forEach((page) => {
    urls.push({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  try {
    // 1. PRODUCTS (Primary Canonical Pages)
    const products = await fetchFullCatalog();
    const seenProductSlugs = new Set();

    products.forEach((product) => {
      const slug = product.slug;
      if (!slug || seenProductSlugs.has(slug)) return;
      seenProductSlugs.add(slug);

      const quality = evaluateSeoQualityScore({
        title: product.title,
        description: product.desc || product.description,
        content: product.desc || product.title,
        slug: slug,
        hasProducts: true,
      });

      if (quality.shouldIncludeInSitemap) {
        urls.push({
          url: `${baseUrl}/items/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        });
      }
    });

    // 2. CATEGORY HUBS
    const categories = await fetchCategoriesServer();
    categories.forEach((cat) => {
      if (!cat.slug) return;
      urls.push({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });

    // 3. DISTRICT LOCATION HUBS (Primary Location URLs only)
    const districts = await fetchDistrictsServer();
    districts.forEach((district) => {
      const slug = district.slug;
      if (!slug) return;

      // Only include main district hub to ensure high quality signals
      urls.push({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return urls;
}