import ProductDetails from "./ProductDetails";
import { fetchProductBySlugServer } from "@/lib/data-fetcher-server";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await fetchProductBySlugServer(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const brandName = product?.brand || "Global Biomedical";
    const categoryName = product?.category || "Biomedical & Diagnostic Equipment";

    const title = `${productName} Supplier in India | Price, Dealer & Distributor | Global Biomedical`;
    const description = `Buy ${productName} (${brandName}) at best price in India. Leading supplier, dealer and technical service provider of ${categoryName} for hospitals and pathology labs. Contact Global Biomedical for instant quotation.`;
    const url = `https://globalbiomedical.co.in/items/${slug}`;

    return {
        title,
        description,
        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Distributor`,
            `${productName} Manufacturer`,
            `${productName} Price`,
            `${productName} Price in India`,
            `${productName} Supplier in India`,
            `Buy ${productName}`,
            `${categoryName}`,
            "Biomedical Equipment",
            "Laboratory Equipment",
            "Diagnostic Equipment",
            "Hospital Equipment",
            "Global Biomedical",
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Global Biomedical",
            type: "website",
            locale: "en_IN",
            images: [
                {
                    url: product?.images?.[0] || "https://globalbiomedical.co.in/logo.png",
                    width: 1200,
                    height: 630,
                    alt: productName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [product?.images?.[0] || "https://globalbiomedical.co.in/logo.png"],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        metadataBase: new URL("https://globalbiomedical.co.in"),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const product = await fetchProductBySlugServer(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        image: product?.images?.[0] ? [product.images[0]] : ["https://globalbiomedical.co.in/hdc_lyte_analyzer.svg"],
        description: product?.desc || `${productName} for hospitals, laboratories, and diagnostic centers across India.`,
        sku: product?.model || slug,
        brand: {
            "@type": "Brand",
            name: product?.brand || "Global Biomedical",
        },
        offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            offerCount: "1",
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Global Biomedical Inc.",
            },
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://globalbiomedical.co.in",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://globalbiomedical.co.in/items",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: productName,
                item: `https://globalbiomedical.co.in/items/${slug}`,
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `What is ${productName} used for?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${productName} is an advanced diagnostic medical instrument used in clinical laboratories, pathology centers, and hospitals for precise sample analysis.`,
                },
            },
            {
                "@type": "Question",
                name: `How can I buy or request a quotation for ${productName}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `You can request an official price quote by calling Global Biomedical customer support or submitting an enquiry on our official website.`,
                },
            },
            {
                "@type": "Question",
                name: `Do you provide installation and service support for ${productName}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Yes, Global Biomedical provides complete technical support, on-site calibration, and preventive maintenance across India.`,
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ProductDetails slug={slug} initialProduct={product} />
        </>
    );
}