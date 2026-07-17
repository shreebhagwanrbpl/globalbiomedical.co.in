"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  Award,
  Building2,
  Activity,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "centralbiomedicals", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
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
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="gradient-bg overflow-hidden relative">
      <div className="container-custom min-h-[90vh] py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >

          {/* Premium Glowing Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 to-teal-500/10 border border-sky-500/20 text-sky-700 px-4.5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <ShieldCheck size={16} className="text-sky-600" />
            <span>Trusted Biomedical Systems</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-slate-200 rounded w-[85%]"></div>
                <div className="h-12 bg-slate-200 rounded w-[70%]"></div>
              </div>
            ) : (
              <>
                <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                  {heroData.title}
                </span>
                {city && (
                  <>
                    <br />
                    <span className="inline-block mt-2 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-7 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-[90%]"></div>
            </div>
          ) : (
            <p className="mt-7 text-slate-600 text-lg leading-8 max-w-xl font-normal">
              {heroData.description}
              {city && (
                <>
                  {" "}across <strong>{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-10">
            {loading ? (
              <>
                <div className="animate-pulse h-12 w-44 bg-slate-200 rounded-xl"></div>
                <div className="animate-pulse h-12 w-36 bg-slate-200 rounded-xl"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")} className="w-full sm:w-auto">
                  <button className="primary-btn w-full sm:w-auto flex items-center justify-center gap-3 shadow-lg shadow-sky-600/10 hover:shadow-sky-600/20 transition-all duration-300">
                    <span>{heroData.button1Text || "Explore Services"}</span>
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href={makeLink("/contact")} className="w-full sm:w-auto">
                  <button className="secondary-btn w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all duration-300">
                    <span>{heroData.button2Text || "Contact Us"}</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Redesigned Metric Cards */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-14">
            <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="bg-sky-500/10 w-10 h-10 rounded-xl flex items-center justify-center text-sky-600 mb-4 group-hover:scale-110 transition-transform">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">10+</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Years Experience</p>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="bg-cyan-500/10 w-10 h-10 rounded-xl flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition-transform">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">500+</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Products Delivered</p>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/60 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="bg-teal-500/10 w-10 h-10 rounded-xl flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                <Activity size={20} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">100%</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Quality Assurance</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Visual with Overlays */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative lg:ml-6 flex items-center justify-center"
        >
          {/* Decorative Glowing Radial Blob */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-sky-500/20 to-teal-500/20 rounded-[100px] blur-3xl opacity-70 animate-pulse-slow"></div>

          <div className="relative glass-card rounded-[40px] p-5 border border-white/80 shadow-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-500 group w-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <Image
              src={CBG}
              alt="Central Biomedical"
              width={1200}
              height={900}
              className="rounded-[28px] object-cover h-[350px] sm:h-[450px] lg:h-[500px] w-full shadow-inner"
              priority
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -top-6 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl hidden xl:flex items-center gap-4 border border-white/60 hover:-translate-y-1 transition duration-300">
            <div className="bg-sky-500/10 p-3 rounded-xl text-sky-600 shadow-inner">
              <Microscope size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Modern Labs</h4>
              <p className="text-xs text-slate-500">Precision Equipment</p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl hidden xl:flex items-center gap-4 border border-white/60 hover:-translate-y-1 transition duration-300">
            <div className="bg-teal-500/10 p-3 rounded-xl text-teal-600 shadow-inner">
              <BadgeCheck size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Trusted Quality</h4>
              <p className="text-xs text-slate-500">Certified Solutions</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}