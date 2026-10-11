"use client";

import React, { useEffect, useState } from "react";
import {
  Lock,
  Shield,
  BarChart3,
  Package,
  DollarSign,
  MousePointerClick,
  RefreshCw,
  Check,
  ShoppingBag,
  Link2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AdminPage() {
  const { formatCurrency } = useApp();
  const [adminKey, setAdminKey] = useState("atelier_admin_secret_2026");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Shopify sync state
  const [syncingShopify, setSyncingShopify] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [testingCart, setTestingCart] = useState(false);
  const [cartResult, setCartResult] = useState<{ success?: boolean; checkoutUrl?: string; error?: string } | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

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

  const handleSyncShopify = async () => {
    setSyncingShopify(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/shopify/products?sync=true");
      const json = await res.json();
      if (res.ok) {
        setSyncResult({
          success: true,
          message: `Successfully synchronized ${json.productsCount || 0} products from Shopify into catalog.`,
        });
        fetchAdminData(adminKey);
      } else {
        setSyncResult({
          success: false,
          message: json.error || "Failed to sync Shopify products.",
        });
      }
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: err.message || "Network error while syncing Shopify products.",
      });
    } finally {
      setSyncingShopify(false);
    }
  };

  const handleTestCart = async () => {
    setTestingCart(true);
    setCartResult(null);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: [] }),
      });
      const json = await res.json();
      if (res.ok && json.checkoutUrl) {
        setCartResult({
          success: true,
          checkoutUrl: json.checkoutUrl,
        });
      } else {
        setCartResult({
          success: false,
          error: json.error || "Failed to create cart checkout.",
        });
      }
    } catch (err: any) {
      setCartResult({
        success: false,
        error: err.message || "Network error during cart test.",
      });
    } finally {
      setTestingCart(false);
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
            innit Management Console
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

      {/* Shopify Integration Suite */}
      <div className="bg-charcoal-900 border border-luxury-border rounded-2xl p-6 sm:p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brass-500/5 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-luxury-border/60">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-charcoal-800 border border-luxury-border flex items-center justify-center text-brass-400 shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-2xl text-bone-100 font-light">
                  Shopify Storefront & Cart Connection
                </h3>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${
                    data?.shopify?.isConfigured
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-800/50"
                      : "bg-brass-950/80 text-brass-300 border-brass-800/50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      data?.shopify?.isConfigured ? "bg-emerald-400 animate-pulse" : "bg-brass-400"
                    }`}
                  />
                  {data?.shopify?.isConfigured ? "Connected (Storefront API Active)" : "Configured Domain (Simulated Sandbox)"}
                </span>
              </div>
              <p className="text-xs text-bone-400 mt-1">
                Connected to store: <span className="text-bone-200 font-mono font-medium">{data?.shopify?.domain || "deadly-ponies-nz.myshopify.com"}</span> • GraphQL API: <span className="font-mono text-bone-300">{data?.shopify?.apiVersion || "2024-07"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={handleSyncShopify}
              disabled={syncingShopify}
              className="flex items-center gap-2 bg-brass-500 hover:bg-brass-400 text-obsidian px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingShopify ? "animate-spin" : ""}`} />
              <span>{syncingShopify ? "Syncing..." : "Sync Products"}</span>
            </button>
            <button
              onClick={handleTestCart}
              disabled={testingCart}
              className="flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-750 text-bone-200 border border-luxury-border px-4 py-2 rounded-lg text-xs tracking-wider transition-colors disabled:opacity-50"
            >
              <Link2 className="w-3.5 h-3.5 text-brass-400" />
              <span>{testingCart ? "Testing..." : "Test Cart Creation"}</span>
            </button>
          </div>
        </div>

        {/* Sync feedback */}
        {syncResult && (
          <div
            className={`p-3.5 rounded-xl text-xs mb-4 flex items-center gap-2.5 ${
              syncResult.success
                ? "bg-emerald-950/40 text-emerald-200 border border-emerald-800/40"
                : "bg-red-950/40 text-red-200 border border-red-800/40"
            }`}
          >
            {syncResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{syncResult.message}</span>
          </div>
        )}

        {/* Cart test feedback */}
        {cartResult && (
          <div
            className={`p-3.5 rounded-xl text-xs mb-4 flex items-center justify-between gap-3 ${
              cartResult.success
                ? "bg-emerald-950/40 text-emerald-200 border border-emerald-800/40"
                : "bg-red-950/40 text-red-200 border border-red-800/40"
            }`}
          >
            <div className="flex items-center gap-2">
              {cartResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>
                {cartResult.success
                  ? "Cart created successfully! Ready for 1-click checkout."
                  : `Cart test error: ${cartResult.error}`}
              </span>
            </div>
            {cartResult.checkoutUrl && (
              <a
                href={cartResult.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brass-400 hover:text-brass-300 font-medium underline"
              >
                <span>Open Checkout</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* Collapsible Setup Guide */}
        <div className="border border-luxury-border/50 rounded-xl bg-charcoal-950/60 overflow-hidden">
          <button
            onClick={() => setShowSetupGuide(!showSetupGuide)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs text-bone-300 hover:text-bone-100 transition-colors"
          >
            <span className="font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brass-400" />
              How to Connect Any Custom Shopify Store (Step-by-Step)
            </span>
            {showSetupGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showSetupGuide && (
            <div className="p-4 pt-1 border-t border-luxury-border/40 text-xs text-bone-400 space-y-3 font-sans leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-charcoal-900/80 p-3.5 rounded-lg border border-luxury-border/40">
                  <div className="text-brass-400 font-semibold mb-1">1. Create Custom App</div>
                  <p className="text-[11px] text-bone-400">
                    In your Shopify Admin, go to <strong className="text-bone-200">Settings &gt; Apps and sales channels &gt; Develop apps</strong> and click <strong className="text-bone-200">Create an app</strong> named "innit AI Stylist".
                  </p>
                </div>
                <div className="bg-charcoal-900/80 p-3.5 rounded-lg border border-luxury-border/40">
                  <div className="text-brass-400 font-semibold mb-1">2. Enable Storefront Scopes</div>
                  <p className="text-[11px] text-bone-400">
                    Under <strong className="text-bone-200">Storefront API configuration</strong>, check:
                    <br />
                    • <code className="text-bone-300">unauthenticated_read_product_listings</code>
                    <br />
                    • <code className="text-bone-300">unauthenticated_write_checkouts</code>
                    <br />
                    • <code className="text-bone-300">unauthenticated_read_product_inventory</code>
                  </p>
                </div>
                <div className="bg-charcoal-900/80 p-3.5 rounded-lg border border-luxury-border/40">
                  <div className="text-brass-400 font-semibold mb-1">3. Install & Copy Token</div>
                  <p className="text-[11px] text-bone-400">
                    Click <strong className="text-bone-200">Install app</strong> and copy the generated <strong className="text-bone-200">Storefront API access token</strong>. Place it into <code className="text-bone-300">.env</code> along with your store domain:
                    <br />
                    <code className="text-[10px] text-brass-400 block mt-1">SHOPIFY_STORE_DOMAIN=your-store.myshopify.com</code>
                    <code className="text-[10px] text-brass-400 block">SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_...</code>
                  </p>
                </div>
              </div>
            </div>
          )}
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
