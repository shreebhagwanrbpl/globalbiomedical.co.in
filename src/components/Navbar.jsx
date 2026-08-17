"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-black backdrop-blur-xl">

      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link href={makeLink("/")} className="flex items-center gap-3 group">
          <div className="relative h-13 w-13 rounded-full overflow-hidden border border-amber-500/40 bg-white p-1 shadow-lg group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300">
            <img
              src="/logo.png"
              alt="Global Biomedical Inc. Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
              <span className="text-amber-400">Global</span>{" "}
              <span className="text-white">Biomedical</span>
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-semibold mt-0.5">
              Right Here, You Have An Option
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="
            relative
            !text-white
            font-medium
            text-[16px]
            transition-all
            duration-300
            hover:!text-amber-400

            after:absolute
            after:left-0
            after:-bottom-2
            after:h-[2px]
            after:w-0
            after:bg-gradient-to-r
            after:from-amber-400
            after:to-yellow-500
            after:transition-all
            after:duration-300

            hover:after:w-full
          "
            >
              {link.name}
            </Link>

          ))}

        </nav>

        {/* Button */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button
              className="
            rounded-xl
            bg-gradient-to-r
            from-amber-500
            via-yellow-500
            to-amber-600
            px-7
            py-3
            font-semibold
            text-black
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_15px_35px_rgba(251,191,36,0.45)]
          "
            >
              Get Quote
            </button>

          </Link>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white hover:text-amber-400 transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[450px]" : "max-h-0"
          }`}
      >

        <div className="bg-zinc-950 border-t border-amber-500/20 p-6">

          <nav className="flex flex-col gap-6">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="!text-white hover:!text-amber-400 font-medium transition"
              >
                {link.name}
              </Link>

            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >

              <button
                className="
              mt-2
              w-full
              rounded-xl
              bg-gradient-to-r
              from-amber-500
              via-yellow-500
              to-amber-600
              py-3
              font-semibold
              text-black
              transition-all
              hover:shadow-[0_15px_35px_rgba(251,191,36,0.45)]
            "
              >
                Get Quote
              </button>

            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}