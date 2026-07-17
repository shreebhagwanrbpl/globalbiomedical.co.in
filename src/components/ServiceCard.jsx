import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-[30px] border border-amber-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(251,191,36,0.25)]">

      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-black via-zinc-900 to-amber-600 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-4 text-2xl font-bold text-zinc-900 transition-colors duration-300 group-hover:text-amber-700">
        {title}
      </h3>

      {/* Description */}
      <p className="leading-7 text-gray-600">
        {description}
      </p>

      {/* Bottom Accent Line */}
      <div className="mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500 group-hover:w-20" />

    </div>
  );
}