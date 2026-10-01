import { SITE_CONFIG } from "./constants";

const DEFAULT_ADMIN_API_URL = "https://admin.rajbiosis.app";

export const ADMIN_API_BASE_URL = (
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  DEFAULT_ADMIN_API_URL
).replace(/\/$/, "");

/** Normalize a domain or website identifier to the Admin Panel's website ID. */
export function normalizeSiteId(siteIdOrDomain = "") {
  return String(siteIdOrDomain || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

export function getCompanyAndWebsite() {
  const domain = SITE_CONFIG?.domain || "globalbiomedical.co.in";
  const siteId = normalizeSiteId(domain);
  let companyId = "global";

  if (siteId.includes("human")) companyId = "human";
  else if (siteId.includes("global")) companyId = "global";
  else if (
    siteId.includes("rajbiosis") ||
    siteId.includes("indian") ||
    siteId.includes("humari")
  ) companyId = "rajbiosis";

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

async function parseJsonResponse(response, context) {
  const json = await response.json().catch(() => null);
  if (!response.ok || json?.success === false || json?.ok === false) {
    throw new Error(
      json?.error || `${context} failed with status ${response.status}`
    );
  }
  return json;
}

/** Fetch the website's published catalog from the Admin Panel MongoDB-backed API. */
export async function fetchCatalogFromAdmin({ websiteId, companyId } = {}) {
  const defaults = getCompanyAndWebsite();
  const targetSiteId = websiteId || defaults.siteId;
  const targetCompanyId = companyId || defaults.companyId;

  if (typeof window !== "undefined") {
    try {
      const response = await fetch(
        `/api/catalog?websiteId=${encodeURIComponent(targetSiteId)}&companyId=${encodeURIComponent(targetCompanyId)}`,
        { cache: "no-store", headers: { Accept: "application/json" } }
      );
      const json = await parseJsonResponse(response, "Catalog request");
      if (Array.isArray(json?.products)) return json.products;
      if (Array.isArray(json?.data)) return json.data;
      if (Array.isArray(json)) return json;
      return [];
    } catch (error) {
      console.error("[admin-api] Catalog request failed:", error.message);
      return [];
    }
  }

  const url = new URL(`${ADMIN_API_BASE_URL}/api/catalog`);
  url.searchParams.set("websiteId", targetSiteId);
  url.searchParams.set("companyId", targetCompanyId);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const json = await parseJsonResponse(response, "Admin catalog request");
    if (Array.isArray(json?.products)) return json.products;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json)) return json;
    return [];
  } catch (error) {
    console.error(`[admin-api] Catalog request failed (${url}):`, error.message);
    return [];
  }
}

/** Fetch page/district data from the Admin Panel API; the Admin API reads MongoDB. */
export async function fetchSiteDataFromAdmin({
  websiteId,
  companyId,
  type = "home",
  district = "",
} = {}) {
  const defaults = getCompanyAndWebsite();
  const targetSiteId = websiteId || defaults.siteId;
  const targetCompanyId = companyId || defaults.companyId;

  if (typeof window !== "undefined") {
    const params = new URLSearchParams({
      type,
      websiteId: targetSiteId,
      companyId: targetCompanyId,
    });
    if (district) params.set("district", district);

    try {
      const response = await fetch(`/api/site-data?${params.toString()}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const json = await parseJsonResponse(response, "Site data request");
      return json?.data ?? json?.pages ?? null;
    } catch (error) {
      console.error("[admin-api] Site data request failed:", error.message);
      return null;
    }
  }

  const url = new URL(`${ADMIN_API_BASE_URL}/api/site-data`);
  url.searchParams.set("websiteId", targetSiteId);
  url.searchParams.set("companyId", targetCompanyId);
  url.searchParams.set("type", type);
  if (district) url.searchParams.set("district", district);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const json = await parseJsonResponse(response, "Admin site data request");
    return json?.data ?? json?.pages ?? null;
  } catch (error) {
    console.error(`[admin-api] Site data request failed (${url}):`, error.message);
    return null;
  }
}

/** Send public website enquiries to the Admin Panel's MongoDB-backed API. */
export async function forwardQueryToAdmin({ type, websiteId, companyId, domain, data }) {
  const defaults = getCompanyAndWebsite();
  const targetWebsiteId = websiteId || defaults.siteId;
  const targetCompanyId = companyId || defaults.companyId;
  const payload = {
    type,
    websiteId: targetWebsiteId,
    companyId: targetCompanyId,
    domain: domain || defaults.domain,
    data: {
      ...(data || {}),
      websiteId: targetWebsiteId,
      companyId: targetCompanyId,
      domain: domain || defaults.domain,
      type,
      createdAt: data?.createdAt || new Date().toISOString(),
    },
  };

  const response = await fetch(`${ADMIN_API_BASE_URL}/api/public-query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const json = await parseJsonResponse(response, "Admin enquiry submission");
  return { success: true, ...json };
}

export async function sendContactQuery(payload = {}) {
  const defaults = getCompanyAndWebsite();
  try {
    return await forwardQueryToAdmin({
      type: "contact",
      websiteId: payload.websiteId || defaults.siteId,
      companyId: payload.companyId || defaults.companyId,
      domain: payload.domain || defaults.domain,
      data: payload,
    });
  } catch (error) {
    console.error("[admin-api] Contact enquiry submission failed:", error.message);
    return { success: false, error: error.message };
  }
}

export async function sendProductQuery(payload = {}) {
  const defaults = getCompanyAndWebsite();
  try {
    return await forwardQueryToAdmin({
      type: "product",
      websiteId: payload.websiteId || defaults.siteId,
      companyId: payload.companyId || defaults.companyId,
      domain: payload.domain || defaults.domain,
      data: payload,
    });
  } catch (error) {
    console.error("[admin-api] Product enquiry submission failed:", error.message);
    return { success: false, error: error.message };
  }
}
