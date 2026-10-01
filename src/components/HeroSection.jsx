"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  Activity,
  CheckCircle2,
  Zap,
  Wrench,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  // Fetch dynamic homepage data from Admin API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchHeroData() {
      try {
        const res = await fetch("/api/site-data?type=home", {
          cache: "no-store",
          signal: controller.signal,
        });

        const json = await res.json();

        if (res.ok && json?.success && json?.data) {
          setHeroData({
            title: json.data.title || "",
            description:
              json.data.description ||
              json.data.subtitle ||
              "",
            button1Text:
              json.data.button1Text ||
              json.data.primaryButtonText ||
              "",
            button2Text:
              json.data.button2Text ||
              json.data.secondaryButtonText ||
              "",
          });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching hero data:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchHeroData();

    return () => controller.abort();
  }, []);

  // District-aware routing
  const districtSlug = city
    ? city.toLowerCase().trim().replace(/\s+/g, "-")
    : "";

  const makeLink = (path = "/") => {
    const target = path.startsWith("/")
      ? path
      : `/${path}`;

    return districtSlug
      ? `/${districtSlug}${target}`
      : target;
  };

  // Service highlights
  const highlights = [
    "On-site machine setup & staff guidance",
    "Annual maintenance and service support",
    "Careful delivery of diagnostic equipment",
    "Technical assistance for laboratory teams",
  ];

  // Right-side service cards
  const serviceCards = [
    {
      icon: Microscope,
      title: "Blood Analyzers",
      description:
        "Diagnostic systems for routine hematology testing.",
    },
    {
      icon: Activity,
      title: "Biochemistry Units",
      description:
        "Analyzers for chemistry panels and routine lab work.",
    },
    {
      icon: Wrench,
      title: "Servicing & Care",
      description:
        "Equipment maintenance and technical support.",
    },
    {
      icon: Zap,
      title: "Fast Dispatch",
      description:
        "Supply of instruments, parts, and lab consumables.",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-800 bg-[#050b1b] text-white">
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]"
      />

      {/* Main hero layout */}
      <div
        className="
          container-custom relative z-10
          grid items-center gap-8
          py-8 sm:py-10
          lg:min-h-[calc(100svh-90px)]
          lg:grid-cols-12 lg:gap-8 lg:py-5
          xl:gap-10
        "
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="min-w-0 lg:col-span-7"
        >
          {/* Trust badge */}
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:mb-5 sm:px-4 sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />

            <ShieldCheck
              size={16}
              className="shrink-0"
            />

            <span>
              ISO Certified Medical Technology & Fast Support
            </span>
          </div>

          {/* Dynamic heading */}
          <h1
            className="
              max-w-[760px] break-words
              text-[clamp(2.1rem,3.35vw,3.45rem)]
              font-extrabold leading-[1.06]
              tracking-[-0.04em] text-white
              [text-wrap:balance]
            "
          >
            {loading ? (
              <span className="block animate-pulse space-y-3">
                <span className="block h-10 w-[88%] rounded-lg bg-slate-800 sm:h-12" />
                <span className="block h-10 w-[70%] rounded-lg bg-slate-800 sm:h-12" />
              </span>
            ) : (
              <>
                {heroData.title ||
                  "Clinical Pathology Instruments, Biomedical Diagnostic Analyzers & Lab Solutions"}

                {city && (
                  <span
                    className="
                      mt-1 block
                      bg-gradient-to-r
                      from-emerald-300 via-teal-200 to-sky-300
                      bg-clip-text
                      text-[clamp(1.65rem,2.4vw,2.45rem)]
                      font-bold tracking-[-0.035em]
                      text-transparent
                    "
                  >
                    Serving {city}
                  </span>
                )}
              </>
            )}
          </h1>

          {/* Dynamic description */}
          {loading ? (
            <div className="mt-4 max-w-xl animate-pulse space-y-2">
              <div className="h-3.5 w-full rounded bg-slate-800" />
              <div className="h-3.5 w-4/5 rounded bg-slate-800" />
            </div>
          ) : (
            heroData.description && (
              <p className="mt-4 max-w-[650px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                {heroData.description}

                {city && (
                  <>
                    {" "}
                    Supporting hospitals and diagnostic centres in{" "}
                    <strong className="font-semibold text-white">
                      {city}
                    </strong>
                    .
                  </>
                )}
              </p>
            )
          )}

          {/* Action buttons */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {loading ? (
              <>
                <div className="h-12 w-40 animate-pulse rounded-xl bg-slate-800" />
                <div className="h-12 w-40 animate-pulse rounded-xl bg-slate-800" />
              </>
            ) : (
              <>
                <Link
                  href={makeLink("/items")}
                  className="
                    inline-flex min-h-12 items-center justify-center gap-2
                    rounded-xl
                    bg-gradient-to-r from-emerald-400 to-lime-400
                    px-6 py-3
                    text-sm font-extrabold text-slate-950
                    shadow-lg shadow-emerald-500/15
                    transition hover:-translate-y-0.5 hover:brightness-105
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-emerald-300
                    sm:text-base
                  "
                >
                  <span>
                    {heroData.button1Text || "Explore Products"}
                  </span>

                  <ArrowRight size={18} />
                </Link>

                <Link
                  href={makeLink("/contact")}
                  className="
                    inline-flex min-h-12 items-center justify-center gap-2
                    rounded-xl border border-slate-700
                    bg-white/[0.04] px-6 py-3
                    text-sm font-bold text-white
                    transition hover:border-emerald-400/50
                    hover:bg-white/[0.08]
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-emerald-300
                    sm:text-base
                  "
                >
                  <span>
                    {heroData.button2Text || "Get a Quote"}
                  </span>

                  <ArrowRight size={17} />
                </Link>
              </>
            )}
          </div>

          {/* Compact service highlights */}
          <div
            className="
              mt-6 grid max-w-[690px]
              grid-cols-1 gap-x-5 gap-y-2.5
              border-t border-slate-800 pt-5
              text-xs font-medium leading-5 text-slate-300
              sm:grid-cols-2 sm:text-sm
            "
          >
            {highlights.map((item) => (
              <div
                key={item}
                className="flex min-w-0 items-start gap-2"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT CONTENT: FOUR SERVICE CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.08,
            ease: "easeOut",
          }}
          className="
            grid min-w-0 grid-cols-1 gap-3
            sm:grid-cols-2
            lg:col-span-5 lg:gap-3
            xl:gap-4
          "
        >
          {serviceCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                className={`
                  rounded-2xl border border-slate-800/90
                  bg-slate-900/75 p-4
                  shadow-lg shadow-black/10 backdrop-blur-sm
                  sm:p-5
                  ${index === 1 || index === 3
                    ? "sm:translate-y-4"
                    : ""
                  }
                `}
              >
                <div
                  className="
                    mb-3 flex h-10 w-10 items-center justify-center
                    rounded-xl border border-emerald-400/20
                    bg-emerald-400/[0.08] text-emerald-300
                    sm:h-11 sm:w-11
                  "
                >
                  <Icon size={22} />
                </div>

                <h2 className="text-base font-bold text-white sm:text-lg">
                  {card.title}
                </h2>

                <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}