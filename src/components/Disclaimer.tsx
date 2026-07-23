import { useTranslation } from "react-i18next";

export default function Disclaimer({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <p
      className={`rounded-xl bg-orange-500/8 px-4 py-3 text-xs leading-relaxed text-muted ring-1 ring-orange-400/15 ${className}`}
    >
      <span className="font-semibold text-orange-300">{t("tools.disclaimer.label")}</span>{" "}
      {t("tools.disclaimer.body")}
    </p>
  );
}
