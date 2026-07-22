import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ToolShell from "../../components/ToolShell";
import Disclaimer from "../../components/Disclaimer";
import {
  parseCGMCsv,
  computeStats,
  type GlucoseReading,
  type CGMStats,
} from "../../lib/cgmParser";

export default function CGMAnalyzer() {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [stats, setStats] = useState<CGMStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      const { readings, error } = parseCGMCsv(text);
      if (error) {
        setError(error);
        setReadings([]);
        setStats(null);
        return;
      }
      setReadings(readings);
      setStats(computeStats(readings));
    };
    reader.onerror = () => setError("Couldn't read that file.");
    reader.readAsText(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function reset() {
    setReadings([]);
    setStats(null);
    setError(null);
    setFileName("");
  }

  return (
    <ToolShell
      eyebrow="CGM Data Visualizer"
      title="See your 14-day glucose curve — instantly, privately."
      intro="Drop in the CSV export from your Dexcom, FreeStyle Libre, or Contour device and get an instant visual summary. Everything happens in your browser — your data never leaves your device or gets uploaded anywhere."
    >
      <div className="glass rounded-2xl p-6 sm:p-8">
        {!stats ? (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
                dragOver ? "border-teal-400/60 bg-teal-500/5" : "border-line hover:border-teal-400/40"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 text-2xl text-teal-300 ring-1 ring-teal-400/25">
                ↑
              </div>
              <p className="mt-4 font-display text-base font-semibold text-ink">
                Drop your CGM export here
              </p>
              <p className="mt-1 text-sm text-muted">or click to choose a .csv file</p>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200 ring-1 ring-orange-400/20">
                {error}
              </p>
            )}

            <div className="mt-6 rounded-xl bg-bg-elevated/40 px-4 py-3 text-sm leading-relaxed text-muted">
              <span className="font-semibold text-ink-dim">🔒 100% private.</span> Your file is read
              and analyzed entirely in your browser. Nothing is uploaded, stored, or sent to any
              server — including ours.
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink">{fileName}</p>
                <p className="text-xs text-muted">
                  {stats.count.toLocaleString()} readings over {stats.days} days
                </p>
              </div>
              <button
                onClick={reset}
                className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300"
              >
                New file
              </button>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Avg glucose" value={`${stats.avg}`} unit="mg/dL" />
              <Stat label="Est. A1C (GMI)" value={`${stats.gmi}`} unit="%" />
              <Stat label="Time in range" value={`${stats.timeInRange}`} unit="%" highlight />
              <Stat label="Range" value={`${stats.min}–${stats.max}`} unit="mg/dL" />
            </div>

            {/* Time in range bar */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-muted">Time in range breakdown</p>
              <div className="flex h-6 overflow-hidden rounded-full ring-1 ring-line">
                <div className="bg-orange-400/70" style={{ width: `${stats.timeBelow}%` }} title={`Below: ${stats.timeBelow}%`} />
                <div className="bg-teal-400/70" style={{ width: `${stats.timeInRange}%` }} title={`In range: ${stats.timeInRange}%`} />
                <div className="bg-orange-500/70" style={{ width: `${stats.timeAbove}%` }} title={`Above: ${stats.timeAbove}%`} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>Below 70: {stats.timeBelow}%</span>
                <span className="text-teal-300">In range: {stats.timeInRange}%</span>
                <span>Above 180: {stats.timeAbove}%</span>
              </div>
            </div>

            {/* Curve */}
            <div className="mt-8">
              <p className="mb-2 text-sm font-medium text-muted">Glucose curve</p>
              <GlucoseChart readings={readings} />
            </div>
          </motion.div>
        )}

        <Disclaimer className="mt-8" />
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-ink-dim">Where to find your export.</p>
        <p className="mt-2">
          Dexcom Clarity, FreeStyle LibreView, and most meter apps let you export or download your
          data as a CSV file. Look for &ldquo;Export&rdquo; or &ldquo;Download data.&rdquo; This
          tool reads mg/dL and mmol/L automatically.
        </p>
      </div>
    </ToolShell>
  );
}

function Stat({ label, value, unit, highlight }: { label: string; value: string; unit: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 text-center ring-1 ${highlight ? "bg-teal-500/10 ring-teal-400/25" : "bg-bg-elevated/50 ring-line"}`}>
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${highlight ? "text-teal-300" : "text-ink"}`}>{value}</p>
      <p className="text-[11px] text-muted">{unit}</p>
    </div>
  );
}

function GlucoseChart({ readings }: { readings: GlucoseReading[] }) {
  // Downsample to ~300 points for performance
  const step = Math.max(1, Math.floor(readings.length / 300));
  const points = readings.filter((_, i) => i % step === 0);
  const W = 700;
  const H = 220;
  const pad = 30;
  const minT = points[0].time.getTime();
  const maxT = points[points.length - 1].time.getTime();
  const spanT = maxT - minT || 1;
  const maxV = 300;
  const minV = 0;

  const x = (t: number) => pad + ((t - minT) / spanT) * (W - pad * 2);
  const y = (v: number) => H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2);

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.time.getTime()).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(" ");

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[500px]" style={{ height: "auto" }}>
        {/* target band 70-180 */}
        <rect x={pad} y={y(180)} width={W - pad * 2} height={y(70) - y(180)} fill="#2dd4bf" opacity="0.08" />
        <line x1={pad} y1={y(180)} x2={W - pad} y2={y(180)} stroke="#2dd4bf" strokeOpacity="0.3" strokeDasharray="4" />
        <line x1={pad} y1={y(70)} x2={W - pad} y2={y(70)} stroke="#2dd4bf" strokeOpacity="0.3" strokeDasharray="4" />
        {/* y labels */}
        {[70, 180, 300].map((v) => (
          <text key={v} x={4} y={y(v) + 4} fill="#8b95a5" fontSize="10">{v}</text>
        ))}
        {/* curve */}
        <path d={path} fill="none" stroke="url(#cgmgrad)" strokeWidth="1.5" strokeLinejoin="round" />
        <defs>
          <linearGradient id="cgmgrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
