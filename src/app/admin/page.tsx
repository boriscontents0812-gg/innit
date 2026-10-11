"use client";

import React, { useEffect, useState } from "react";
import { Lock, Shield, BarChart3, Package, DollarSign, MousePointerClick, RefreshCw, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AdminPage() {
  const { formatCurrency } = useApp();
  const [adminKey, setAdminKey] = useState("atelier_admin_secret_2026");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin", {
        headers: { "x-admin-key": key },
      });

      if (!res.ok) {
        throw new Error("Invalid admin credentials");
      }

      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
    } catch (e: any) {
      setError(e.message || "Unauthorized");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attempt auto-login with default admin key in development
    fetchAdminData(adminKey);
  }, []);

  const handleToggleStock = async (productId: string, currentStock: boolean) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          action: "toggle_product_stock",
          productId,
          inStock: !currentStock,
        }),
      });

      if (res.ok) {
        setData((prev: any) => ({
          ...prev,
          products: prev.products.map((p: any) =>
            p.id === productId ? { ...p, inStock: !currentStock } : p
          ),
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-charcoal-900 border border-luxury-border p-8 rounded-2xl max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-full bg-charcoal-800 border border-luxury-border flex items-center justify-center text-brass-400 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-bone-100 font-light mb-2">
            Curator Admin Suite
          </h2>
          <p className="text-xs text-bone-400 mb-6">
            Enter administrator secret key to access system metrics and catalog controls.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchAdminData(adminKey);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin Secret Key"
              className="w-full bg-charcoal-950 border border-luxury-border focus:border-brass-400 px-4 py-2.5 rounded-lg text-xs text-bone-100 outline-hidden"
            />
            {error && <div className="text-xs text-red-400">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bone-100 hover:bg-bone-200 text-obsidian py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-luxury-border">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brass-400 font-semibold mb-1">
            <Shield className="w-4 h-4" />
            <span>PROTECTED ADMINISTRATOR CONTROL</span>
          </div>
          <h1 className="font-serif text-3xl text-bone-100 font-light">
            Atelier Management Console
          </h1>
        </div>

        <button
          onClick={() => fetchAdminData(adminKey)}
          className="flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-750 text-bone-200 border border-luxury-border px-4 py-2 rounded-lg text-xs tracking-wider transition-colors self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-brass-400" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-charcoal-900 border border-luxury-border p-5 rounded-2xl">
          <div className="text-[10px] text-bone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Total Outfits Generated</span>
            <BarChart3 className="w-3.5 h-3.5 text-brass-400" />
          </div>
          <div className="font-serif text-3xl text-bone-100">
            {data?.metrics?.totalOutfits || 0}
          </div>
        </div>

        <div className="bg-charcoal-900 border border-luxury-border p-5 rounded-2xl">
          <div className="text-[10px] text-bone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Pro Subscriptions</span>
            <DollarSign className="w-3.5 h-3.5 text-brass-400" />
          </div>
          <div className="font-serif text-3xl text-bone-100">
            {data?.metrics?.activePurchasesCount || 0}
          </div>
        </div>

        <div className="bg-charcoal-900 border border-luxury-border p-5 rounded-2xl">
          <div className="text-[10px] text-bone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Total Revenue</span>
            <DollarSign className="w-3.5 h-3.5 text-brass-400" />
          </div>
          <div className="font-serif text-3xl text-bone-100">
            {formatCurrency(data?.metrics?.totalRevenueUsd || 0)}
          </div>
        </div>

        <div className="bg-charcoal-900 border border-luxury-border p-5 rounded-2xl">
          <div className="text-[10px] text-bone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Outbound Affiliate Clicks</span>
            <MousePointerClick className="w-3.5 h-3.5 text-brass-400" />
          </div>
          <div className="font-serif text-3xl text-bone-100">
            {data?.metrics?.totalAffiliateClicks || 0}
          </div>
        </div>
      </div>

      {/* Catalog Manager */}
      <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 mb-12">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-luxury-border/60">
          <div>
            <h3 className="font-serif text-2xl text-bone-100 font-light">
              Product Catalog Inventory ({data?.products?.length || 0} Items)
            </h3>
            <p className="text-xs text-bone-400 mt-1">
              Toggle live product stock or adjust retail pricing across verified merchant catalogs.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-luxury-border text-[10px] uppercase tracking-wider text-bone-500">
                <th className="pb-3">Piece</th>
                <th className="pb-3">Brand</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Retailer</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-border/40">
              {data?.products?.map((p: any) => (
                <tr key={p.id} className="hover:bg-charcoal-850/60 transition-colors">
                  <td className="py-3 font-medium text-bone-200">{p.name}</td>
                  <td className="py-3 text-brass-400">{p.brand}</td>
                  <td className="py-3 text-bone-400 capitalize">{p.category}</td>
                  <td className="py-3 text-bone-300">{p.retailer}</td>
                  <td className="py-3 font-mono">{formatCurrency(p.priceUsd)}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                        p.inStock
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800/40"
                          : "bg-red-950 text-red-300 border border-red-800/40"
                      }`}
                    >
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleToggleStock(p.id, p.inStock)}
                      className="bg-charcoal-800 hover:bg-charcoal-750 text-bone-300 hover:text-bone-100 border border-luxury-border px-3 py-1 rounded text-[10px] uppercase tracking-wider"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
