import { NextResponse } from "next/server";
import {
  ADMIN_API_BASE_URL,
  getCompanyAndWebsite,
  fetchSiteDataFromAdmin,
} from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const district = searchParams.get("district") || "";
    const requestedWebsiteId = searchParams.get("websiteId");
    const requestedCompanyId = searchParams.get("companyId");

    const { companyId: defaultCompanyId, siteId: defaultSiteId, domain } =
      getCompanyAndWebsite();

    const siteId = requestedWebsiteId || defaultSiteId;
    const companyId = requestedCompanyId || defaultCompanyId;

    const data = await fetchSiteDataFromAdmin({
      websiteId: siteId,
      companyId,
      type,
      district,
    });

    return NextResponse.json(
      {
        success: true,
        type,
        siteId,
        companyId,
        domain,
        district: district || null,
        data: data !== null ? data : null,
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
    console.error("Error in /api/site-data route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch site data",
        data: null,
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
