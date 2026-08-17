import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://globalbiomedical.co.in"),
  title: {
    default: "Global Biomedical | Medical Laboratory Equipment Supplier in India",
    template: "%s | Global Biomedical",
  },
  description:
    "Global Biomedical Inc. is a leading supplier of blood analyzers, CBC machines, hematology analyzers, biochemistry instruments, and hospital diagnostic equipment across India with 24/7 technical support.",
  keywords: [
    "Biomedical Equipment Supplier",
    "Medical Laboratory Equipment India",
    "CBC Machine Supplier",
    "Hematology Analyzer",
    "Biochemistry Analyzer Price",
    "Diagnostic Equipment Distributor",
    "Abbott Blood Analyzer",
    "Electrolyte Analyzer India",
    "Pathology Laboratory Equipment",
    "Global Biomedical Inc",
  ],
  authors: [{ name: "Global Biomedical Inc.", url: "https://globalbiomedical.co.in" }],
  creator: "Global Biomedical Inc.",
  publisher: "Global Biomedical Inc.",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Global Biomedical | Medical Laboratory Equipment Supplier in India",
    description:
      "Leading supplier and distributor of diagnostic, hematology, and laboratory analyzers for hospitals and pathology centers across India.",
    url: "https://globalbiomedical.co.in",
    siteName: "Global Biomedical Inc.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Global Biomedical Inc. Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Biomedical | Medical Laboratory Equipment Supplier in India",
    description:
      "Supplier of advanced biomedical analyzers and laboratory instruments across India.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://globalbiomedical.co.in",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Global Biomedical Inc.",
  url: "https://globalbiomedical.co.in",
  logo: "https://globalbiomedical.co.in/logo.png",
  description:
    "Distributor and technical service provider of medical diagnostic equipment, hematology analyzers, and hospital laboratory technology.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9876543210",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
    "https://linkedin.com",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0B132B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-black">
        <Navbar />
        <main>{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        <Footer />
      </body>
    </html>
  );
}