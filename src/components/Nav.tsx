import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.png";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();

  const links = [
    { to: "/newly-diagnosed", label: t("nav.startHere", { defaultValue: "Start Here" }) },
    { to: "/tools", label: t("nav.tools") },
    { to: "/foods", label: t("nav.foods", { defaultValue: "Foods" }) },
    { to: "/recipes", label: t("nav.recipes", { defaultValue: "Recipes" }) },
    { to: "/info", label: t("nav.infoHub") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/assistant", label: t("nav.askAI") },
    { to: "/community", label: t("nav.community") },
    { to: "/features", label: t("nav.features") },
    { to: "/store", label: t("nav.store") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "glass" : "bg-transparent"
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

        <div className="hidden items-center gap-6 lg:flex">
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

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher compact />
          </div>
          <Link
            to={user ? "/admin" : "/login"}
            className="hidden text-sm font-medium text-ink-dim transition-colors hover:text-teal-300 lg:inline-block"
          >
            {user ? t("nav.dashboard") : t("nav.login")}
          </Link>
          <a
            href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 sm:inline-block"
          >
            {t("nav.getApp")}
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="relative h-4 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-teal-500/10 text-teal-300"
                        : "text-ink-dim hover:bg-card-hover hover:text-ink"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href="https://play.google.com/store/apps/details?id=com.glucosecompass.app"
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full bg-teal-500 px-4 py-2.5 text-center text-sm font-semibold text-bg sm:hidden"
              >
                {t("nav.getApp")}
              </a>
              <Link
                to={user ? "/admin" : "/login"}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-dim transition-colors hover:bg-card-hover hover:text-ink"
              >
                {user ? t("nav.dashboard") : t("nav.teamLogin")}
              </Link>
              <div className="mt-1 border-t border-line px-3 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
