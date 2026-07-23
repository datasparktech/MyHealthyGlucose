import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/admin", label: "Blog & Community", end: true },
  { to: "/admin/store", label: "Store Products" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  return (
    <div className="mb-10 flex flex-wrap gap-2 border-b border-line pb-4">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30"
                : "text-muted hover:text-ink"
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
