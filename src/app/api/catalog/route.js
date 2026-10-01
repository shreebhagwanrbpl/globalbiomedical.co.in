import { NextResponse } from "next/server";
import {
  ADMIN_API_BASE_URL,
  getCompanyAndWebsite,
} from "@/lib/admin-api";
import { fetchFullCatalog } from "@/lib/data-fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request) {
  try {
    const { companyId: defaultCompanyId, siteId: defaultSiteId, domain } =
      getCompanyAndWebsite();

    let products = await fetchFullCatalog();

    return NextResponse.json(
      {
        success: true,
        companyId: defaultCompanyId,
        siteId: defaultSiteId,
        domain,
        count: products.length,
        products,
        adminApiUrl: ADMIN_API_BASE_URL,
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/catalog route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch catalog",
        products: [],
        count: 0,
        adminApiUrl: ADMIN_API_BASE_URL,
        timestamp: Date.now(),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
