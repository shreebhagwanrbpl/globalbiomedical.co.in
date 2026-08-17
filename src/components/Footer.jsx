"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const staticRoutes = ["about", "services", "products", "contact", "items"];

  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalcoin", "pages", "contact")
        );

        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalcoin", "districts", district)
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find((x) => x.label === "Phone Number")?.value ||
    "+91 9257984336";

  const email =
    contactInfo.find((x) => x.label === "Email Address")?.value ||
    "info@globalbiomedical.co.in";

  const address =
    contactInfo.find((x) => x.label === "Office Address")?.value ||
    "Amrapali, Vaishali Nagar, Jaipur, Rajasthan 302021";

  const hours =
    contactInfo.find((x) => x.label === "Working Hours")?.value ||
    "Mon - Sat: 9:00 AM - 7:00 PM";

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : address;

  const phoneNumbers = [
    "+91 9257984336",
    "+91 8529833535",
    "+91 9983301657",
  ];

  const makeLink = (path) => {
    if (!district) return path;
    if (path === "/") return `/${district}`;
    return `/${district}${path}`;
  };

  if (loading) {
    return (
      <footer className="bg-slate-950 border-t border-slate-800 text-white">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-800 rounded animate-pulse mb-6" />
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-5 bg-slate-800 rounded animate-pulse mb-4" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white border-t border-slate-800">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-500/10 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="container-custom relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Company Profile & Logo */}
          <div className="space-y-6">
            <Link href={makeLink("/")} className="flex items-center gap-3 group inline-block">
              <div className="h-14 w-14 rounded-full overflow-hidden border border-amber-500/40 bg-white p-1 shadow-lg group-hover:border-amber-400 transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="Global Biomedical Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-extrabold leading-none text-white">
                  <span className="text-amber-400">Global</span> Biomedical
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-amber-300/90 font-semibold mt-1">
                  Right Here, You Have An Option
                </span>
              </div>
            </Link>

            <p className="leading-relaxed text-slate-400 text-sm">
              Delivering trusted diagnostic and biomedical solutions with innovation, quality assurance, and 24/7 technical support for hospitals and laboratories.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: <FaFacebookF size={16} />,
                    href: "https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/",
                    label: "Facebook",
                    color: "hover:bg-blue-600",
                  },
                  {
                    icon: <FaInstagram size={16} />,
                    href: "https://www.instagram.com/globalbiomedicals/",
                    label: "Instagram",
                    color: "hover:bg-pink-600",
                  },
                  {
                    icon: <FaWhatsapp size={16} />,
                    href: `https://wa.me/919257984336?text=Hello%20Global%20Biomedical`,
                    label: "WhatsApp",
                    color: "hover:bg-emerald-600",
                  },
                  {
                    icon: <FaLinkedinIn size={16} />,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                    color: "hover:bg-blue-700",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 shadow-md ${item.color}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-amber-400 tracking-wide uppercase">
              Quick Navigation
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { name: "Home Page", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Biomedical Services", path: "/services" },
                { name: "Product Catalog", path: "/items" },
                { name: "Contact & Support", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={makeLink(link.path)}
                  className="text-slate-400 transition-colors hover:text-amber-400 flex items-center gap-2"
                >
                  <span className="text-amber-500 text-xs">›</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Diagnostic Solutions */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-amber-400 tracking-wide uppercase">
              Product Categories
            </h3>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <span className="text-amber-500 text-xs">•</span> Hematology Blood Analyzers
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500 text-xs">•</span> Biochemistry Analyzers
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500 text-xs">•</span> Electrolyte Analyzers
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500 text-xs">•</span> ELISA Readers & Washers
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500 text-xs">•</span> AMC & CMC Service Contracts
              </p>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-amber-400 tracking-wide uppercase">
              Contact Information
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Address</span>
                  <p className="text-slate-200 leading-snug">{dynamicAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold mb-1">Phone Numbers</span>
                  <div className="space-y-1">
                    {phoneNumbers.map((num, idx) => (
                      <a
                        key={idx}
                        href={`tel:${num.replace(/[^0-9+]/g, '')}`}
                        className="block text-amber-400 font-bold hover:underline"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Email Us</span>
                  <a href={`mailto:${email}`} className="text-slate-200 hover:text-amber-400 break-all font-medium">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Working Hours</span>
                  <p className="text-slate-300 text-xs">{hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <span className="text-amber-400 font-semibold">Global Biomedical Inc.</span> All Rights Reserved.
          </p>
          <p>
            Certified Diagnostic Equipment & Hospital Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}