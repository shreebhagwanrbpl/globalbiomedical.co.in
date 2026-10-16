export const dynamic = "force-dynamic";
export const revalidate = 0;
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

const serviceIcons = [
  <Microscope key="1" size={32} />,
  <Wrench key="2" size={32} />,
  <ShieldCheck key="3" size={32} />,
  <FlaskConical key="4" size={32} />,
  <Stethoscope key="5" size={32} />,
  <Activity key="6" size={32} />,
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/site-data?type=services");
        const json = await res.json();

        if (json?.success && Array.isArray(json?.data?.services)) {
          setServices(json.data.services);
        } else if (json?.success && Array.isArray(json?.data)) {
          setServices(json.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
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
        title="Our Diagnostic & Technical Services"
        subtitle="Clear, reliable medical machine supply, setup, maintenance, and reagent delivery tailored for healthcare providers."
      />

      {/* Services Grid Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="Services We Provide"
            title="Services Built for Smooth Lab Operations"
            description="From getting your first diagnostic machine to keeping it running in top shape, we handle the hard technical details."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-[32px] bg-white p-8 border border-slate-200 shadow-lg animate-pulse h-64"
                />
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <div
                  key={index}
                  className="group relative rounded-[32px] bg-white p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:border-amber-400"
                >
                  <div>
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 border border-slate-800 shadow-md group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                      {serviceIcons[index % serviceIcons.length] || <Settings size={32} />}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {service.title || service.name}
                    </h3>

                    <p className="text-slate-600 leading-relaxed text-sm mb-6">
                      {service.desc || service.description}
                    </p>
                  </div>

                  <div>
                    {Array.isArray(service.features) && service.features.length > 0 && (
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
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500 text-sm">
                No services available at this time.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Structured Workflow Process */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Simple Step-by-Step"
            title="How We Support Your Laboratory"
            description="A clear 4-step process designed to get your lab running fast and keep it operating without hiccups."
            center
          />

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Understanding Needs",
                desc: "Talking with your team to pick the right machinery for your daily patient volume.",
                icon: <Clock size={24} />,
              },
              {
                step: "02",
                title: "Safe Delivery",
                desc: "Carefully transporting your calibrated testing units with full protective packaging.",
                icon: <Zap size={24} />,
              },
              {
                step: "03",
                title: "Setup & Demonstration",
                desc: "Installing the machines in your lab and showing your staff how to use them easily.",
                icon: <Settings size={24} />,
              },
              {
                step: "04",
                title: "Ongoing Care",
                desc: "Regular checkups and fast assistance whenever you need help or spare parts.",
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
