"use client";

import React from "react";
import { soundEngine } from "@/lib/audio";
import { X, RotateCcw, MonitorPlay, Sparkles } from "lucide-react";

interface DemoShellProps {
  title: string;
  category: string;
  onClose: () => void;
  onReset: () => void;
  children: React.ReactNode;
  subtitle?: string;
  badgeText?: string;
}

export const DemoShell: React.FC<DemoShellProps> = ({
  title,
  category,
  onClose,
  onReset,
  children,
  subtitle = "Interactive Portfolio Sandbox Environment",
  badgeText = "Simulated Local Demo",
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#121211]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden">
      <div className="bg-[#1A1A18] border-2 border-[#E99B3D] rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Top Window Bar */}
        <div className="px-6 py-4 bg-[#252522] border-b border-[#3D3D38] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E99B3D]/20 text-[#E99B3D] flex items-center justify-center border border-[#E99B3D]/40">
              <MonitorPlay size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#F2EBDD]">
                  {title}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#E99B3D] bg-[#E99B3D]/10 border border-[#E99B3D]/30 px-2 py-0.5 rounded-full">
                  <Sparkles size={10} />
                  {badgeText}
                </span>
              </div>
              <p className="text-xs font-mono text-[#88847B]">
                {category} // {subtitle}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                onReset();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A18] hover:bg-[#20201D] border border-[#3D3D38] text-xs font-mono text-[#D9D1C3] hover:text-[#E99B3D] transition-colors"
              title="Reset Demo State"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset State</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-[#1A1A18] hover:bg-rose-900/30 border border-[#3D3D38] hover:border-rose-500/50 text-[#88847B] hover:text-rose-400 transition-colors"
              aria-label="Close Demo"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#121211]/80">
          {children}
        </div>
      </div>
    </div>
  );
};
