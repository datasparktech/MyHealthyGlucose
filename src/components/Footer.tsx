import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto mb-12 max-w-7xl">
        <NewsletterSignup />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="MyHealthyGlucose" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-sm font-semibold text-ink">MyHealthyGlucose</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">{t("footer.explore")}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-dim">
              <li><Link to="/tools" className="hover:text-teal-300">{t("nav.tools")}</Link></li>
              <li><Link to="/info" className="hover:text-teal-300">{t("nav.infoHub")}</Link></li>
              <li><Link to="/blog" className="hover:text-teal-300">{t("nav.blog")}</Link></li>
              <li><Link to="/community" className="hover:text-teal-300">{t("nav.community")}</Link></li>
              <li><Link to="/store" className="hover:text-teal-300">{t("nav.store")}</Link></li>
              <li><Link to="/give" className="hover:text-teal-300">{t("nav.give")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-dim">
              <li><Link to="/features" className="hover:text-teal-300">{t("nav.features")}</Link></li>
              <li><Link to="/about-app" className="hover:text-teal-300">About the App</Link></li>
              <li><Link to="/about-us" className="hover:text-teal-300">About Us</Link></li>
              <li>
                <Link to="/contact" className="hover:text-teal-300">{t("nav.contact")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">{t("footer.legal")}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-dim">
              <li>
                <Link to="/legal/privacy" className="hover:text-teal-300">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="hover:text-teal-300">
                  {t("footer.termsOfUse")}
                </Link>
              </li>
              <li>
                <Link to="/legal/disclaimer" className="hover:text-teal-300">
                  {t("footer.medicalDisclaimer")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-line pt-6 text-xs text-muted-2">
        © {new Date().getFullYear()} DataSpark Tech LLC. {t("footer.rights")}
      </div>
    </footer>
  );
}
