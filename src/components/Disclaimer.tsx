export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-xl bg-orange-500/8 px-4 py-3 text-xs leading-relaxed text-muted ring-1 ring-orange-400/15 ${className}`}
    >
      <span className="font-semibold text-orange-300">For education only.</span>{" "}
      These estimates are not medical advice and don&rsquo;t diagnose or treat any condition.
      Always talk to your doctor about your own numbers and treatment.
    </p>
  );
}
