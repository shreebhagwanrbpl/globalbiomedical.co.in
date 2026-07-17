"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);
  const [contactInfo, setContactInfo] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);
  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const currentDistrict =
    pathParts.length > 0
      ? pathParts[0]
      : null;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error(
        "Name is required"
      );
    }

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Enter valid email"
      );
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error(
        "Enter valid mobile number"
      );
    }

    if (!form.message.trim()) {
      return toast.error(
        "Message is required"
      );
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "centralbiomedicals",
          "contactQueries"
        ),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success(
        "Message submitted successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            currentDistrict
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [currentDistrict]);
  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);



  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const hours =
    contactInfo.find(
      (x) => x.label === "Working Hours"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const mapAddress = encodeURIComponent(
    dynamicAddress
  );
  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-8" />

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
                />
              ))}
            </div>

            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
                />
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with Central Biomedicals for premium diagnostic and biomedical solutions."
      />

      {/* Contact Section */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-amber-50/30 to-white">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="container-custom relative z-10 grid gap-14 lg:grid-cols-2">

          {/* Left Info */}
          <div>

            <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-5 py-2 font-semibold text-amber-700">
              Contact Information
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-black via-zinc-800 to-amber-600 bg-clip-text text-transparent">
                Let's Start a Conversation
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Reach out to us for healthcare consultation,
              biomedical products, and advanced diagnostic support.
            </p>

            {/* Contact Cards */}
            <div className="mt-10 space-y-6">

              {[
                {
                  icon: <Phone size={24} />,
                  title: "Phone Number",
                  value: phone,
                },
                {
                  icon: <Mail size={24} />,
                  title: "Email Address",
                  value: email,
                },
                {
                  icon: <MapPin size={24} />,
                  title: "Office Address",
                  value: dynamicAddress,
                },
                {
                  icon: <Clock3 size={24} />,
                  title: "Working Hours",
                  value: hours,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 rounded-[30px] border border-amber-200 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-[0_15px_40px_rgba(251,191,36,0.25)]"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-white shadow-lg transition group-hover:scale-110">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-zinc-900">
                      {item.title}
                    </h4>

                    <p className="mt-2 leading-7 text-gray-600">
                      {item.value}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-[40px] border border-amber-200 bg-white p-8 shadow-[0_20px_60px_rgba(251,191,36,0.15)] lg:p-10">

            <h3 className="bg-gradient-to-r from-black to-amber-600 bg-clip-text text-3xl font-extrabold text-transparent">
              Send Us Message
            </h3>

            <p className="mt-3 text-gray-600">
              Fill out the form and our team will contact you soon.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-amber-200 bg-white px-5 py-4 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-amber-200 bg-white px-5 py-4 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full rounded-2xl border border-amber-200 bg-white px-5 py-4 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-2xl border border-amber-200 bg-white px-5 py-4 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />

              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-2xl border border-amber-200 bg-white px-5 py-4 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-black via-zinc-900 to-amber-600 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-400/40"
              >
                {submitting ? "Submitting..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">

            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}