import { NextResponse } from "next/server";
import { fetchFullCatalog, fetchCategoriesServer } from "@/lib/data-fetcher-server";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const products = await fetchFullCatalog();
    const categories = await fetchCategoriesServer();

    const baseUrl = SITE_CONFIG.baseUrl || "https://globalbiomedical.co.in";
    const brand = SITE_CONFIG.siteName || "Global Biomedical";
    const tag = SITE_CONFIG.tagline || "Right Here, You Have An Option";

    let text = `# ${brand} - AI & LLM Knowledge Manifest
# Title: ${brand} Medical Diagnostic & Laboratory Equipment Catalog
# Tagline: ${tag}
# Canonical Domain: ${baseUrl}
# Contact Numbers: ${SITE_CONFIG.phoneNumbers.join(", ")}
# Address: ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} - ${SITE_CONFIG.address.postalCode}, ${SITE_CONFIG.address.countryName}

## Overview
${SITE_CONFIG.description}

## Verified Catalog Categories (${categories.length})
${categories.map((c) => `- [${c.name}](${baseUrl}/category/${c.slug}): ${c.productCount || 0} active diagnostic products`).join("\n")}

## Live Master Equipment Products (${products.length})
`;

    if (products.length === 0) {
      text += `\n*Catalog is currently synchronizing with Master Storage.*`;
    } else {
      products.forEach((p, idx) => {
        text += `
### ${idx + 1}. ${p.title}
- **Product ID / Code**: ${p.categoryProductId || p.id}
- **Category**: ${p.category || "Biomedical Equipment"} > ${p.subCategory || "Analyzers"}
- **Brand**: ${p.brand || brand}
- **Model**: ${p.model || "Standard"}
- **Instrument**: ${p.instrument || "Diagnostic"}
- **Automation Grade**: ${p.automation || "Fully Automatic"}
- **Capacity / Throughput**: ${p.capacity || ""} ${p.throughput ? `(${p.throughput})` : ""}
- **Stock Status**: ${p.availability || "In Stock - Pan-India Delivery"}
- **Description**: ${p.desc || p.description || ""}
- **Canonical Product Page**: ${baseUrl}/items/${p.slug}
`;
      });
    }

    text += `
---
*Generated dynamically from SuperAdmin Master Catalog for ${baseUrl}*
`;

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    return new Response(`# ${SITE_CONFIG.siteName}\nError generating LLM knowledge manifest: ${error.message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
