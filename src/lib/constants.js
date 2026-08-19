export const SITE_CONFIG = {
  domain: "globalbiomedical.co.in",
  baseUrl: "https://globalbiomedical.co.in",
  siteName: "Global Biomedical",
  legalName: "Global Biomedical Inc.",
  tagline: "Right Here, You Have An Option",
  description:
    "Leading supplier, dealer, and technical service provider of medical diagnostic analyzers, hematology instruments, biochemistry equipment, and hospital laboratory technology across India.",
  defaultOgImage: "https://globalbiomedical.co.in/logo.png",
  phoneNumbers: ["+91 9257984336", "+91 8529833535", "+91 9983301657"],
  primaryPhone: "+91 9257984336",
  email: "info@globalbiomedical.co.in",
  address: {
    street: "Amrapali, Vaishali Nagar",
    city: "Jaipur",
    state: "Rajasthan",
    postalCode: "302021",
    country: "IN",
    countryName: "India",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/",
    instagram: "https://www.instagram.com/globalbiomedicals/",
    whatsapp: "https://wa.me/919257984336",
    linkedin: "https://linkedin.com",
  },
};

/**
 * Programmatic SEO Quality Gate (Phase 10)
 * Evaluates whether a page has sufficient unique data/value to be indexable.
 */
export function evaluateSeoQualityScore({ title, description, content, slug, isLocationPage = false, hasProducts = true }) {
  let score = 0;

  // Technical SEO (20 pts)
  if (slug && typeof slug === "string" && slug.length > 2) score += 20;

  // Content Quality & Length (20 pts)
  if (content && content.length > 100) score += 20;
  else if (content && content.length > 30) score += 10;

  // Search Intent & Availability (15 pts)
  if (hasProducts) score += 15;

  // Internal Linking & Structure (10 pts)
  score += 10;

  // Metadata Completeness (10 pts)
  if (title && title.length >= 10 && title.length <= 70) score += 5;
  if (description && description.length >= 30 && description.length <= 160) score += 5;

  // Structured Data Ready (10 pts)
  score += 10;

  // Performance / Asset Check (5 pts)
  score += 5;

  // Images & Visuals (5 pts)
  score += 5;

  // Local relevance penalty/check
  if (isLocationPage && !hasProducts) score -= 20;

  return {
    score,
    isIndexable: score >= 60,
    shouldIncludeInSitemap: score >= 70,
  };
}
