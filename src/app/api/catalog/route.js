import { NextResponse } from "next/server";
import { fetchFullCatalog, getCompanyAndWebsite } from "@/lib/data-fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const { companyId, siteId, domain } = getCompanyAndWebsite();
    const products = await fetchFullCatalog();

    return NextResponse.json(
      {
        success: true,
        companyId,
        siteId,
        domain,
        count: products.length,
        products,
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
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
