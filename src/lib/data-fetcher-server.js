import {
  fetchFullCatalog as fetchFullCatalogRaw,
  fetchDistrictsRaw,
  fetchCategoriesRaw,
  makeSlug,
} from "./data-fetcher";

/**
 * Fetch the full live product catalog for server rendering without long-lived stale caching.
 */
export async function fetchFullCatalog() {
  return await fetchFullCatalogRaw();
}

/**
 * Fetch all location districts for server rendering.
 */
export async function fetchDistrictsServer() {
  return await fetchDistrictsRaw();
}

/**
 * Fetch all categories derived from the live Master Catalog for server rendering.
 */
export async function fetchCategoriesServer() {
  const catalog = await fetchFullCatalog();
  const catMap = new Map();

  catalog.forEach((p) => {
    if (p.category) {
      const slug = makeSlug(p.category);
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
}

/**
 * Fetch a single product by slug from the live Master Catalog.
 * Returns only live product data without hardcoded static specs fallbacks.
 */
export async function fetchProductBySlugServer(slug) {
  const catalog = await fetchFullCatalog();
  const cleanSlug = makeSlug(slug);

  const found = catalog.find(
    (p) =>
      p.slug === slug ||
      makeSlug(p.slug) === cleanSlug ||
      makeSlug(p.title) === cleanSlug
  );
  if (found) return found;

  return null;
}
