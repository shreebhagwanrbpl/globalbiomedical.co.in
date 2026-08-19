import Link from "next/link";

export default function SeoContent({ city = "" }) {
    const location = city || "India";

    const popularCategories = [
        { name: "Hematology Analyzers", slug: "hematology-analyzers" },
        { name: "Biochemistry Analyzers", slug: "biochemistry-analyzers" },
        { name: "Electrolyte Analyzers", slug: "electrolyte-analyzers" },
        { name: "Rapid Test Kits", slug: "rapid-test-kits" },
        { name: "ELISA Readers", slug: "elisa-readers" },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white">

            <div className="container-custom">

                {/* Heading */}
                <div className="mb-12">

                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-5 py-2 text-sm font-semibold text-amber-700">
                        Biomedical Solutions
                    </span>

                    <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight">
                        <span className="bg-gradient-to-r from-black via-zinc-800 to-amber-600 bg-clip-text text-transparent">
                            Biomedical Equipment Supplier in {location}
                        </span>
                    </h2>

                    <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />

                </div>

                {/* Content */}
                <div className="space-y-8 text-lg leading-8 text-gray-600">

                    <p>
                        Global Biomedical is a trusted supplier of biomedical and laboratory
                        equipment in <strong className="text-amber-700">{location}</strong>.
                        We provide CBC Machines, Hematology Analyzers, Biochemistry
                        Analyzers, Urine Analyzers, ELISA Readers, and diagnostic
                        instruments for hospitals, pathology labs, and healthcare facilities.
                    </p>

                    <p>
                        Our mission is to provide reliable, high-quality laboratory equipment
                        to healthcare professionals across India. We work with diagnostic
                        centres, hospitals, research laboratories, and medical institutions
                        to deliver advanced biomedical solutions.
                    </p>

                    <p>
                        We offer installation assistance, product guidance, and technical
                        support for a wide range of laboratory instruments. Whether you are
                        setting up a new diagnostic laboratory or upgrading existing
                        equipment, our team can help you select the right solution.
                    </p>

                    {/* Category Hub Links */}
                    <div className="my-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                            Popular Equipment Categories in {location}:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {popularCategories.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/category/${cat.slug}`}
                                    className="px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-slate-800 hover:bg-amber-500 hover:text-black transition"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <Link
                                href="/items"
                                className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-amber-500 hover:text-black transition"
                            >
                                View All Products →
                            </Link>
                        </div>
                    </div>

                    <p>
                        Global Biomedical supplies equipment across multiple districts and
                        cities, helping healthcare providers improve testing efficiency and
                        diagnostic accuracy.
                    </p>

                </div>

                {/* FAQ */}
                <div className="mt-20">

                    <div className="mb-10">

                        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-5 py-2 text-sm font-semibold text-amber-700">
                            FAQ
                        </span>

                        <h2 className="mt-5 text-4xl font-extrabold">
                            <span className="bg-gradient-to-r from-black to-amber-600 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </span>
                        </h2>

                        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />

                    </div>

                    <div className="grid gap-6">

                        {[
                            {
                                q: `Do you supply biomedical equipment in ${location}?`,
                                a: `Yes, we supply biomedical and laboratory equipment across ${location} and surrounding districts.`
                            },
                            {
                                q: "Which laboratory instruments do you provide?",
                                a: "We provide CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Urine Analyzers, and other diagnostic equipment."
                            },
                            {
                                q: "Do you provide installation support?",
                                a: "Yes, installation assistance and technical support are available depending on location and equipment type."
                            },
                            {
                                q: "Who can purchase biomedical equipment?",
                                a: "Hospitals, pathology labs, diagnostic centres, research laboratories, and healthcare facilities can purchase equipment from us."
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-amber-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-2xl"
                            >
                                <h3 className="text-xl font-bold text-zinc-900">
                                    {faq.q}
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    {faq.a}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}