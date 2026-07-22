import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="MyHealthyGlucose" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-sm font-semibold text-ink">MyHealthyGlucose</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A diabetes care companion built by DataSpark Tech LLC — free where it matters, no ads, ever.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-dim">
              <li><Link to="/tools" className="hover:text-teal-300">Tools</Link></li>
              <li><Link to="/info" className="hover:text-teal-300">Info Hub</Link></li>
              <li><Link to="/blog" className="hover:text-teal-300">Blog</Link></li>
              <li><Link to="/community" className="hover:text-teal-300">Community</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-dim">
              <li><Link to="/about-app" className="hover:text-teal-300">About the App</Link></li>
              <li><Link to="/about-us" className="hover:text-teal-300">About Us</Link></li>
              <li>
                <Link to="/contact" className="hover:text-teal-300">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-dim">
              <li>
                <a href="https://myhealthyglucose.datasparktech.com/privacy-policy.html" className="hover:text-teal-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-line pt-6 text-xs text-muted-2">
        © {new Date().getFullYear()} DataSpark Tech LLC. MyHealthyGlucose is a personal tracking
        tool — it is not a medical device and does not diagnose, treat, or replace advice from a
        qualified healthcare professional.
      </div>
    </footer>
  );
}
