"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FFFDF9] to-[#F8F4EC] py-28 lg:py-36">

      {/* Gold Glow */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-amber-400/15 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[140px]" />

      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_45%)]" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >

          {/* Premium Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-5 py-2 text-sm font-semibold text-amber-700 shadow-sm">
            Premium Biomedical Solutions
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-amber-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            {subtitle}
          </p>

          {/* Gold Divider */}
          <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />

        </motion.div>

      </div>

    </section>
  );
}