import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchAllSettings, upsertSetting, KNOWN_SETTINGS } from "../lib/settings";
import Reveal from "../components/Reveal";
import AdminNav from "../components/AdminNav";

export default function AdminSettings() {
  const { configured } = useAuth();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    fetchAllSettings()
      .then((rows) => {
        const map: Record<string, string> = {};
        rows.forEach((r) => (map[r.key] = r.value));
        setValues(map);
      })
      .finally(() => setLoading(false));
  }, [configured]);

  async function save(key: string) {
    setSavingKey(key);
    await upsertSetting(key, values[key] ?? "");
    setSavingKey(null);
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 2000);
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h1 className="font-display text-3xl font-semibold text-ink">Site Settings</h1>
          <p className="mt-2 text-sm text-muted">
            Site-wide values editable without touching code or GitHub. Changes take effect
            immediately on the live site.
          </p>
        </Reveal>

        <AdminNav />

        {!configured ? (
          <p className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
            Settings need the database connected first. Run{" "}
            <code className="rounded bg-bg-elevated px-1.5 py-0.5">
              docs/supabase-schema-admin.sql
            </code>{" "}
            in Supabase, then refresh.
          </p>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
          </div>
        ) : (
          <div className="space-y-5">
            {KNOWN_SETTINGS.map((s) => (
              <div key={s.key} className="glass rounded-2xl p-6">
                <label className="block">
                  <span className="font-display text-sm font-semibold text-ink">{s.label}</span>
                  <p className="mt-0.5 text-xs text-muted">{s.hint}</p>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={values[s.key] ?? ""}
                      onChange={(e) => setValues({ ...values, [s.key]: e.target.value })}
                      placeholder="https://…"
                      className="flex-1 rounded-lg border border-line bg-bg-elevated/60 px-3 py-2 text-sm text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none"
                    />
                    <button
                      onClick={() => save(s.key)}
                      disabled={savingKey === s.key}
                      className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
                    >
                      {savingKey === s.key ? "Saving…" : savedKey === s.key ? "Saved ✓" : "Save"}
                    </button>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
