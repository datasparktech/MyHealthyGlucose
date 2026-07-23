import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  seedDefaultProducts,
  type DbStoreProduct,
  type ProductInput,
} from "../lib/store";
import Reveal from "../components/Reveal";
import AdminNav from "../components/AdminNav";

const EMPTY: ProductInput = {
  name: "",
  category: "",
  description: "",
  us_price: "",
  us_url: "",
  us_retailer: "Amazon.com",
  in_price: "",
  in_url: "",
  in_retailer: "Amazon.in",
  active: true,
  sort_order: 0,
};

const inputCls =
  "w-full rounded-lg border border-line bg-bg-elevated/60 px-3 py-2 text-sm text-ink placeholder:text-muted-2 focus:border-teal-400/50 focus:outline-none";

export default function AdminStore() {
  const { configured } = useAuth();
  const [products, setProducts] = useState<DbStoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setProducts(await fetchAllProducts());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (configured) load();
    else setLoading(false);
  }, [configured]);

  function startEdit(p?: DbStoreProduct) {
    if (p) {
      setForm({
        name: p.name,
        category: p.category,
        description: p.description,
        us_price: p.us_price,
        us_url: p.us_url,
        us_retailer: p.us_retailer,
        in_price: p.in_price,
        in_url: p.in_url,
        in_retailer: p.in_retailer,
        active: p.active,
        sort_order: p.sort_order,
      });
      setEditingId(p.id);
    } else {
      setForm(EMPTY);
      setEditingId("new");
    }
  }

  async function save() {
    if (!form.name.trim()) return;
    setSaving(true);
    if (editingId === "new") {
      await createProduct({ ...form, sort_order: products.length });
    } else if (editingId) {
      await updateProduct(editingId, form);
    }
    setSaving(false);
    setEditingId(null);
    load();
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    await deleteProduct(id);
    load();
  }

  async function toggleActive(p: DbStoreProduct) {
    await updateProduct(p.id, { active: !p.active });
    load();
  }

  async function handleSeed() {
    if (!confirm("Add the 12 starter products to your catalog?")) return;
    setSeeding(true);
    await seedDefaultProducts();
    setSeeding(false);
    load();
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h1 className="font-display text-3xl font-semibold text-ink">Store Products</h1>
          <p className="mt-2 text-sm text-muted">
            Manage what appears on the public /store page — pricing, links, and per-country
            details. Changes go live immediately, no redeploy needed.
          </p>
        </Reveal>

        <AdminNav />

        {!configured ? (
          <p className="rounded-xl bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
            Store management needs the database connected first. Run{" "}
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
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">{products.length} product{products.length === 1 ? "" : "s"}</p>
              <div className="flex gap-2">
                {products.length === 0 && (
                  <button
                    onClick={handleSeed}
                    disabled={seeding}
                    className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-dim transition-colors hover:border-teal-400/40 hover:text-teal-300 disabled:opacity-50"
                  >
                    {seeding ? "Adding…" : "Add 12 starter products"}
                  </button>
                )}
                <button
                  onClick={() => startEdit()}
                  className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400"
                >
                  + Add product
                </button>
              </div>
            </div>

            {/* Edit/create form */}
            {editingId && (
              <div className="glass mt-4 rounded-2xl p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs text-muted">Product name</span>
                    <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs text-muted">Category</span>
                    <input className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Meters" />
                  </label>
                </div>
                <label className="mt-3 block">
                  <span className="mb-1 block text-xs text-muted">Description</span>
                  <textarea className={inputCls} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </label>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-bg-elevated/40 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">🇺🇸 United States</p>
                    <label className="block"><span className="mb-1 block text-xs text-muted">Price range</span>
                      <input className={inputCls} value={form.us_price} onChange={(e) => setForm({ ...form, us_price: e.target.value })} placeholder="$15 – $30" /></label>
                    <label className="mt-2 block"><span className="mb-1 block text-xs text-muted">Retailer</span>
                      <input className={inputCls} value={form.us_retailer} onChange={(e) => setForm({ ...form, us_retailer: e.target.value })} /></label>
                    <label className="mt-2 block"><span className="mb-1 block text-xs text-muted">Link (affiliate URL)</span>
                      <input className={inputCls} value={form.us_url} onChange={(e) => setForm({ ...form, us_url: e.target.value })} placeholder="https://amazon.com/..." /></label>
                  </div>
                  <div className="rounded-xl bg-bg-elevated/40 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">🇮🇳 India</p>
                    <label className="block"><span className="mb-1 block text-xs text-muted">Price range</span>
                      <input className={inputCls} value={form.in_price} onChange={(e) => setForm({ ...form, in_price: e.target.value })} placeholder="₹700 – ₹1,500" /></label>
                    <label className="mt-2 block"><span className="mb-1 block text-xs text-muted">Retailer</span>
                      <input className={inputCls} value={form.in_retailer} onChange={(e) => setForm({ ...form, in_retailer: e.target.value })} /></label>
                    <label className="mt-2 block"><span className="mb-1 block text-xs text-muted">Link (affiliate URL)</span>
                      <input className={inputCls} value={form.in_url} onChange={(e) => setForm({ ...form, in_url: e.target.value })} placeholder="https://amazon.in/..." /></label>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={save}
                    disabled={saving || !form.name.trim()}
                    className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105 hover:bg-teal-400 disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save product"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-dim hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Product list */}
            <div className="mt-6 space-y-2">
              {products.map((p) => (
                <div key={p.id} className={`glass flex items-center gap-4 rounded-xl p-4 ${!p.active ? "opacity-50" : ""}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{p.name}</p>
                      <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-300">{p.category}</span>
                      {!p.active && <span className="rounded-full bg-bg-elevated px-2 py-0.5 text-[10px] text-muted">Hidden</span>}
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      US: {p.us_price || "—"} · IN: {p.in_price || "—"}
                    </p>
                  </div>
                  <button onClick={() => toggleActive(p)} className="text-xs font-medium text-muted hover:text-ink">
                    {p.active ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => startEdit(p)} className="text-xs font-medium text-teal-300 hover:text-teal-200">
                    Edit
                  </button>
                  <button onClick={() => remove(p.id, p.name)} className="text-xs font-medium text-muted hover:text-orange-300">
                    Delete
                  </button>
                </div>
              ))}
              {products.length === 0 && (
                <p className="rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
                  No products yet — add one, or use the starter catalog above.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
