import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Global Biomedical"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="container-custom relative z-10 grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative">

            <div className="flex h-[600px] items-center justify-center overflow-hidden rounded-[40px] border border-amber-200 bg-white p-10 shadow-[0_20px_60px_rgba(251,191,36,0.15)]">

              <Image
                src={DDS}
                alt="About"
                width={1200}
                height={900}
                className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
              />

            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 hidden rounded-[28px] border border-amber-200 bg-white p-6 shadow-2xl lg:block">

              <h3 className="bg-gradient-to-r from-black to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent">
                10+
              </h3>

              <p className="mt-2 text-gray-600">
                Years of Excellence
              </p>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 leading-8 text-gray-600">
              At <span className="font-semibold text-amber-700">Global Biomedical</span>,
              we are committed to delivering premium-quality healthcare and biomedical
              technologies designed to improve diagnostics, laboratory performance,
              and medical efficiency.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              Our mission is to empower healthcare professionals with trusted
              equipment, expert consultation, and innovative biomedical support.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="group rounded-3xl border border-amber-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_15px_40px_rgba(251,191,36,0.25)]">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-white shadow-lg">
                  ⭐
                </div>

                <h4 className="text-xl font-bold text-zinc-900 transition group-hover:text-amber-700">
                  Premium Equipment
                </h4>

                <p className="mt-3 leading-7 text-gray-600">
                  High-end diagnostic technologies with reliable performance and
                  long-term durability.
                </p>

              </div>

              <div className="group rounded-3xl border border-amber-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_15px_40px_rgba(251,191,36,0.25)]">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-white shadow-lg">
                  🛠️
                </div>

                <h4 className="text-xl font-bold text-zinc-900 transition group-hover:text-amber-700">
                  Expert Support
                </h4>

                <p className="mt-3 leading-7 text-gray-600">
                  Professional consultation, installation assistance, and trusted
                  after-sales biomedical support.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}