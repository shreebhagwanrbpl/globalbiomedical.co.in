export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import {
  Award,
  ShieldCheck,
  Building2,
  Users,
  Activity,
  CheckCircle2,
  Wrench,
  Sparkles,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Global Biomedical"
        subtitle="Helping healthcare teams deliver accurate diagnostics through trustworthy machinery and real technical support."
      />

      {/* Main Story & Vision Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Brand Vision Grid */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400">
                <Sparkles size={16} />
                <span>Our Mission & Promise</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Making Medical Diagnostics{" "}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Simple & Reliable
                </span>
              </h2>

              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                At <span className="font-semibold text-amber-400">Global Biomedical</span>,
                we supply dependable laboratory analyzers, blood testing machines, and medical devices to hospitals and pathology clinics all across India.
              </p>

              <p className="text-slate-400 leading-relaxed text-base sm:text-lg">
                We believe that every patient deserves fast, accurate test results. That is why we do not just sell equipment — we deliver total peace of mind with on-site setup, regular machine checkups, and fast technical service.
              </p>

              {/* Bullet Points */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  "ISO Quality Certified Devices",
                  "Safe & Fast Pan-India Delivery",
                  "Flexible Annual Service Contracts",
                  "Skilled On-Call Technicians",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/items"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-extrabold shadow-lg hover:shadow-[0_15px_35px_rgba(251,191,36,0.4)] transition hover:-translate-y-0.5"
                >
                  Explore Products
                </Link>
              </div>
            </div>

            {/* Right: Modern Interactive Graphic Grid */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality Checking</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every machine is double-checked before delivery to ensure reliable, accurate test results for your patients.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 sm:translate-y-8">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <Wrench size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Technical Service</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  On-site setup, routine maintenance, and fast repairs whenever your laboratory needs support.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <Building2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Trusted Partner</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Proudly supporting hospital labs, private diagnostic clinics, and medical research centers.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 sm:translate-y-8">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quick Shipping</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Fast delivery of diagnostic instruments, replacement parts, and daily testing chemicals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Statistics Bar */}
      <section className="py-16 bg-slate-950 border-y border-amber-500/20 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-4xl sm:text-5xl font-black text-amber-400">10+</div>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-semibold">
                Years of Service
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-4xl sm:text-5xl font-black text-amber-400">500+</div>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-semibold">
                Labs Supported
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-4xl sm:text-5xl font-black text-amber-400">100%</div>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-semibold">
                Quality Tested
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-4xl sm:text-5xl font-black text-amber-400">24/7</div>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-semibold">
                Help & Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Our Core Values"
            title="Guided by Honesty & Precision"
            description="Our values shape how we supply equipment, install machines, and support medical teams every day."
            center
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 rounded-[30px] border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-black flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Genuine Quality</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                We only offer machinery from reliable makers who meet high safety and accuracy standards.
              </p>
            </div>

            <div className="p-8 rounded-[30px] border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-black flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Caring Customer Support</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                We stay in close touch with lab managers to ensure their machines keep running without unexpected delays.
              </p>
            </div>

            <div className="p-8 rounded-[30px] border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-black flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                <Activity size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Modern Medical Tech</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                We continuously bring easy-to-use, modern testing tools to pathology labs and medical centers of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
