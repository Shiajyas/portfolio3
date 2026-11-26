"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio";
import {
  Smartphone,
  Shield,
  QrCode,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Sparkles,
  Dumbbell,
  Building,
  RotateCcw,
} from "lucide-react";

interface GymMember {
  id: string;
  name: string;
  plan: string;
  expiryDate: string;
  status: "Active" | "Due Soon" | "Expired" | "Unpaid";
  checkedInToday: boolean;
  attendanceStreak: number;
}

const initialMembers: GymMember[] = [
  { id: "m1", name: "Rahul Menon", plan: "Annual Strength & Cardio", expiryDate: "2027-02-15", status: "Active", checkedInToday: true, attendanceStreak: 14 },
  { id: "m2", name: "Ananya Nair", plan: "Quarterly Fitness Pass", expiryDate: "2026-11-28", status: "Due Soon", checkedInToday: false, attendanceStreak: 8 },
  { id: "m3", name: "Vishnu Prasad", plan: "Monthly Basic Gym", expiryDate: "2026-11-10", status: "Expired", checkedInToday: false, attendanceStreak: 0 },
  { id: "m4", name: "Kavya Suresh", plan: "Half-Yearly Elite Pass", expiryDate: "2027-04-01", status: "Active", checkedInToday: false, attendanceStreak: 21 },
  { id: "m5", name: "Jithin Thomas", plan: "Monthly Crossfit", expiryDate: "2026-11-20", status: "Unpaid", checkedInToday: false, attendanceStreak: 3 },
];

export const GymDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<"admin" | "member">("admin");
  const [members, setMembers] = useState<GymMember[]>(initialMembers);
  const [selectedTenant, setSelectedTenant] = useState<string>("ironcore-thrissur");
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Active member for mobile view simulation
  const currentMember = members[0];

  const handleManualCheckIn = (memberId: string) => {
    soundEngine.playNodeSelect();
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, checkedInToday: true, attendanceStreak: m.attendanceStreak + 1 }
          : m
      )
    );
  };

  const handleScanQrFromMobile = () => {
    soundEngine.playChime();
    setMembers((prev) =>
      prev.map((m) =>
        m.id === currentMember.id
          ? { ...m, checkedInToday: true, attendanceStreak: m.attendanceStreak + 1 }
          : m
      )
    );
    setScanMessage("QR Pass Verified! Access Gate Opened (Tenant: IronCore Fitness).");
    setTimeout(() => setScanMessage(null), 4000);
  };

  const todayCheckIns = members.filter((m) => m.checkedInToday).length;
  const unpaidCount = members.filter((m) => m.status === "Unpaid").length;

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Top Bar with Tenant Indicator and View Switcher */}
      <div className="bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E99B3D]/20 text-[#E99B3D] border border-[#E99B3D]/40 flex items-center justify-center">
            <Dumbbell size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-display font-bold text-[#F2EBDD]">
                GYM MANAGEMENT SAAS
              </span>
              <span className="text-[10px] font-mono bg-[#252522] border border-[#3D3D38] px-2 py-0.5 rounded text-[#E99B3D]">
                Multi-Tenant Isolation
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#88847B]">
              Tenant Organization: IronCore Fitness (Thrissur Branch)
            </div>
          </div>
        </div>

        {/* Dual View Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveView("admin");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeView === "admin"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            <Building size={13} />
            <span>Gym Admin Portal</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveView("member");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeView === "member"
                ? "bg-[#E99B3D] text-[#121211] font-bold"
                : "bg-[#252522] text-[#D9D1C3] hover:text-[#F2EBDD]"
            }`}
          >
            <Smartphone size={13} />
            <span>Member Mobile Pass</span>
          </button>
        </div>
      </div>

      {/* VIEW A: GYM ADMIN DASHBOARD */}
      {activeView === "admin" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Total Enrolled Members</div>
              <div className="text-xl font-display font-bold text-[#F2EBDD]">184</div>
              <div className="text-[10px] font-mono text-emerald-400">IronCore Main Branch</div>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Today&apos;s QR Check-ins</div>
              <div className="text-xl font-display font-bold text-[#E99B3D]">{todayCheckIns} Scans</div>
              <div className="text-[10px] font-mono text-[#D9D1C3]">Contactless turnstile enabled</div>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Expiring This Week</div>
              <div className="text-xl font-display font-bold text-amber-400">6 Members</div>
              <div className="text-[10px] font-mono text-[#88847B]">BullMQ reminders queued</div>
            </div>

            <div className="p-4 rounded-xl bg-[#252522] border border-[#3D3D38] space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#88847B]">Unpaid Invoices</div>
              <div className="text-xl font-display font-bold text-rose-400">{unpaidCount} Dues</div>
              <div className="text-[10px] font-mono text-rose-400">Payment pending</div>
            </div>
          </div>

          {/* Member Directory Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#88847B]">
                Member Directory & Attendance Ledger
              </span>
              <span className="text-xs font-mono text-[#E99B3D]">
                Organization Schema: public.tenant_ironcore
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#3D3D38]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#252522] text-[#D9D1C3] border-b border-[#3D3D38]">
                  <tr>
                    <th className="p-3">Member Name</th>
                    <th className="p-3">Membership Plan</th>
                    <th className="p-3">Expiry Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Today Check-In</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3D3D38]/50 text-[#A8A49C]">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-[#20201D]">
                      <td className="p-3 font-medium text-[#F2EBDD] flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#E99B3D]/20 text-[#E99B3D] flex items-center justify-center text-[10px] font-bold">
                          {m.name.charAt(0)}
                        </div>
                        <span>{m.name}</span>
                      </td>
                      <td className="p-3 text-[#D9D1C3]">{m.plan}</td>
                      <td className="p-3 text-[#88847B]">{m.expiryDate}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            m.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : m.status === "Due Soon"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              : m.status === "Unpaid"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                              : "bg-[#3D3D38] text-[#88847B]"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {m.checkedInToday ? (
                          <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                            <CheckCircle size={12} /> Present ({m.attendanceStreak} day streak)
                          </span>
                        ) : (
                          <span className="text-[#88847B] text-[10px]">Not Checked In</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {!m.checkedInToday && (
                          <button
                            onClick={() => handleManualCheckIn(m.id)}
                            className="px-2.5 py-1 rounded bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-[10px] font-bold"
                          >
                            Mark Check-In
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW B: MEMBER MOBILE APP SIMULATION */}
      {activeView === "member" && (
        <div className="flex-1 bg-[#1A1A18] rounded-xl border border-[#3D3D38] p-6 flex flex-col items-center justify-center overflow-y-auto">
          {/* Mobile phone frame */}
          <div className="w-full max-w-sm rounded-[32px] border-4 border-[#3D3D38] bg-[#121211] p-5 shadow-2xl space-y-5 relative">
            {/* Phone speaker notch */}
            <div className="w-20 h-3 bg-[#252522] rounded-full mx-auto" />

            {/* Gym Brand Header */}
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-[#E99B3D] text-[#121211] font-display font-bold flex items-center justify-center mx-auto text-base">
                IC
              </div>
              <h4 className="font-display font-bold text-sm text-[#F2EBDD]">
                IronCore Fitness Pass
              </h4>
              <div className="text-[10px] font-mono text-[#88847B]">
                Member ID: #IC-M-90218
              </div>
            </div>

            {/* Dynamic QR Pass Card */}
            <div className="p-5 rounded-2xl bg-[#FAF6EF] text-[#121211] text-center space-y-3 shadow-lg">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#88847B] font-bold">
                Dynamic Entry QR Code
              </div>

              {/* Simulated QR Pattern */}
              <div className="w-36 h-36 bg-[#121211] rounded-xl mx-auto flex items-center justify-center p-2">
                <QrCode size={110} className="text-[#FAF6EF]" />
              </div>

              <div className="space-y-0.5 text-xs">
                <div className="font-display font-bold text-sm text-[#121211]">
                  {currentMember.name}
                </div>
                <div className="text-[11px] text-[#88847B] font-mono">
                  {currentMember.plan}
                </div>
                <div className="text-[10px] text-emerald-600 font-mono font-bold">
                  Valid Until: {currentMember.expiryDate}
                </div>
              </div>
            </div>

            {/* Attendance Status */}
            <div className="p-3 rounded-xl bg-[#252522] border border-[#3D3D38] flex items-center justify-between text-xs font-mono">
              <span className="text-[#88847B]">Today&apos;s Status:</span>
              {currentMember.checkedInToday ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle size={13} /> Checked In
                </span>
              ) : (
                <span className="text-amber-400">Awaiting Entry Scan</span>
              )}
            </div>

            {/* Scan Simulation CTA */}
            <div>
              <button
                onClick={handleScanQrFromMobile}
                className="w-full py-3 rounded-xl bg-[#E99B3D] hover:bg-[#D88B2D] text-[#121211] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <QrCode size={15} />
                <span>Simulate Turnstile QR Scan</span>
              </button>
            </div>

            {scanMessage && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-center font-mono text-[10px]">
                {scanMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
