"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Diagnostic Analyzers",
      description:
        "Advanced testing machines for blood work, chemistry panels, and routine health checks.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Lab Supply & Consumables",
      description:
        "Steady supply of quality reagents, control kits, and daily laboratory materials.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Preventive Care & Repair",
      description:
        "Regular health checkups for your equipment so your lab never faces unexpected delays.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Lab Setup Guidance",
      description:
        "Helpful advice on choosing the right instruments and setting up an efficient lab layout.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Title */}
        <SectionTitle
          badge="What We Offer"
          title="Complete Support For Your Pathology Lab"
          description="Everything you need under one roof — from buying new diagnostic machines to regular servicing and emergency support."
          center
        />

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}