import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Reveal from "../components/Reveal";

export default function Login() {
  const { signIn, user, loading, configured } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to="/admin" replace />;

  async function handleSubmit() {
    setError(null);
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) setError(error);
    else navigate("/admin");
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-bg-elevated/60 px-4 py-3 text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

  return (
    <div className="flex min-h-[75vh] items-center px-6 py-16">
      <div className="mx-auto w-full max-w-md">
        <Reveal>
          <div className="glass rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Team access
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Sign in</h1>
            <p className="mt-2 text-sm text-muted">
              For MyHealthyGlucose team members managing the site.
            </p>

            {!configured && (
              <div className="mt-6 rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200 ring-1 ring-orange-400/20">
                Login isn&rsquo;t connected yet. Add the Supabase keys to enable it.
              </div>
            )}

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="you@datasparktech.com"
                  className={inputCls}
                  disabled={!configured}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted">Password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="••••••••"
                  className={inputCls}
                  disabled={!configured}
                />
              </label>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-orange-300"
                >
                  {error}
                </motion.p>
              )}

              <button
                onClick={handleSubmit}
                disabled={busy || !configured}
                className="w-full rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] hover:bg-teal-400 disabled:opacity-50 disabled:hover:scale-100"
              >
                {busy ? "Signing in…" : "Sign in"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
