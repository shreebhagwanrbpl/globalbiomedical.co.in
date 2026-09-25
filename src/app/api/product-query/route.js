import { NextResponse } from "next/server";
import { ADMIN_API_BASE_URL, getCompanyAndWebsite } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, productName, productSlug, brand, model } =
      body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!phone || !phoneRegex.test(String(phone).trim())) {
      return NextResponse.json(
        { success: false, error: "Valid 10-digit mobile number is required" },
        { status: 400 }
      );
    }

    const { companyId, siteId, domain } = getCompanyAndWebsite();

    const queryPayload = {
      websiteId: siteId,
      companyId,
      domain,
      name: name.trim(),
      email: email.trim(),
      phone: String(phone).trim(),
      productName: productName ? productName.trim() : "",
      productSlug: productSlug ? productSlug.trim() : "",
      brand: brand ? brand.trim() : "",
      model: model ? model.trim() : "",
      type: "product",
      createdAt: new Date().toISOString(),
    };

    // Forward to SQLite Admin API backend
    const adminUrl = `${ADMIN_API_BASE_URL}/api/product-query`;
    try {
      await fetch(adminUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(queryPayload),
      });
    } catch (forwardErr) {
      console.warn("[product-query] Backend forward note:", forwardErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        data: queryPayload,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/product-query route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit product enquiry",
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
