import Home from "@/app/page";
import { fetchDistrictsServer, fetchCategoriesServer } from "@/lib/data-fetcher-server";

export async function generateStaticParams() {
  const districts = await fetchDistrictsServer();
  return districts.map((d) => ({
    district: d.slug,
  }));
}

export default async function DistrictPage({ params }) {
  const { district = "jaipur" } = await params;
  const districts = await fetchDistrictsServer();
  const categories = await fetchCategoriesServer();

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const currentDistrictObj = districts.find((d) => d.slug === district);
  const stateName = currentDistrictObj?.state || "India";

  // Local Business / Medical Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Global Biomedical Supplier - ${city}`,
    description: `Leading supplier of medical laboratory equipment, blood analyzers, and biochemistry instruments serving ${city}, ${stateName}.`,
    url: `https://globalbiomedical.co.in/${district}`,
    telephone: "+91-9257984336",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${city}, ${stateName}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: stateName,
      addressCountry: "IN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Global Biomedical Inc.",
      url: "https://globalbiomedical.co.in",
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
        name: `${city} Biomedical Supplier`,
        item: `https://globalbiomedical.co.in/${district}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home city={city} districtSlug={district} stateName={stateName} districts={districts} categories={categories} />
    </>
  );
}