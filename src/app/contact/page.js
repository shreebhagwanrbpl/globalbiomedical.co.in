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
  Search,
  Building2,
  Check,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

const popularDistricts = [
  { name: "Jaipur", state: "Rajasthan", address: "Amrapali, Vaishali Nagar, Jaipur, Rajasthan 302021" },
  { name: "Delhi", state: "Delhi", address: "Connaught Place, New Delhi, Delhi 110001" },
  { name: "Mumbai", state: "Maharashtra", address: "Andheri East, Mumbai, Maharashtra 400069" },
  { name: "Lucknow", state: "Uttar Pradesh", address: "Hazratganj, Lucknow, Uttar Pradesh 226001" },
  { name: "Chandigarh", state: "Chandigarh", address: "Sector 17, Chandigarh, Punjab 160017" },
  { name: "Ahmedabad", state: "Gujarat", address: "Ashram Road, Ahmedabad, Gujarat 380009" },
  { name: "Bengaluru", state: "Karnataka", address: "MG Road, Bengaluru, Karnataka 560001" },
  { name: "Hyderabad", state: "Telangana", address: "Banjara Hills, Hyderabad, Telangana 500034" },
  { name: "Kolkata", state: "West Bengal", address: "Park Street, Kolkata, West Bengal 700016" },
  { name: "Patna", state: "Bihar", address: "Exhibition Road, Patna, Bihar 800001" },
  { name: "Kanpur", state: "Uttar Pradesh", address: "Mall Road, Kanpur, Uttar Pradesh 208001" },
  { name: "Varanasi", state: "Uttar Pradesh", address: "Cantonment, Varanasi, Uttar Pradesh 221002" },
  { name: "Bhopal", state: "Madhya Pradesh", address: "MP Nagar, Bhopal, Madhya Pradesh 462011" },
  { name: "Indore", state: "Madhya Pradesh", address: "Vijay Nagar, Indore, Madhya Pradesh 452010" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Jaipur");
  const [districtSearch, setDistrictSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const urlDistrict = pathParts.length > 0 ? pathParts[0] : null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) return toast.error("Name is required");
    if (!emailRegex.test(form.email)) return toast.error("Enter valid email");
    if (!phoneRegex.test(form.phone)) return toast.error("Enter valid mobile number");
    if (!form.message.trim()) return toast.error("Message is required");

    try {
      setSubmitting(true);
      await addDoc(
        collection(db, "websitesQueries", "globalbiomedicalcoin", "contactQueries"),
        {
          ...form,
          district: selectedDistrict,
          createdAt: new Date(),
        }
      );

      toast.success("Message submitted successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadDistrict = async () => {
      if (!urlDistrict) return;
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalcoin", "districts", urlDistrict)
        );
        if (snap.exists()) {
          const data = snap.data();
          setDistrictData(data);
          if (data.district) {
            setSelectedDistrict(data.district);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadDistrict();
  }, [urlDistrict]);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalcoin", "pages", "contact")
        );
        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, []);

  const phone = contactInfo.find((x) => x.label === "Phone Number")?.value || "+91 9257984336 / +91 8529833535 / +91 9983301657";
  const email = contactInfo.find((x) => x.label === "Email Address")?.value || "info@globalbiomedical.co.in";
  const hours = contactInfo.find((x) => x.label === "Working Hours")?.value || "Mon - Sat: 9:00 AM - 7:00 PM";

  const selectedDistObj = popularDistricts.find(
    (d) => d.name.toLowerCase() === selectedDistrict.toLowerCase()
  );

  const displayAddress = selectedDistObj
    ? `${selectedDistObj.address}`
    : districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : `${selectedDistrict}, India`;

  const filteredDistricts = popularDistricts.filter(
    (d) =>
      d.name.toLowerCase().includes(districtSearch.toLowerCase()) ||
      d.state.toLowerCase().includes(districtSearch.toLowerCase())
  );

  if (loading) {
    return (
      <section className="section-padding bg-slate-900 min-h-screen text-white">
        <div className="container-custom">
          <div className="h-12 w-64 bg-slate-800 rounded animate-pulse mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="h-96 bg-slate-800 rounded-3xl animate-pulse" />
            <div className="h-96 bg-slate-800 rounded-3xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="Contact Global Biomedical"
        subtitle={`Reach out to our regional biomedical support and sales team in ${selectedDistrict} or across India.`}
      />

      {/* Main Contact & District Location Section */}
      <section className="relative overflow-hidden py-20 bg-slate-950 text-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[130px]" />

        <div className="container-custom relative z-10">
          {/* District Location Selector Bar */}
          <div className="mb-14 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Select Regional District / Branch
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                  <Building2 size={24} className="text-amber-400" />
                  <span>Biomedical Support Hub: {selectedDistrict}</span>
                </h3>
              </div>

              {/* District Search Box */}
              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search district or state..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Quick District Buttons */}
            <div className="flex flex-wrap gap-2.5 max-h-40 overflow-y-auto custom-scrollbar pt-2 border-t border-slate-800/80">
              {filteredDistricts.map((dist) => {
                const isSelected = dist.name.toLowerCase() === selectedDistrict.toLowerCase();
                return (
                  <button
                    key={dist.name}
                    onClick={() => setSelectedDistrict(dist.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/20 scale-105"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{dist.name}</span>
                    <span className="text-[10px] opacity-75">({dist.state})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400">
                <span>District Hub: {selectedDistrict}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Get In Touch With Our{" "}
                <span className="text-amber-400">{selectedDistrict}</span> Team
              </h2>

              <p className="text-slate-400 leading-relaxed text-base">
                Whether you need analyzer quotes, technical installation in {selectedDistrict}, or AMC service, our biomedical experts are ready to assist.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: <Phone size={22} />,
                    title: "Phone Number",
                    value: phone,
                    sub: "Call or WhatsApp for immediate enquiry",
                  },
                  {
                    icon: <Mail size={22} />,
                    title: "Email Address",
                    value: email,
                    sub: "Send official RFQs & purchase orders",
                  },
                  {
                    icon: <MapPin size={22} />,
                    title: `District Office (${selectedDistrict})`,
                    value: displayAddress,
                    sub: `Serving hospitals & diagnostic labs in ${selectedDistrict}`,
                  },
                  {
                    icon: <Clock3 size={22} />,
                    title: "Working Hours",
                    value: hours,
                    sub: "Emergency technical breakdown support available",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex items-start gap-4"
                  >
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{item.title}</h4>
                      <p className="text-amber-400 font-semibold text-sm mt-0.5">{item.value}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-slate-400 text-sm mb-8">
                Fill in your details below to receive a custom quote for {selectedDistrict}.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. lab@hospital.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Selected District
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {popularDistricts.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Subject / Product Requirement
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Quotation for Fully Automatic Blood Analyzer"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Please specify your lab requirements or equipment model..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-extrabold shadow-lg hover:shadow-[0_15px_35px_rgba(251,191,36,0.4)] transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? "Submitting Request..." : `Submit Enquiry for ${selectedDistrict}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Google Maps Location Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="container-custom">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Interactive District Map
              </span>
              <h3 className="text-2xl font-bold text-white">
                Global Biomedical Location: {selectedDistrict}
              </h3>
            </div>
            <p className="text-slate-400 text-xs">
              Showing Google Maps coordinates for {selectedDistrict}, India
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[450px]">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedDistrict + ", India"
              )}&z=12&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}