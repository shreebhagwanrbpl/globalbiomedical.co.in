import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchProductBySlugServer } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
    const { slug, district } = await params;
    const product = await fetchProductBySlugServer(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${districtName} | Global Biomedical`;
    const description = `Buy ${productName} in ${districtName}. Global Biomedical is a trusted supplier, dealer, and technical service provider of laboratory and diagnostic equipment in ${districtName}.`;
    const canonicalUrl = `https://globalbiomedical.co.in/items/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: `https://globalbiomedical.co.in/${district}/items/${slug}`,
            siteName: "Global Biomedical",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;

    return (
        <ProductDetails
            slug={slug}
            district={district}
        />
    );
}