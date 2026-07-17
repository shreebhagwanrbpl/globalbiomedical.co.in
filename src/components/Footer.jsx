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
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
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
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            district
          )
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
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-400/5 blur-[120px]" />

      <div className="container-custom relative z-10 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-extrabold">
              <span className="text-amber-400">
                Central
              </span>{" "}
              <span className="text-white">
                Biomedicals
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Delivering trusted diagnostic and biomedical solutions with
              innovation, quality, and precision healthcare support for
              hospitals, laboratories, and healthcare professionals.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-6 text-xl font-bold text-amber-400">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                href={makeLink("/")}
                className="text-gray-400 transition hover:text-amber-400"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="text-gray-400 transition hover:text-amber-400"
              >
                About
              </Link>

              <Link
                href={makeLink("/services")}
                className="text-gray-400 transition hover:text-amber-400"
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="text-gray-400 transition hover:text-amber-400"
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="text-gray-400 transition hover:text-amber-400"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="mb-6 text-xl font-bold text-amber-400">
              Services
            </h3>

            <div className="space-y-4 text-gray-400">

              <p>Diagnostic Equipment</p>

              <p>Laboratory Solutions</p>

              <p>Biomedical Instruments</p>

              <p>Maintenance Support</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-6 text-xl font-bold text-amber-400">
              Contact Info
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 p-2">
                  <MapPin size={18} className="text-black" />
                </div>

                <p className="text-gray-400 leading-7">
                  {dynamicAddress}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 p-2">
                  <Phone size={18} className="text-black" />
                </div>

                <p className="text-gray-400">
                  {phone}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 p-2">
                  <Mail size={18} className="text-black" />
                </div>

                <p className="text-gray-400 break-all">
                  {email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-amber-500/20 pt-8 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 <span className="text-amber-400">Central Biomedicals</span>. All Rights Reserved.
          </p>

          <p>
            Designed with <span className="text-amber-400">Precision</span> for Modern Diagnostics.
          </p>

        </div>

      </div>

    </footer>
  );
}