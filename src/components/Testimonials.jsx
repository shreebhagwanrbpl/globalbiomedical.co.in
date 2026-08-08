"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Specialist",
      review:
        "Global Biomedical has consistently delivered reliable diagnostic equipment with outstanding support.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Professional service, premium products, and excellent biomedical consultation experience.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "Their healthcare solutions improved our laboratory efficiency significantly.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">

      {/* Background Glow */}
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Trusted by healthcare professionals, laboratories, and biomedical institutions."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group rounded-[32px] border border-amber-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-amber-400 hover:shadow-[0_20px_60px_rgba(251,191,36,0.25)]"
            >

              {/* Stars */}
              <div className="mb-6 flex gap-1 text-2xl text-amber-500">
                ★★★★★
              </div>

              {/* Review */}
              <p className="leading-8 italic text-gray-600">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

              {/* User */}
              <div className="flex items-center gap-4">

                {/* Avatar */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-lg font-bold text-white shadow-lg">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-zinc-900 transition-colors duration-300 group-hover:text-amber-700">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.role}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}