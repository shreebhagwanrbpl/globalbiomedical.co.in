import { NextResponse } from "next/server";
import { forwardQueryToAdmin, getCompanyAndWebsite } from "@/lib/admin-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, productName, productSlug, brand, model, message } = body || {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanPhone = String(phone || "").trim();

    if (!cleanName) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400, headers: NO_CACHE });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: "Valid email is required" }, { status: 400, headers: NO_CACHE });
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json({ success: false, error: "Valid 10-digit mobile number is required" }, { status: 400, headers: NO_CACHE });
    }

    const { companyId, siteId, domain } = getCompanyAndWebsite();
    const data = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      productName: typeof productName === "string" ? productName.trim() : "",
      productTitle: typeof productName === "string" ? productName.trim() : "",
      productSlug: typeof productSlug === "string" ? productSlug.trim() : "",
      brand: typeof brand === "string" ? brand.trim() : "",
      model: typeof model === "string" ? model.trim() : "",
      message: typeof message === "string" ? message.trim() : "",
      createdAt: new Date().toISOString(),
    };

    const saved = await forwardQueryToAdmin({
      type: "product",
      websiteId: siteId,
      companyId,
      domain,
      data,
    });

    return NextResponse.json(
      { success: true, message: "Your product enquiry has been submitted successfully.", queryId: saved.id || saved.queryId || null },
      { status: 201, headers: NO_CACHE }
    );
  } catch (error) {
    console.error("[product-query] MongoDB Admin API submission failed:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit your product enquiry right now. Please try again." },
      { status: 502, headers: NO_CACHE }
    );
  }
}
