"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  CheckCircle2,
  PhoneCall,
  Clock,
  Settings,
  Zap,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultServices = [
  {
    title: "Biomedical Equipment Supply & Installation",
    desc: "Turnkey supply, testing, and professional installation of hematology analyzers, biochemistry units, electrolyte instruments, and ICU equipment.",
    icon: <Microscope size={32} />,
    features: ["Certified OEM Setup", "Calibration Verification", "On-site Staff Training"],
  },
  {
    title: "Diagnostic Analyzer Maintenance (AMC & CMC)",
    desc: "Comprehensive annual maintenance (AMC) and comprehensive maintenance contracts (CMC) ensuring zero laboratory downtime.",
    icon: <Wrench size={32} />,
    features: ["Preventive Health Checks", "Original Spare Replacement", "Priority Emergency Visits"],
  },
  {
    title: "Laboratory Calibration & QA Testing",
    desc: "High-precision calibration and quality assurance compliance checks to meet national and international accreditation standards.",
    icon: <ShieldCheck size={32} />,
    features: ["Precision Standard Control", "Audit-Ready Certificates", "Validation Reports"],
  },
  {
    title: "Reagents & Medical Consumables Supply",
    desc: "Timely nationwide supply of high-grade diagnostic reagents, controls, calibrators, and hospital laboratory consumables.",
    icon: <FlaskConical size={32} />,
    features: ["Cold-Chain Managed Logistics", "Batch-Verified Stock", "Bulk Supply Discounts"],
  },
  {
    title: "Technical Consultation & Lab Planning",
    desc: "Expert layout planning, electrical/plumbing design, and equipment selection advice for new diagnostic centres and pathology labs.",
    icon: <Stethoscope size={32} />,
    features: ["Workflow Optimization", "Space & Power Audit", "Cost-Effective Solutions"],
  },
  {
    title: "24/7 Breakdown & Repair Assistance",
    desc: "Rapid breakdown response team equipped with diagnostic tools to resolve technical glitches and hardware failures quickly.",
    icon: <Activity size={32} />,
    features: ["Rapid On-call Support", "Loaner Unit Availability", "Expert Technical Advice"],
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "globalbiomedicalcoin",
            "pages",
            "services"
          )
        );

        if (snap.exists() && snap.data().services?.length) {
          const loaded = snap.data().services.map((item, idx) => ({
            ...item,
            icon: defaultServices[idx % defaultServices.length].icon,
            features: defaultServices[idx % defaultServices.length].features,
          }));
          setServices(loaded);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Biomedical Services"
        subtitle="End-to-end technical support, equipment maintenance, calibration, and hospital laboratory solutions engineered for peak clinical reliability."
      />

      {/* Services Grid Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="What We Provide"
            title="Comprehensive Healthcare & Biomedical Services"
            description="From equipment installation to maintenance and emergency calibration, we power modern laboratories with complete technical assurance."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-[32px] bg-white p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:border-amber-400"
              >
                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 border border-slate-800 shadow-md group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                    {service.icon || <Settings size={32} />}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm mb-6">
                    {service.desc || service.description}
                  </p>
                </div>

                <div>
                  {service.features && (
                    <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 group-hover:text-amber-700 transition"
                  >
                    <span>Request Service</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Workflow Process */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Execution Process"
            title="How We Deliver Biomedical Support"
            description="A systematic multi-step service framework designed for zero downtime and full audit compliance."
            center
          />

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Requirement Audit",
                desc: "Assessing lab workload, instrument specifications, and space/power parameters.",
                icon: <Clock size={24} />,
              },
              {
                step: "02",
                title: "Equipment Delivery",
                desc: "Safely transporting calibrated analyzers with protective packaging and documentation.",
                icon: <Zap size={24} />,
              },
              {
                step: "03",
                title: "Installation & Demo",
                desc: "Setting up machines, running standard controls, and training laboratory technicians.",
                icon: <Settings size={24} />,
              },
              {
                step: "04",
                title: "24/7 AMC Maintenance",
                desc: "Scheduled preventive maintenance and priority emergency breakdown assistance.",
                icon: <PhoneCall size={24} />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/80 border border-slate-700 rounded-[28px] p-8 relative backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300"
              >
                <span className="text-4xl font-extrabold text-amber-400/30 absolute top-6 right-6">
                  {item.step}
                </span>

                <div className="h-12 w-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}