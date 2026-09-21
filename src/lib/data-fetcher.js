import { db } from "./firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { SITE_CONFIG } from "./constants";

/**
 * Normalizes a website identifier or domain by stripping dots, hyphens, and whitespace.
 * e.g., "globalbiomedical.co.in" -> "globalbiomedicalcoin"
 *       "globalbiomedicals.net"  -> "globalbiomedicalsnet"
 *       "humanbiomedical.com"    -> "humanbiomedicalcom"
 */
export function normalizeSiteId(siteIdOrDomain = "") {
  return String(siteIdOrDomain)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Detects the Company ID and normalized Website ID for the current repository.
 */
export function getCompanyAndWebsite() {
  const domain = SITE_CONFIG?.domain || "globalbiomedical.co.in";
  const siteId = normalizeSiteId(domain);

  let companyId = "global";
  if (siteId.includes("human")) {
    companyId = "human";
  } else if (siteId.includes("global")) {
    companyId = "global";
  } else if (siteId.includes("rajbiosis") || siteId.includes("indian") || siteId.includes("humari")) {
    companyId = "rajbiosis";
  }

  return { companyId, siteId, domain };
}

export const makeSlug = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Bulletproof Visibility & Instant Hide Logic:
 * - item.isPublished === false -> Hide (false)
 * - item.websiteIds is [] (0 websites selected) -> Hide (false)
 * - item.websiteIds.includes("all") -> Show (true)
 * - Normalized website ID match -> Show (true)
 */
export function isItemVisibleOnWebsite(item, currentWebsiteClean = null) {
  if (!item) return false;
  if (item.isPublished === false || item.status === "inactive" || item.status === "disabled") {
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
 * Fetch a single document directly from Firestore (no stale client lock).
 */
export async function fetchDocCached(path) {
  try {
    const parts = path.split("/").filter(Boolean);
    const docRef = doc(db, ...parts);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.error(`Error fetching doc at ${path}:`, err);
    return null;
  }
}

/**
 * Fetch the full live catalog from the SuperAdmin Master Catalog path:
 * companies/{companyId}/categories/{categoryId}/subcategories/{subcategoryId}
 *
 * Enforces strict 3-tier cascading visibility:
 * 1. Category Visibility: If Category is hidden, skip all its subcategories & products immediately.
 * 2. Subcategory Visibility: If Subcategory is hidden, skip all its products immediately.
 * 3. Product Visibility: If Product is hidden or not assigned to this site, skip it.
 */
export async function fetchFullCatalog() {
  const startTime = performance.now();
  const { companyId, siteId } = getCompanyAndWebsite();
  const allProducts = [];

  try {
    // 1. Read Master Categories for this Company
    const catCollRef = collection(db, "companies", companyId, "categories");
    const catSnap = await getDocs(catCollRef);

    if (!catSnap.empty) {
      // Process all master categories in parallel
      await Promise.all(
        catSnap.docs.map(async (categoryDoc) => {
          const catData = categoryDoc.data();
          const catId = categoryDoc.id;
          const categoryName = catData.name || catData.category || catId;

          // Tier 1: Category-level visibility check
          if (!isItemVisibleOnWebsite(catData, siteId)) {
            return; // Category is hidden -> All nested contents are hidden!
          }

          try {
            // Read Master Subcategories under this Category
            const subCollRef = collection(
              db,
              "companies",
              companyId,
              "categories",
              catId,
              "subcategories"
            );
            const subSnap = await getDocs(subCollRef);

            subSnap.docs.forEach((subDoc) => {
              const subData = subDoc.data();
              const subId = subDoc.id;
              const subCategoryName = subData.name || subData.subCategory || subId;

              // Tier 2: Subcategory-level visibility check
              if (!isItemVisibleOnWebsite(subData, siteId)) {
                return; // Subcategory is hidden -> All its products are hidden!
              }

              // Tier 3: Product-level visibility check
              const subProducts = Array.isArray(subData.products) ? subData.products : [];
              subProducts.forEach((item, index) => {
                if (!isItemVisibleOnWebsite(item, siteId)) {
                  return; // Product is hidden
                }

                const title = item.title || item.name || "Biomedical Equipment";
                const prodSlug = item.slug || makeSlug(title);
                const rawImgs = Array.isArray(item.images)
                  ? item.images
                  : item.image
                  ? [item.image]
                  : [];

                allProducts.push({
                  ...item,
                  id: item.id || `${catId}-${subId}-${index}`,
                  uid: item.id || `${catId}-${subId}-${index}`,
                  title,
                  name: title,
                  slug: prodSlug,
                  category: categoryName,
                  subCategory: subCategoryName,
                  categoryId: catId,
                  subcategoryId: subId,
                  images: rawImgs,
                  image: rawImgs[0] || "",
                });
              });
            });
          } catch (subErr) {
            console.error(`Error fetching subcategories for category ${catId}:`, subErr);
          }
        })
      );
    }

    // 2. Read Standalone Normal Products under companies/{companyId}/products (if any)
    try {
      const prodsCollRef = collection(db, "companies", companyId, "products");
      const prodsSnap = await getDocs(prodsCollRef);

      if (!prodsSnap.empty) {
        prodsSnap.docs.forEach((docSnap) => {
          const item = docSnap.data();
          if (item.type === "category" || item.categoryId || item.subcategoryId) {
            return; // Skip category products already handled above
          }

          if (isItemVisibleOnWebsite(item, siteId)) {
            const title = item.title || item.name || "Biomedical Equipment";
            const prodSlug = item.slug || makeSlug(title);
            const rawImgs = Array.isArray(item.images)
              ? item.images
              : item.image
              ? [item.image]
              : [];

            allProducts.push({
              ...item,
              id: docSnap.id,
              uid: docSnap.id,
              title,
              name: title,
              slug: prodSlug,
              category: item.category || "General Equipment",
              subCategory: item.subCategory || item.category || "General",
              images: rawImgs,
              image: rawImgs[0] || "",
            });
          }
        });
      }
    } catch (normErr) {
      console.warn("Error fetching standalone products:", normErr);
    }

    // 3. Fallback to Legacy Website Path if Master Catalog is empty
    if (allProducts.length === 0) {
      try {
        const legacyCatSnap = await getDocs(
          collection(db, "websites", siteId, "pages", "categoryproducts", "categories")
        );

        if (!legacyCatSnap.empty) {
          await Promise.all(
            legacyCatSnap.docs.map(async (categoryDoc) => {
              const data = categoryDoc.data();
              const categoryName = data.category || data.name || categoryDoc.id;

              if (!isItemVisibleOnWebsite(data, siteId)) return;

              try {
                const subSnap = await getDocs(
                  collection(
                    db,
                    "websites",
                    siteId,
                    "pages",
                    "categoryproducts",
                    "categories",
                    categoryDoc.id,
                    "subcategories"
                  )
                );

                subSnap.forEach((subDoc) => {
                  const subData = subDoc.data();
                  const subCategoryName = subData.subCategory || subData.name || subDoc.id;

                  if (!isItemVisibleOnWebsite(subData, siteId)) return;

                  const categoryProducts = (subData.products || [])
                    .filter((p) => isItemVisibleOnWebsite(p, siteId))
                    .map((item, index) => ({
                      ...item,
                      uid: `${categoryDoc.id}-${subDoc.id}-${index}`,
                      category: categoryName,
                      subCategory: subCategoryName,
                      slug: item.slug || makeSlug(item.title),
                    }));

                  allProducts.push(...categoryProducts);
                });
              } catch (e) {}

              // Direct products fallback
              if (data.products?.length) {
                const directProducts = data.products
                  .filter((p) => isItemVisibleOnWebsite(p, siteId))
                  .map((item, index) => ({
                    ...item,
                    uid: `${categoryDoc.id}-direct-${index}`,
                    category: categoryName,
                    subCategory: item.subCategory || categoryName,
                    slug: item.slug || makeSlug(item.title),
                  }));
                allProducts.push(...directProducts);
              }
            })
          );
        }
      } catch (legacyErr) {
        console.warn("Legacy fallback fetch note:", legacyErr);
      }
    }

    const duration = performance.now() - startTime;
    console.log(
      `[data-fetcher] Master Catalog live fetch completed: ${allProducts.length} items visible for ${siteId} (${companyId}) in ${duration.toFixed(2)}ms`
    );

    return allProducts;
  } catch (err) {
    console.error("Error fetching Master Catalog full catalog:", err);
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
  const { siteId } = getCompanyAndWebsite();
  try {
    const snap = await getDocs(collection(db, "websites", siteId, "districts"));
    return snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      slug: docSnap.data().slug || docSnap.id,
    }));
  } catch (err) {
    console.error("Error fetching districts raw:", err);
    return [];
  }
}
