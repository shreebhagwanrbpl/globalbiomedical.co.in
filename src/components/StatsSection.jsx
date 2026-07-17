"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">

      {/* Background Glow */}
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        <div className="rounded-[40px] border border-amber-200 bg-white p-10 shadow-[0_20px_60px_rgba(251,191,36,0.15)] lg:p-16">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="group text-center"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {item.icon}
                </div>

                {/* Number */}
                <h3 className="bg-gradient-to-r from-black via-zinc-800 to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent lg:text-5xl">
                  {item.number}
                </h3>

                {/* Label */}
                <p className="mt-3 text-lg text-gray-600">
                  {item.label}
                </p>

                {/* Accent Line */}
                <div className="mx-auto mt-5 h-1 w-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500 group-hover:w-16" />

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}