export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-amber-50/30 to-white">

      {/* Background Glow */}
      <div className="absolute -top-16 left-0 h-72 w-72 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="text-center mb-12">

          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-5 py-2 text-sm font-semibold text-amber-700">
            Trusted Partners
          </span>

          <h2 className="mt-5 text-4xl font-extrabold">
            <span className="bg-gradient-to-r from-black via-zinc-800 to-amber-600 bg-clip-text text-transparent">
              Trusted by Healthcare & Biomedical Organizations
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />

        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (
            <div
              key={index}
              className="group flex h-28 items-center justify-center rounded-3xl border border-amber-200 bg-white px-6 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_15px_40px_rgba(251,191,36,0.25)]"
            >
              <span className="text-lg font-bold text-zinc-800 transition-colors duration-300 group-hover:text-amber-700">
                {brand}
              </span>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}