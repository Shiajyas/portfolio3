"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import { formatINR } from "@/lib/utils";
import { useGameStore } from "@/stores/gameStore";
import {
  LayoutDashboard,
  Package,
  Users,
  FileSpreadsheet,
  FileCheck,
  Wrench,
  BarChart3,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Printer,
  Sparkles,
} from "lucide-react";

interface ERPProduct {
  id: string;
  name: string;
  hsn: string;
  category: "Cameras" | "NVRs" | "Cables" | "Accessories";
  price: number;
  stock: number;
  minThreshold: number;
}

const initialInventory: ERPProduct[] = [
  { id: "p1", name: "Hikvision 4K 8MP ColorVu Bullet", hsn: "85258900", category: "Cameras", price: 4850, stock: 18, minThreshold: 5 },
  { id: "p2", name: "CP Plus 5MP Starlight Dome IP", hsn: "85258900", category: "Cameras", price: 2650, stock: 4, minThreshold: 8 },
  { id: "p3", name: "Dahua 16-Channel 4K AI NVR", hsn: "85219090", category: "NVRs", price: 12400, stock: 7, minThreshold: 3 },
  { id: "p4", name: "Finolex 3+1 CCTV Cable Roll (90m)", hsn: "85444990", category: "Cables", price: 1450, stock: 22, minThreshold: 10 },
  { id: "p5", name: "12V 10A 8-Channel SMPS Power Supply", hsn: "85044090", category: "Accessories", price: 1100, stock: 14, minThreshold: 6 },
  { id: "p6", name: "Seagate SkyHawk 4TB Surveillance HDD", hsn: "84717020", category: "Accessories", price: 7400, stock: 9, minThreshold: 4 },
];

interface ERPCustomer {
  id: string;
  name: string;
  type: "Commercial" | "Residential" | "Institution";
  location: string;
  amcStatus: "Active" | "Expired" | "None";
  activeCameras: number;
}

const initialCustomers: ERPCustomer[] = [
  { id: "c1", name: "Sobha City Retail Arcade", type: "Commercial", location: "Puzhakkal, Thrissur", amcStatus: "Active", activeCameras: 32 },
  { id: "c2", name: "Sreekrishna Higher Secondary School", type: "Institution", location: "Guruvayoor", amcStatus: "Active", activeCameras: 24 },
  { id: "c3", name: "Skyline Palm Grove Apartments", type: "Residential", location: "Ayyanthole, Thrissur", amcStatus: "Active", activeCameras: 16 },
  { id: "c4", name: "Kalyan Textiles Showroom", type: "Commercial", location: "Round South, Thrissur", amcStatus: "Expired", activeCameras: 20 },
];

interface QuoteItem {
  productId: string;
  qty: number;
}

export const ERPDemo: React.FC = () => {
  const [activeModule, setActiveModule] = useState<
    "dashboard" | "inventory" | "customers" | "quotation" | "invoice" | "service" | "reports"
  >("dashboard");

  const [inventory, setInventory] = useState<ERPProduct[]>(initialInventory);
  const [customers] = useState<ERPCustomer[]>(initialCustomers);

  // Quotation Builder State
  const [quoteCustomer, setQuoteCustomer] = useState<string>("c1");
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { productId: "p1", qty: 4 },
    { productId: "p3", qty: 1 },
    { productId: "p6", qty: 1 },
    { productId: "p4", qty: 2 },
  ]);
  const [laborCharge, setLaborCharge] = useState<number>(3500);
  const [quoteGenerated, setQuoteGenerated] = useState<boolean>(false);

  // Service ticket sample
  const [serviceStatus, setServiceStatus] = useState<"Completed" | "Pending" | "Return Visit Required">("Completed");
  const [serviceType, setServiceType] = useState<"AMC" | "Normal" | "Warranty" | "Installation">("AMC");

  // Game store to unlock ERP achievement
  const { achievements } = useGameStore();

  const addQuoteItem = () => {
    soundEngine.playClick();
    setQuoteItems([...quoteItems, { productId: "p5", qty: 1 }]);
  };

  const removeQuoteItem = (index: number) => {
    soundEngine.playClick();
    setQuoteItems(quoteItems.filter((_, idx) => idx !== index));
  };

  const updateQuoteItem = (index: number, productId: string, qty: number) => {
    const updated = [...quoteItems];
    updated[index] = { productId, qty: Math.max(1, qty) };
    setQuoteItems(updated);
  };

  // Calculations for quotation
  const subtotal = quoteItems.reduce((sum, item) => {
    const prod = inventory.find((p) => p.id === item.productId);
    return sum + (prod ? prod.price * item.qty : 0);
  }, 0);

  const taxableAmount = subtotal + laborCharge;
  const gstAmount = taxableAmount * 0.18;
  const grandTotal = taxableAmount + gstAmount;

  const handleGenerateQuote = () => {
    soundEngine.playChime();
    setQuoteGenerated(true);

    // Trigger achievement if not unlocked
    const ach = achievements.find((a) => a.id === "erp-architect");
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Top ERP Navigation Bar */}
      <div className="bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E99B3D] text-[#121211] font-mono font-bold flex items-center justify-center text-xs">
            JS
          </div>
          <div>
            <div className="text-xs font-display font-bold text-[#F2EBDD]">
              JS INFORMATICS ERP PLATFORM
            </div>
            <div className="text-[10px] font-mono text-[#E99B3D]">
              Connecting Technology. Protecting What Matters.
            </div>
          </div>
        </div>

        {/* 7 Modules Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "inventory", label: "Inventory", icon: Package },
            { id: "customers", label: "Customers", icon: Users },
            { id: "quotation", label: "Quotation Builder", icon: FileSpreadsheet },
            { id: "invoice", label: "GST Invoice", icon: FileCheck },
            { id: "service", label: "Service Reports", icon: Wrench },
            { id: "reports", label: "Analytics", icon: BarChart3 },
          ].map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveModule(mod.id as any);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? "bg-[#E99B3D] text-[#121211] font-bold shadow-md"
                    : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD] hover:bg-[#33332E]"
                }`}
              >
                <Icon size={13} />
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODULE 1: DASHBOARD */}
      {activeModule === "dashboard" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          {/* Executive Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Monthly Revenue (INR)</div>
              <div className="text-2xl font-display font-bold text-[#E99B3D]">{formatINR(485600)}</div>
              <div className="text-[10px] font-mono text-emerald-400">+18.4% vs previous month</div>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Active AMC Contracts</div>
              <div className="text-2xl font-display font-bold text-[#F2EBDD]">28 Sites</div>
              <div className="text-[10px] font-mono text-[#D9D1C3]">3 due for renewal this month</div>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Pending Service Calls</div>
              <div className="text-2xl font-display font-bold text-amber-400">4 Tickets</div>
              <div className="text-[10px] font-mono text-[#88847B]">2 assigned to technicians</div>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Inventory Alerts</div>
              <div className="text-2xl font-display font-bold text-rose-400">1 Item Low</div>
              <div className="text-[10px] font-mono text-rose-400">CP Plus Dome below threshold</div>
            </div>
          </div>

          {/* Quick Action Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-3">
              <div className="flex items-center justify-between border-b border-[#3D3D38] pb-3">
                <span className="font-display font-bold text-sm text-[#F2EBDD]">
                  Recent Closed Quotations
                </span>
                <span className="text-xs font-mono text-[#E99B3D]">View All</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-[#1A1A18]">
                  <div>
                    <div className="text-[#F2EBDD]">Sobha City Retail Arcade (32 IP Cams)</div>
                    <div className="text-[#88847B]">Quote #JS-2024-Q109 // Thrissur</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#E99B3D] font-bold">{formatINR(142000)}</div>
                    <span className="text-[10px] text-emerald-400">Approved</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#1A1A18]">
                  <div>
                    <div className="text-[#F2EBDD]">Skyline Palm Grove (Perimeter Array)</div>
                    <div className="text-[#88847B]">Quote #JS-2024-Q108 // Ayyanthole</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#E99B3D] font-bold">{formatINR(68500)}</div>
                    <span className="text-[10px] text-blue-400">Invoiced</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-3">
              <div className="flex items-center justify-between border-b border-[#3D3D38] pb-3">
                <span className="font-display font-bold text-sm text-[#F2EBDD]">
                  Operational AMC Coverage
                </span>
                <span className="text-xs font-mono text-emerald-400">96.8% Uptime</span>
              </div>
              <div className="space-y-3 text-xs">
                <p className="text-[#88847B]">
                  Domain-tailored workflow for surveillance contractors: track routine camera lens cleaning, NVR firmware updates, hard disk health, and cable continuity across Thrissur commercial accounts.
                </p>
                <div className="p-3 rounded-lg bg-[#121211] border border-[#3D3D38] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#D9D1C3]">Current Active Sites:</span>
                  <span className="text-[#E99B3D] font-bold">28 Commercial Accounts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: INVENTORY */}
      {activeModule === "inventory" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-4 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#F2EBDD]">
                Security Hardware & ELV Inventory
              </h3>
              <p className="text-xs font-mono text-[#88847B]">
                Track camera units, NVR recorders, coaxial reels, connectors, and power units.
              </p>
            </div>
            <div className="text-xs font-mono text-[#E99B3D]">
              Real-time stock alerts enabled
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#3D3D38]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#252522] text-[#D9D1C3] border-b border-[#3D3D38]">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">HSN Code</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Unit Price (INR)</th>
                  <th className="p-3">Stock On Hand</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3D3D38]/50 text-[#A8A49C]">
                {inventory.map((item) => {
                  const isLow = item.stock <= item.minThreshold;
                  return (
                    <tr key={item.id} className="hover:bg-[#20201D]">
                      <td className="p-3 font-medium text-[#F2EBDD]">{item.name}</td>
                      <td className="p-3 text-[#88847B]">{item.hsn}</td>
                      <td className="p-3 text-[#D9D1C3]">{item.category}</td>
                      <td className="p-3 font-bold text-[#E99B3D]">{formatINR(item.price)}</td>
                      <td className="p-3">{item.stock} units</td>
                      <td className="p-3">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 bg-rose-950/40 border border-rose-500/40 px-2 py-0.5 rounded">
                            <AlertTriangle size={10} /> Low Stock (Reorder)
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2 py-0.5 rounded">
                            Healthy Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: CUSTOMERS */}
      {activeModule === "customers" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[#F2EBDD]">
              Customer & Commercial Account Directory
            </h3>
            <span className="text-xs font-mono text-[#88847B]">
              Total Accounts: {customers.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customers.map((cust) => (
              <div
                key={cust.id}
                className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#F2EBDD]">
                      {cust.name}
                    </h4>
                    <div className="text-xs font-mono text-[#88847B] mt-0.5">
                      {cust.location}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      cust.amcStatus === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    AMC: {cust.amcStatus}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#3D3D38] flex items-center justify-between text-xs font-mono text-[#A8A49C]">
                  <span>Account Type: {cust.type}</span>
                  <span className="text-[#E99B3D] font-bold">
                    {cust.activeCameras} Surveillance Points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: QUOTATION BUILDER */}
      {activeModule === "quotation" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3D38] pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-[#F2EBDD]">
                Interactive Quotation Generator (with 18% Indian GST)
              </h3>
              <p className="text-xs font-mono text-[#88847B]">
                Configure items, labor charges, and calculate taxable amount and GST breakdown.
              </p>
            </div>

            <button
              onClick={addQuoteItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252522] hover:bg-[#33332E] border border-[#3D3D38] text-xs font-mono text-[#E99B3D]"
            >
              <Plus size={13} />
              <span>Add Line Item</span>
            </button>
          </div>

          {/* Select Customer */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#88847B]">Select Client:</span>
            <select
              value={quoteCustomer}
              onChange={(e) => setQuoteCustomer(e.target.value)}
              className="bg-[#252522] border border-[#3D3D38] text-[#F2EBDD] rounded-lg px-3 py-1.5 text-xs font-mono focus:border-[#E99B3D] outline-none"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.location})
                </option>
              ))}
            </select>
          </div>

          {/* Line Items Table */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-[#88847B]">
              Equipment Bill of Materials (BOM)
            </div>
            <div className="space-y-2">
              {quoteItems.map((item, idx) => {
                const prod = inventory.find((p) => p.id === item.productId) || inventory[0];
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#252522] border border-[#3D3D38] flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
                  >
                    <select
                      value={item.productId}
                      onChange={(e) => updateQuoteItem(idx, e.target.value, item.qty)}
                      className="bg-[#1A1A18] border border-[#3D3D38] text-[#F2EBDD] rounded px-2 py-1 text-xs outline-none max-w-xs"
                    >
                      {inventory.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({formatINR(p.price)})
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2">
                      <span className="text-[#88847B]">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateQuoteItem(idx, item.productId, parseInt(e.target.value) || 1)}
                        className="w-16 bg-[#1A1A18] border border-[#3D3D38] text-[#F2EBDD] rounded px-2 py-1 text-xs text-center"
                      />
                    </div>

                    <div className="text-[#E99B3D] font-bold w-24 text-right">
                      {formatINR(prod.price * item.qty)}
                    </div>

                    <button
                      onClick={() => removeQuoteItem(idx)}
                      disabled={quoteItems.length <= 1}
                      className="p-1 rounded bg-[#1A1A18] text-[#88847B] hover:text-rose-400 disabled:opacity-30"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Labor & Calculations Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#3D3D38]">
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-3">
              <div className="text-xs font-mono uppercase text-[#88847B]">
                Installation & Labor Charges
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#D9D1C3]">Wiring & Setup (INR):</span>
                <input
                  type="number"
                  value={laborCharge}
                  onChange={(e) => setLaborCharge(parseInt(e.target.value) || 0)}
                  className="bg-[#1A1A18] border border-[#3D3D38] rounded px-3 py-1.5 text-xs text-[#F2EBDD] font-mono w-32"
                />
              </div>
              <p className="text-[11px] text-[#88847B]">
                Includes structured cabling, camera mounting, NVR IP configuration, and mobile remote streaming setup.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#88847B]">Equipment Subtotal:</span>
                <span className="text-[#F2EBDD]">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#88847B]">Labor & Installation:</span>
                <span className="text-[#F2EBDD]">{formatINR(laborCharge)}</span>
              </div>
              <div className="flex justify-between border-t border-[#3D3D38] pt-1">
                <span className="text-[#D9D1C3]">Taxable Value:</span>
                <span className="text-[#F2EBDD]">{formatINR(taxableAmount)}</span>
              </div>
              <div className="flex justify-between text-[#E99B3D]">
                <span>GST (18% Total: CGST 9% + SGST 9%):</span>
                <span>{formatINR(gstAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-[#3D3D38] pt-2 text-[#F2EBDD]">
                <span>Grand Total (INR):</span>
                <span className="text-[#E99B3D]">{formatINR(grandTotal)}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerateQuote}
                  className="w-full py-2.5 rounded-lg bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileCheck size={14} />
                  <span>Generate Quotation & Preview Invoice</span>
                </button>
              </div>
            </div>
          </div>

          {quoteGenerated && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between text-xs font-mono text-emerald-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Quotation #JS-Q2026-908 Generated Successfully!</span>
              </div>
              <button
                onClick={() => setActiveModule("invoice")}
                className="px-3 py-1 rounded bg-emerald-500 text-[#121211] font-bold"
              >
                Inspect GST Invoice &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODULE 5: GST INVOICE PREVIEW */}
      {activeModule === "invoice" && (
        <div className="flex-1 bg-[#252522] rounded-xl border border-[#3D3D38] p-6 max-w-4xl mx-auto w-full overflow-y-auto space-y-4">
          <div className="p-8 rounded-xl bg-[#FAF6EF] text-[#252522] shadow-2xl space-y-6 font-sans">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#D9D1C3] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded bg-[#E99B3D] text-[#121211] font-mono font-bold flex items-center justify-center text-xs">
                    JS
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-[#252522]">
                    JS INFORMATICS
                  </h3>
                </div>
                <div className="text-xs text-[#88847B] font-mono">
                  CONNECTING TECHNOLOGY. PROTECTING WHAT MATTERS.
                </div>
                <div className="text-xs text-[#88847B] font-mono">
                  CCTV | SECURITY | NETWORKING | IT SUPPORT
                </div>
                <div className="text-xs text-[#88847B] font-mono">
                  Thrissur, Kerala | jsinfomatics00@gmail.com
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-[#E99B3D] bg-[#E99B3D]/10 px-2 py-1 rounded">
                  TAX INVOICE (GST)
                </span>
                <div className="text-xs text-[#88847B] font-mono mt-1">Invoice #: JS-INV-2026-0419</div>
                <div className="text-xs text-[#88847B] font-mono">Date: 24 Nov 2026</div>
                <div className="text-xs text-[#88847B] font-mono">GSTIN: 32AABCS1920D1Z8</div>
              </div>
            </div>

            {/* Customer info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-bold text-[#88847B] uppercase font-mono text-[10px]">Client Details:</div>
                <div className="font-bold text-sm">Sobha City Retail Arcade</div>
                <div>Puzhakkal, Thrissur, Kerala 680553</div>
                <div>AMC Contract Ref: AMC-JS-2024-08</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#88847B] uppercase font-mono text-[10px]">Work Reference:</div>
                <div>Perimeter CCTV Installation & SMPS Upgrade</div>
                <div>Technician Assigned: Shijay AS</div>
              </div>
            </div>

            {/* Line items */}
            <table className="w-full text-xs text-left border-t border-b border-[#D9D1C3]">
              <thead>
                <tr className="border-b border-[#D9D1C3] font-mono text-[#88847B]">
                  <th className="py-2">Description of Goods / Services</th>
                  <th className="py-2 text-center">HSN/SAC</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Rate (INR)</th>
                  <th className="py-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DCCB]">
                {quoteItems.map((item, i) => {
                  const prod = inventory.find((p) => p.id === item.productId) || inventory[0];
                  return (
                    <tr key={i}>
                      <td className="py-2 font-medium">{prod.name}</td>
                      <td className="py-2 text-center font-mono">{prod.hsn}</td>
                      <td className="py-2 text-center font-mono">{item.qty}</td>
                      <td className="py-2 text-right font-mono">{formatINR(prod.price)}</td>
                      <td className="py-2 text-right font-mono font-bold">{formatINR(prod.price * item.qty)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="py-2 font-medium">Installation, Structured Cabling & Configuration</td>
                  <td className="py-2 text-center font-mono">998719</td>
                  <td className="py-2 text-center font-mono">1</td>
                  <td className="py-2 text-right font-mono">{formatINR(laborCharge)}</td>
                  <td className="py-2 text-right font-mono font-bold">{formatINR(laborCharge)}</td>
                </tr>
              </tbody>
            </table>

            {/* Calculations */}
            <div className="flex justify-end">
              <div className="w-64 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Taxable Value:</span>
                  <span>{formatINR(taxableAmount)}</span>
                </div>
                <div className="flex justify-between text-[#88847B]">
                  <span>CGST (9%):</span>
                  <span>{formatINR(taxableAmount * 0.09)}</span>
                </div>
                <div className="flex justify-between text-[#88847B]">
                  <span>SGST (9%):</span>
                  <span>{formatINR(taxableAmount * 0.09)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-[#252522] pt-2 text-[#252522]">
                  <span>Total Invoice Amount:</span>
                  <span>{formatINR(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9D1C3] flex items-center justify-between text-[10px] text-[#88847B] font-mono">
              <span>THANK YOU FOR CHOOSING JS INFORMATICS</span>
              <span>Authorised Signatory</span>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 6: INSTALLATION & SERVICE WORKFLOW */}
      {activeModule === "service" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#3D3D38] pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-[#F2EBDD]">
                Field Installation & Service Report System
              </h3>
              <p className="text-xs font-mono text-[#88847B]">
                Directly inspired by verified JS Informatics field service records.
              </p>
            </div>
            <span className="text-xs font-mono text-[#E99B3D] bg-[#E99B3D]/10 px-2.5 py-1 rounded border border-[#E99B3D]/30">
              Report #: JS-SR-4091
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Customer & Equipment Details */}
            <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-4">
              <div className="text-xs font-mono uppercase text-[#E99B3D] font-bold">
                1. Customer & Equipment Details
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>Customer: <span className="text-[#F2EBDD]">Sobha City Retail Arcade</span></div>
                <div>Location: <span className="text-[#D9D1C3]">Puzhakkal, Thrissur</span></div>
                <div>Equipment: <span className="text-[#F2EBDD]">8-Channel 4K IP Surveillance System</span></div>
                <div>Brand/Model: <span className="text-[#D9D1C3]">Hikvision ColorVu Array</span></div>
                <div>Serial Number: <span className="text-[#88847B]">HKV-4K-990812-B</span></div>
              </div>

              <div className="pt-3 border-t border-[#3D3D38] space-y-2">
                <div className="text-xs font-mono text-[#88847B]">Service Type:</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {(["AMC", "Normal", "Warranty", "Installation"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setServiceType(t)}
                      className={`px-3 py-1 rounded border transition-all ${
                        serviceType === t
                          ? "bg-[#E99B3D] text-[#121211] border-[#E99B3D] font-bold"
                          : "bg-[#1A1A18] text-[#88847B] border-[#3D3D38]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Service Remarks & Consumed Materials */}
            <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-4">
              <div className="text-xs font-mono uppercase text-[#E99B3D] font-bold">
                2. Field Work & Materials Consumed
              </div>
              <div className="space-y-2 text-xs font-mono text-[#D9D1C3]">
                <div className="text-[#88847B]">Customer Complaint:</div>
                <div className="p-2.5 rounded bg-[#1A1A18] border border-[#3D3D38]">
                  Camera #4 and #6 video loss during nighttime IR activation; suspected SMPS voltage drop across 65m cable run.
                </div>
                <div className="text-[#88847B] mt-2">Work Performed:</div>
                <div className="p-2.5 rounded bg-[#1A1A18] border border-[#3D3D38]">
                  Tested terminal voltage: 10.2V under load. Replaced centralized power supply with 12V 10A regulated unit; re-crimped BNC/DC jacks; restored 4K video feed.
                </div>
              </div>

              <div className="pt-3 border-t border-[#3D3D38] space-y-2">
                <div className="text-xs font-mono text-[#88847B]">Service Status:</div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {(["Completed", "Pending", "Return Visit Required"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setServiceStatus(s)}
                      className={`px-3 py-1 rounded border transition-all ${
                        serviceStatus === s
                          ? "bg-emerald-500 text-[#121211] border-emerald-500 font-bold"
                          : "bg-[#1A1A18] text-[#88847B] border-[#3D3D38]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 7: BUSINESS ANALYTICS & REPORTS */}
      {activeModule === "reports" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#3D3D38] pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-[#F2EBDD]">
                Business Financial & Category Analytics
              </h3>
              <p className="text-xs font-mono text-[#88847B]">
                Revenue distribution across CCTV hardware, AMC contracts, and labor installations.
              </p>
            </div>
            <span className="text-xs font-mono text-[#E99B3D]">FY 2026-27</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-4">
              <div className="text-xs font-mono uppercase text-[#88847B]">
                Revenue Breakdown by Business Stream
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#F2EBDD]">CCTV Equipment & NVRs</span>
                    <span className="text-[#E99B3D] font-bold">54% ({formatINR(262200)})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A1A18] overflow-hidden">
                    <div className="h-full bg-[#E99B3D] w-[54%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#F2EBDD]">Annual Maintenance Contracts (AMC)</span>
                    <span className="text-emerald-400 font-bold">28% ({formatINR(135900)})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A1A18] overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#F2EBDD]">Installation & Commissioning Labor</span>
                    <span className="text-blue-400 font-bold">18% ({formatINR(87500)})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A1A18] overflow-hidden">
                    <div className="h-full bg-blue-500 w-[18%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-4">
              <div className="text-xs font-mono uppercase text-[#88847B]">
                Key Engineering & Architectural Takeaway
              </div>
              <p className="text-xs text-[#D9D1C3] leading-relaxed">
                JS Informatics ERP bridges real-world electronics, CCTV surveillance installation challenges, and GST accounting into a single unified business application. Every schema constraint, AMC expiry reminder, and quote formula was designed from actual field experience.
              </p>
              <div className="p-3 rounded-lg bg-[#121211] border border-[#3D3D38] font-mono text-xs text-[#88847B] space-y-1">
                <div>• Clean Architecture backend with decoupled domain use cases.</div>
                <div>• Strict transactional consistency in PostgreSQL.</div>
                <div>• Real-time INR currency formatting conforming to Indian standards.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
