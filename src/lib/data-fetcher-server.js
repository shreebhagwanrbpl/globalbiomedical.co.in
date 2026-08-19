import { fetchFullCatalog as fetchFullCatalogRaw, fetchDistrictsRaw, fetchCategoriesRaw } from "./data-fetcher";
import { cache } from "react";

// Global in-memory cache for the server process
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
let cachedDistricts = null;
let cachedDistrictsTimestamp = 0;

const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    return cachedCatalog;
  }
  const data = await fetchFullCatalogRaw();
  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

async function getCachedDistricts() {
  const now = Date.now();
  if (cachedDistricts && (now - cachedDistrictsTimestamp) < CACHE_TTL) {
    return cachedDistricts;
  }
  const data = await fetchDistrictsRaw();
  cachedDistricts = data;
  cachedDistrictsTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  return await getCachedCatalog();
});

export const fetchDistrictsServer = cache(async () => {
  return await getCachedDistricts();
});

export const fetchCategoriesServer = cache(async () => {
  const catalog = await fetchFullCatalog();
  const catMap = new Map();
  
  catalog.forEach((p) => {
    if (p.category) {
      const slug = p.category.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
      if (!catMap.has(slug)) {
        catMap.set(slug, {
          name: p.category,
          slug: slug,
          productCount: 1,
          sampleProduct: p,
        });
      } else {
        catMap.get(slug).productCount += 1;
      }
    }
  });

  return Array.from(catMap.values());
});

export const fetchProductBySlugServer = cache(async (slug) => {
  const catalog = await fetchFullCatalog();
  const makeSlug = (text = "") =>
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  const found = catalog.find((p) => p.slug === slug || makeSlug(p.title) === slug);
  if (found) return found;

  const formattedTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Biomedical Equipment";

  return {
    title: formattedTitle,
    slug: slug,
    brand: "Global Biomedical",
    model: "HD Series",
    category: "Diagnostic & Laboratory Equipment",
    instrument: "Medical Analyzer",
    automation: "Fully Automatic",
    capacity: "Standard Capacity",
    throughput: "High Throughput Performance",
    usage: "Hospital & Pathology Laboratory Diagnostics",
    availability: "In Stock - Fast Pan-India Dispatch",
    desc: `${formattedTitle} is a high-performance diagnostic analyzer engineered for clinical accuracy, maximum operational reliability, and workflow efficiency in medical laboratories and hospital wards.`,
    images: ["/hdc_lyte_analyzer.svg"],
  };
});

