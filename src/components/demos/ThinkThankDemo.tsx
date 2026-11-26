"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { formatINR } from "@/lib/utils";
import {
  Store,
  LayoutDashboard,
  FileText,
  CreditCard,
  Package,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  Download,
} from "lucide-react";

interface ThinkProduct {
  id: string;
  name: string;
  brand: "Hikvision" | "CP Plus" | "Dahua" | "Western Digital";
  category: "Camera" | "NVR" | "Cabling" | "Storage";
  price: number;
  stock: number;
}

const initialProducts: ThinkProduct[] = [
  { id: "1", name: "Hikvision 2MP IP Bullet IR 30m", brand: "Hikvision", category: "Camera", price: 2150, stock: 24 },
  { id: "2", name: "CP Plus 4-Channel 1080p NVR", brand: "CP Plus", category: "NVR", price: 3800, stock: 12 },
  { id: "3", name: "WD Purple 2TB Surveillance Hard Drive", brand: "Western Digital", category: "Storage", price: 4600, stock: 8 },
  { id: "4", name: "Dahua 5MP Full-Color Dome Camera", brand: "Dahua", category: "Camera", price: 2850, stock: 15 },
  { id: "5", name: "Finolex 3+1 CCTV Coaxial Cable Reel (90m)", brand: "Hikvision", category: "Cabling", price: 1450, stock: 35 },
];

export const ThinkThankDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"storefront" | "admin" | "invoice">("storefront");
  const [products, setProducts] = useState<ThinkProduct[]>(initialProducts);
  const [cart, setCart] = useState<{ product: ThinkProduct; qty: number }[]>([]);
  const [paymentDone, setPaymentDone] = useState(false);

  const addToCart = (prod: ThinkProduct) => {
    soundEngine.playClick();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === prod.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product: prod, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const simulateCheckout = () => {
    soundEngine.playChime();
    setPaymentDone(true);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3D38] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab("storefront");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "storefront"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            <Store size={14} />
            <span>Storefront Catalog</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab("admin");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "admin"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Admin Operations Dashboard</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab("invoice");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "invoice"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            <FileText size={14} />
            <span>PDF Invoice Preview (pdfkit)</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#88847B]">
          Stack: Express.js + MongoDB + Razorpay + PM2 + AWS EC2
        </div>
      </div>

      {/* Tab 1: Storefront */}
      {activeTab === "storefront" && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
          {/* Product Grid */}
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-mono uppercase text-[#88847B]">
              CCTV & Security Hardware Inventory
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[#1A1A18] border border-[#3D3D38] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-[#E99B3D]">{p.brand}</span>
                      <span className="text-[#88847B]">Stock: {p.stock} units</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-[#F2EBDD]">
                      {p.name}
                    </h4>
                    <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#252522] text-[#D9D1C3]">
                      {p.category}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#3D3D38] flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#E99B3D]">
                      {formatINR(p.price)}
                    </span>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-1.5 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Razorpay Checkout */}
          <div className="lg:col-span-4 bg-[#1A1A18] border border-[#3D3D38] rounded-xl p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#3D3D38]">
                <span className="font-display font-bold text-sm text-[#F2EBDD]">
                  Checkout Cart ({cart.reduce((c, i) => c + i.qty, 0)})
                </span>
                <span className="text-xs font-mono text-[#E99B3D]">Razorpay Active</span>
              </div>

              {cart.length === 0 ? (
                <div className="text-xs text-[#88847B] font-mono text-center py-8">
                  Your cart is empty. Add products from the catalog.
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs font-mono p-2 rounded bg-[#252522]"
                    >
                      <div>
                        <div className="text-[#F2EBDD] truncate max-w-[140px]">
                          {item.product.name}
                        </div>
                        <div className="text-[#88847B]">
                          {item.qty} × {formatINR(item.product.price)}
                        </div>
                      </div>
                      <div className="text-[#E99B3D] font-bold">
                        {formatINR(item.product.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total & Checkout Button */}
            <div className="pt-4 border-t border-[#3D3D38] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#88847B]">Subtotal</span>
                <span className="text-[#F2EBDD]">{formatINR(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#88847B]">GST (18%)</span>
                <span className="text-[#F2EBDD]">{formatINR(cartTotal * 0.18)}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-sm font-bold border-t border-[#3D3D38] pt-2">
                <span className="text-[#F2EBDD]">Total</span>
                <span className="text-[#E99B3D]">{formatINR(cartTotal * 1.18)}</span>
              </div>

              {paymentDone ? (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs font-mono text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <CheckCircle size={14} />
                    <span>Razorpay Webhook Verified</span>
                  </div>
                  <div>Payment ID: pay_sim_9281a8c9</div>
                </div>
              ) : (
                <button
                  onClick={simulateCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-2.5 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  <CreditCard size={14} />
                  <span>Simulate Razorpay Payment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Admin Dashboard */}
      {activeTab === "admin" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Monthly Revenue</div>
              <div className="text-xl font-display font-bold text-[#E99B3D]">{formatINR(428900)}</div>
              <div className="text-[10px] font-mono text-emerald-400">+14% vs last month</div>
            </div>
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Total Orders</div>
              <div className="text-xl font-display font-bold text-[#F2EBDD]">142</div>
              <div className="text-[10px] font-mono text-[#88847B]">98% fulfillment rate</div>
            </div>
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Active SKUs</div>
              <div className="text-xl font-display font-bold text-[#F2EBDD]">48</div>
              <div className="text-[10px] font-mono text-[#E99B3D]">3 low-stock warnings</div>
            </div>
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Razorpay Status</div>
              <div className="text-xl font-display font-bold text-emerald-400">Live / Active</div>
              <div className="text-[10px] font-mono text-[#88847B]">Webhooks synced via Pabbly</div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-[#88847B]">
              Recent Order Reconciliations (Simulated)
            </div>
            <div className="overflow-x-auto rounded-xl border border-[#3D3D38]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#252522] text-[#D9D1C3] border-b border-[#3D3D38]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Equipment</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3D3D38]/50 text-[#A8A49C]">
                  <tr>
                    <td className="p-3 text-[#E99B3D]">#TT-9041</td>
                    <td className="p-3 text-[#F2EBDD]">Aparna Towers AMC</td>
                    <td className="p-3">8x Hikvision Bullet 4K</td>
                    <td className="p-3 font-bold text-[#F2EBDD]">{formatINR(38800)}</td>
                    <td className="p-3 text-emerald-400">Razorpay (Paid)</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Dispatched</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 text-[#E99B3D]">#TT-9042</td>
                    <td className="p-3 text-[#F2EBDD]">Kerala Bank Branch</td>
                    <td className="p-3">1x Dahua 8Ch NVR + 4TB HDD</td>
                    <td className="p-3 font-bold text-[#F2EBDD]">{formatINR(16300)}</td>
                    <td className="p-3 text-emerald-400">Razorpay (Paid)</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">Processing</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 text-[#E99B3D]">#TT-9043</td>
                    <td className="p-3 text-[#F2EBDD]">Metro Supermarket</td>
                    <td className="p-3">Finolex Cable 3 Reels</td>
                    <td className="p-3 font-bold text-[#F2EBDD]">{formatINR(4350)}</td>
                    <td className="p-3 text-[#D9D1C3]">COD</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">Pending Delivery</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PDF Invoice Preview */}
      {activeTab === "invoice" && (
        <div className="flex-1 bg-[#252522] rounded-xl border border-[#3D3D38] p-6 max-w-3xl mx-auto w-full overflow-y-auto space-y-6">
          <div className="p-8 rounded-xl bg-[#FAF6EF] text-[#252522] shadow-2xl space-y-6 font-sans">
            {/* Invoice Header */}
            <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-[#252522]">
                  THINKTHANK SECURITY STORE
                </h3>
                <div className="text-xs text-[#88847B] font-mono mt-0.5">
                  GSTIN: 32ABCDE1234F1Z5 // Thrissur, Kerala
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-1 rounded">
                  TAX INVOICE
                </span>
                <div className="text-xs text-[#88847B] font-mono mt-1">Invoice #: INV-2024-0891</div>
                <div className="text-xs text-[#88847B] font-mono">Date: 24 Nov 2026</div>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-bold text-[#88847B] uppercase font-mono text-[10px]">Billed To:</div>
                <div className="font-bold text-sm">Aparna Towers Residents Association</div>
                <div>West Fort Road, Thrissur, Kerala 680004</div>
                <div>Contact: +91 94471 20000</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#88847B] uppercase font-mono text-[10px]">Payment Method:</div>
                <div className="font-bold">Razorpay Online Webhook</div>
                <div>Transaction Ref: rzp_order_991823</div>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-xs text-left border-t border-b border-[#D9D1C3]">
              <thead>
                <tr className="border-b border-[#D9D1C3] font-mono text-[#88847B]">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">HSN/SAC</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DCCB]">
                <tr>
                  <td className="py-2 font-medium">Hikvision 4K UltraHD ColorVu Bullet Camera</td>
                  <td className="py-2 text-center font-mono">85258900</td>
                  <td className="py-2 text-center font-mono">4</td>
                  <td className="py-2 text-right font-mono">{formatINR(4850)}</td>
                  <td className="py-2 text-right font-mono font-bold">{formatINR(19400)}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Dahua 8-Channel 4K AI WizSense NVR</td>
                  <td className="py-2 text-center font-mono">85219090</td>
                  <td className="py-2 text-center font-mono">1</td>
                  <td className="py-2 text-right font-mono">{formatINR(8900)}</td>
                  <td className="py-2 text-right font-mono font-bold">{formatINR(8900)}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Seagate SkyHawk 4TB Surveillance Hard Drive</td>
                  <td className="py-2 text-center font-mono">84717020</td>
                  <td className="py-2 text-center font-mono">1</td>
                  <td className="py-2 text-right font-mono">{formatINR(7400)}</td>
                  <td className="py-2 text-right font-mono font-bold">{formatINR(7400)}</td>
                </tr>
              </tbody>
            </table>

            {/* Calculations */}
            <div className="flex justify-end">
              <div className="w-64 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Taxable Amount:</span>
                  <span>{formatINR(35700)}</span>
                </div>
                <div className="flex justify-between text-[#88847B]">
                  <span>CGST (9%):</span>
                  <span>{formatINR(3213)}</span>
                </div>
                <div className="flex justify-between text-[#88847B]">
                  <span>SGST (9%):</span>
                  <span>{formatINR(3213)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-[#252522] pt-2 text-[#252522]">
                  <span>Grand Total (INR):</span>
                  <span>{formatINR(42126)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9D1C3] text-[10px] text-[#88847B] font-mono flex items-center justify-between">
              <span>Generated on demand via Node.js pdfkit streaming engine</span>
              <span>Computer Generated Tax Invoice</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
