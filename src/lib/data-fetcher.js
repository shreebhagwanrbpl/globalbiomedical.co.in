import {
  normalizeSiteId,
  getCompanyAndWebsite,
  makeSlug,
  fetchCatalogFromAdmin,
  fetchSiteDataFromAdmin,
} from "./admin-api";

export { normalizeSiteId, getCompanyAndWebsite, makeSlug };

/**
 * Bulletproof Visibility & Instant Hide Logic:
 * - item.isPublished === false -> Hide (false)
 * - item.websiteIds is [] (0 websites selected) -> Hide (false)
 * - item.websiteIds.includes("all") -> Show (true)
 * - Normalized website ID match -> Show (true)
 */
export function isItemVisibleOnWebsite(item, currentWebsiteClean = null) {
  if (!item) return false;
  if (
    item.isPublished === false ||
    item.status === "inactive" ||
    item.status === "disabled"
  ) {
    return false;
  }

  const targetSite = currentWebsiteClean || getCompanyAndWebsite().siteId;
  const rawWebsites = item.websiteIds;

  // If websiteIds is explicitly missing, fallback to true
  if (rawWebsites === undefined || rawWebsites === null) {
    return true;
  }

  if (Array.isArray(rawWebsites)) {
    // STRICT: Empty array [] means 0 websites selected -> HIDDEN!
    if (rawWebsites.length === 0) return false;
    if (rawWebsites.includes("all")) return true;

    return rawWebsites.some((site) => normalizeSiteId(site) === targetSite);
  }

  if (rawWebsites === "all") return true;
  if (typeof rawWebsites === "string") {
    if (rawWebsites === "all") return true;
    return normalizeSiteId(rawWebsites) === targetSite;
  }

  return false;
}

/**
 * Fetch a page or district document from the Admin Panel API backed by MongoDB.
 */
export async function fetchDocCached(path) {
  try {
    const { siteId, companyId } = getCompanyAndWebsite();
    const cleanPath = String(path || "").toLowerCase();

    let type = "all";
    let district = "";

    if (cleanPath.includes("pages/home")) {
      type = "home";
    } else if (cleanPath.includes("pages/contact")) {
      type = "contact";
    } else if (cleanPath.includes("pages/services")) {
      type = "services";
    } else if (cleanPath.includes("districts/")) {
      type = "district";
      const parts = cleanPath.split("districts/");
      district = parts[1] || "";
    } else if (cleanPath.includes("districts")) {
      type = "districts";
    }

    const data = await fetchSiteDataFromAdmin({
      websiteId: siteId,
      companyId,
      type,
      district,
    });

    return data;
  } catch (err) {
    console.error(`Error fetching cached doc at ${path}:`, err);
    return null;
  }
}

/**
 * Fetch the full live catalog from the Admin Panel MongoDB API.
 *
 * Enforces strict cascading visibility and uniform data formatting.
 */
export async function fetchFullCatalog() {
  const startTime = performance.now();
  const { companyId, siteId } = getCompanyAndWebsite();

  try {
    const rawCatalog = await fetchCatalogFromAdmin({
      websiteId: siteId,
      companyId,
    });

    const allProducts = [];

    if (Array.isArray(rawCatalog)) {
      rawCatalog.forEach((item, index) => {
        if (!isItemVisibleOnWebsite(item, siteId)) {
          return;
        }

        const title = item.title || item.name || "Biomedical Equipment";
        const prodSlug = item.slug || makeSlug(title);
        const rawImgs = Array.isArray(item.images)
          ? item.images
          : item.image
          ? [item.image]
          : item.imageUrl
          ? [item.imageUrl]
          : item.imgUrl
          ? [item.imgUrl]
          : [];

        allProducts.push({
          ...item,
          id: item.id || item.uid || `${prodSlug}-${index}`,
          uid: item.uid || item.id || `${prodSlug}-${index}`,
          title,
          name: title,
          slug: prodSlug,
          category: item.category || "Diagnostic & Laboratory Equipment",
          subCategory: item.subCategory || item.category || "General",
          categoryId: item.categoryId || makeSlug(item.category || "diagnostic"),
          subcategoryId:
            item.subcategoryId || makeSlug(item.subCategory || "general"),
          images: rawImgs.length > 0 ? rawImgs : ["/hdc_lyte_analyzer.svg"],
          image: rawImgs[0] || "/hdc_lyte_analyzer.svg",
          brand: item.brand || "Global Biomedical",
          model: item.model || "HD Series",
          instrument: item.instrument || "Medical Analyzer",
          automation: item.automation || "Fully Automatic",
          capacity: item.capacity || "Standard Capacity",
          throughput: item.throughput || "High Throughput Performance",
          usage: item.usage || "Hospital & Pathology Laboratory Diagnostics",
          availability: item.availability || "In Stock - Fast Pan-India Dispatch",
          desc:
            item.desc ||
            item.description ||
            `${title} is a high-performance diagnostic analyzer engineered for clinical accuracy, maximum operational reliability, and workflow efficiency in medical laboratories and hospital wards.`,
        });
      });
    }

    const duration = performance.now() - startTime;
    console.log(
      `[data-fetcher] Admin MongoDB API catalog fetch completed: ${allProducts.length} items visible for ${siteId} (${companyId}) in ${duration.toFixed(2)}ms`
    );

    return allProducts;
  } catch (err) {
    console.error("Error fetching Admin MongoDB catalog:", err);
    return [];
  }
}

/**
 * Fetch raw categories for the current website based on visible Master Catalog categories.
 */
export async function fetchCategoriesRaw() {
  const catalog = await fetchFullCatalog();
  const catMap = new Map();

  catalog.forEach((p) => {
    if (p.category) {
      const slug = makeSlug(p.category);
      if (!catMap.has(slug)) {
        catMap.set(slug, {
          id: p.categoryId || slug,
          name: p.category,
          category: p.category,
          slug,
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
 * Helpers for cached document retrieval across pages
 */
export async function fetchHomeData() {
  const { siteId } = getCompanyAndWebsite();
  return fetchDocCached(`websites/${siteId}/pages/home`);
}

export async function fetchContactData() {
  const { siteId } = getCompanyAndWebsite();
  return fetchDocCached(`websites/${siteId}/pages/contact`);
}

export async function fetchServicesData() {
  const { siteId } = getCompanyAndWebsite();
  return fetchDocCached(`websites/${siteId}/pages/services`);
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  const { siteId } = getCompanyAndWebsite();
  return fetchDocCached(`websites/${siteId}/districts/${district}`);
}

export async function fetchDistrictsRaw() {
  const { siteId, companyId } = getCompanyAndWebsite();
  try {
    const data = await fetchSiteDataFromAdmin({
      websiteId: siteId,
      companyId,
      type: "districts",
    });

    if (Array.isArray(data)) {
      return data.map((d, idx) => ({
        id: d.id || d.slug || `dist-${idx}`,
        ...d,
        slug: d.slug || d.id || makeSlug(d.district || d.name || `dist-${idx}`),
      }));
    }

    if (data?.districts && Array.isArray(data.districts)) {
      return data.districts.map((d, idx) => ({
        id: d.id || d.slug || `dist-${idx}`,
        ...d,
        slug: d.slug || d.id || makeSlug(d.district || d.name || `dist-${idx}`),
      }));
    }

    return [];
  } catch (err) {
    console.error("Error fetching districts from Admin MongoDB API:", err);
    return [];
  }
}
