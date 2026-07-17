"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[42px] bg-gradient-to-r from-zinc-950 via-black to-amber-700 p-10 lg:p-20 text-white shadow-2xl"
        >

          {/* Background Glow */}
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-[140px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

            {/* Left Content */}
            <div>

              <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/20 px-5 py-2 text-sm font-semibold text-amber-200 backdrop-blur-md">
                ✨ Get In Touch
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight lg:text-6xl">
                Need Premium
                <span className="block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Biomedical Solutions?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Discover innovative diagnostic systems and trusted biomedical
                technologies tailored for modern healthcare excellence.
              </p>

            </div>

            {/* Right Card */}
            <div className="flex lg:justify-end">

              <div className="w-full max-w-md rounded-[32px] border border-amber-200 bg-white p-8 text-zinc-900 shadow-[0_20px_60px_rgba(251,191,36,0.18)]">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-amber-600 shadow-lg">
                  <PhoneCall size={30} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-zinc-900">
                  Let's Talk
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Contact our biomedical experts for consultation, equipment,
                  and healthcare support.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-black via-zinc-900 to-amber-600 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-400/40">
                      Contact Us

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </Link>

                  <a
                    href="tel:+919876543210"
                    className="rounded-2xl border-2 border-amber-500 px-6 py-4 text-center font-semibold text-black transition-all duration-300 hover:bg-amber-500 hover:text-black"
                  >
                    Call Now
                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}