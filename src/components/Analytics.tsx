import { useEffect } from "react";

/**
 * Free, privacy-friendly, cookieless analytics via Cloudflare Web Analytics.
 * Activates only when VITE_CF_ANALYTICS_TOKEN is set.
 * No cookies, no personal data, no cookie banner required, and free.
 * If unset, this renders nothing and no script loads.
 */
export default function Analytics() {
  const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN as string | undefined;

  useEffect(() => {
    if (!token) return;
    if (document.querySelector("script[data-cf-beacon]")) return;
    const s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", JSON.stringify({ token }));
    document.head.appendChild(s);
  }, [token]);

  return null;
}
