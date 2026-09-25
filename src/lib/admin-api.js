import { SITE_CONFIG } from "./constants";

export const ADMIN_API_BASE_URL =
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  process.env.SQLITE_ADMIN_API_URL ||
  "https://admin.rajbiosis.app";

/**
 * Normalizes a website identifier or domain by stripping dots, hyphens, and whitespace.
 * e.g., "globalbiomedical.co.in" -> "globalbiomedicalcoin"
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
  } else if (
    siteId.includes("rajbiosis") ||
    siteId.includes("indian") ||
    siteId.includes("humari")
  ) {
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
 * Fetch catalog products from SQLite Admin API backend.
 * Automatically uses internal Next.js /api/catalog proxy in client browser
 * to prevent CORS/browser network issues.
 */
export async function fetchCatalogFromAdmin({ websiteId, companyId } = {}) {
  const { siteId: defaultSiteId, companyId: defaultCompanyId } =
    getCompanyAndWebsite();
  const targetSiteId = websiteId || defaultSiteId;
  const targetCompanyId = companyId || defaultCompanyId;

  // Browser (Client-side): Use local API route to avoid CORS errors
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/catalog", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.success && Array.isArray(json?.products)) {
          return json.products;
        }
        if (Array.isArray(json?.products)) {
          return json.products;
        }
        if (Array.isArray(json)) {
          return json;
        }
      }
    } catch (clientErr) {
      console.warn("[admin-api] Browser fetch /api/catalog note:", clientErr);
    }
    return [];
  }

  // Server-side: Fetch directly from SQLite Admin API backend
  const url = `${ADMIN_API_BASE_URL}/api/catalog?websiteId=${encodeURIComponent(
    targetSiteId
  )}&companyId=${encodeURIComponent(targetCompanyId)}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(
        `[admin-api] Catalog fetch returned status ${res.status} from ${url}`
      );
      return [];
    }

    const data = await res.json();
    if (data?.success && Array.isArray(data?.products)) {
      return data.products;
    }
    if (data?.success && Array.isArray(data?.data)) {
      return data.data;
    }
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error(`[admin-api] Error fetching catalog from ${url}:`, error.message);
    return [];
  }
}

/**
 * Fetch site page / config data from SQLite Admin API backend.
 * Automatically uses internal Next.js /api/site-data proxy in client browser.
 */
export async function fetchSiteDataFromAdmin({
  websiteId,
  companyId,
  type = "all",
  district = "",
} = {}) {
  const { siteId: defaultSiteId, companyId: defaultCompanyId } =
    getCompanyAndWebsite();
  const targetSiteId = websiteId || defaultSiteId;
  const targetCompanyId = companyId || defaultCompanyId;

  // Browser (Client-side): Use local API route to avoid CORS errors
  if (typeof window !== "undefined") {
    try {
      let proxyUrl = `/api/site-data?type=${encodeURIComponent(type)}`;
      if (district) {
        proxyUrl += `&district=${encodeURIComponent(district)}`;
      }
      const res = await fetch(proxyUrl, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.success) {
          return json.data !== undefined ? json.data : json;
        }
      }
    } catch (clientErr) {
      console.warn("[admin-api] Browser fetch /api/site-data note:", clientErr);
    }
    return null;
  }

  // Server-side: Fetch directly from SQLite Admin API backend
  let url = `${ADMIN_API_BASE_URL}/api/site-data?websiteId=${encodeURIComponent(
    targetSiteId
  )}&companyId=${encodeURIComponent(targetCompanyId)}&type=${encodeURIComponent(
    type
  )}`;

  if (district) {
    url += `&district=${encodeURIComponent(district)}`;
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json?.success) {
      return json.data !== undefined ? json.data : json;
    }
    return null;
  } catch (error) {
    console.error(`[admin-api] Error fetching site-data from ${url}:`, error.message);
    return null;
  }
}

/**
 * Submit contact query to SQLite Admin API backend.
 */
export async function sendContactQuery(payload = {}) {
  const { siteId, companyId } = getCompanyAndWebsite();
  const fullPayload = {
    websiteId: payload.websiteId || siteId,
    companyId: payload.companyId || companyId,
    type: "contact",
    ...payload,
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  const url = `${ADMIN_API_BASE_URL}/api/contact-query`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fullPayload),
    });

    if (!res.ok) {
      console.warn(
        `[admin-api] Contact query forward status ${res.status} from ${url}`
      );
    }
    return { success: true };
  } catch (error) {
    console.error(`[admin-api] Error posting contact query to ${url}:`, error.message);
    return { success: true };
  }
}

/**
 * Submit product query to SQLite Admin API backend.
 */
export async function sendProductQuery(payload = {}) {
  const { siteId, companyId } = getCompanyAndWebsite();
  const fullPayload = {
    websiteId: payload.websiteId || siteId,
    companyId: payload.companyId || companyId,
    type: "product",
    ...payload,
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  const url = `${ADMIN_API_BASE_URL}/api/product-query`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fullPayload),
    });

    if (!res.ok) {
      console.warn(
        `[admin-api] Product query forward status ${res.status} from ${url}`
      );
    }
    return { success: true };
  } catch (error) {
    console.error(`[admin-api] Error posting product query to ${url}:`, error.message);
    return { success: true };
  }
}
