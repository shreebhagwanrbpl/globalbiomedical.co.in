"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  Award,
  Building2,
  Activity,
  Sparkles,
  CheckCircle2,
  Zap,
  Wrench,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "Advanced Biomedical & Laboratory Equipment",
    description: "Supplying fully automatic blood analyzers, biochemistry instruments, and pathology lab equipment across India with 24/7 technical support.",
    button1Text: "Explore Products",
    button2Text: "Get Quick Quote",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalcoin", "pages", "home")
        );

        if (snap.exists() && snap.data().title) {
          setHeroData((prev) => ({
            ...prev,
            ...snap.data(),
          }));
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-800">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Copy & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4.5 py-2 text-xs sm:text-sm font-bold text-amber-400 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <ShieldCheck size={16} className="text-amber-400" />
            <span>ISO Certified Biomedical Technology</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-slate-800 rounded w-[85%]" />
                <div className="h-12 bg-slate-800 rounded w-[70%]" />
              </div>
            ) : (
              <>
                <span>{heroData.title}</span>
                {city && (
                  <>
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-bold">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Subtext */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {heroData.description}
            {city && (
              <>
                {" "}Delivered directly to hospitals and diagnostic centers in <strong>{city}</strong>.
              </>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href={makeLink("/items")} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-extrabold shadow-lg hover:shadow-[0_15px_35px_rgba(251,191,36,0.4)] transition hover:-translate-y-0.5 cursor-pointer">
                <span>{heroData.button1Text || "Explore Products"}</span>
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link href={makeLink("/contact")} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900 text-white font-bold hover:bg-slate-800 hover:border-slate-600 transition cursor-pointer">
                <span>{heroData.button2Text || "Contact Us"}</span>
              </button>
            </Link>
          </div>

          {/* Highlight Bullets */}
          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
              <span>Full Installation & On-site Demo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
              <span>Annual AMC / CMC Technical Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
              <span>Pan-India Temperature Controlled Logistics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
              <span>24/7 Breakdown Response Engineering</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: High Tech Interactive Grid (Replaces old image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 grid sm:grid-cols-2 gap-5"
        >
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl hover:border-amber-500/40 transition duration-300">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Microscope size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Blood Analyzers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              3-Part & 5-Part differential hematology cells counters with auto-sampler support.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl hover:border-amber-500/40 transition duration-300 sm:translate-y-6">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Biochemistry Units</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fully automated & semi-automatic photometric analyzers with reagent cooling.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl hover:border-amber-500/40 transition duration-300">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Wrench size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Calibration & AMC</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive preventive maintenance and certified calibration services.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl hover:border-amber-500/40 transition duration-300 sm:translate-y-6">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Rapid Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Guaranteed fast shipment of diagnostic reagents, spare parts, and accessories.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}