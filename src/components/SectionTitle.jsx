export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""
        } max-w-3xl`}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-6 inline-flex items-center rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 px-5 py-2 text-sm font-semibold text-amber-600 backdrop-blur-sm">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl font-extrabold leading-tight text-zinc-900 lg:text-5xl">
        <span className="bg-gradient-to-r from-black via-zinc-800 to-amber-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {/* Divider */}
      <div
        className={`mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 ${center ? "mx-auto" : ""
          }`}
      />

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-gray-600">
        {description}
      </p>
    </div>
  );
}