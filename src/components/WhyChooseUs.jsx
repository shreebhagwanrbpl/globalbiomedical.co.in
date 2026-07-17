"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Us"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies and biomedical solutions with precision, trust, and unmatched service quality."
          center
        />

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group rounded-[30px] border border-amber-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(251,191,36,0.25)]"
            >

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-zinc-900 transition-colors duration-300 group-hover:text-amber-700">
                {item.title}
              </h3>

              {/* Description */}
              <p className="leading-7 text-gray-600">
                {item.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500 group-hover:w-20" />

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}