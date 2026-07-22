import { useEffect } from "react";

/**
 * Privacy-friendly, cookieless analytics via Plausible.
 * Activates only when VITE_PLAUSIBLE_DOMAIN is set (e.g. "myhealthyglucose.com").
 * No cookies, no personal data, no cookie banner required.
 * If unset, this renders nothing and no script loads.
 */
export default function Analytics() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

  useEffect(() => {
    if (!domain) return;
    if (document.querySelector("script[data-plausible]")) return;
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", domain);
    s.setAttribute("data-plausible", "true");
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }, [domain]);

  return null;
}
