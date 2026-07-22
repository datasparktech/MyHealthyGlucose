import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const links = [
  { to: "/tools", label: "Tools" },
  { to: "/info", label: "Info Hub" },
  { to: "/blog", label: "Blog" },
  { to: "/about-app", label: "About the App" },
  { to: "/about-us", label: "About Us" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="MyHealthyGlucose" className="h-9 w-9 rounded-xl" />
          <div className="leading-tight">
            <p className="font-display text-[15px] font-semibold text-ink">MyHealthyGlucose</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              Diabetes Care Companion
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-teal-300 ${
                  isActive ? "text-teal-300" : "text-ink-dim"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <a
          href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
        >
          Get the app
        </a>
      </nav>
    </motion.header>
  );
}
