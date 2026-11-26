"use client";

import React, { useEffect } from "react";
import { chapters } from "@/data/navigation";
import { useGameStore } from "@/stores/gameStore";
import { soundEngine } from "@/lib/audio";
import { Trophy, X } from "lucide-react";

export const JourneyProgress: React.FC = () => {
  const {
    currentChapter,
    visitedChapters,
    setCurrentChapter,
    recentAchievement,
    dismissAchievement,
  } = useGameStore();

  // Scroll listener to update active chapter dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      chapters.forEach((ch) => {
        const el = document.querySelector(ch.anchor);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (currentChapter !== ch.id) {
              setCurrentChapter(ch.id);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentChapter, setCurrentChapter]);

  // Auto-dismiss achievement after 6s
  useEffect(() => {
    if (recentAchievement) {
      const timer = setTimeout(() => {
        dismissAchievement();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [recentAchievement, dismissAchievement]);

  const handleRailClick = (anchor: string) => {
    soundEngine.playClick();
    const target = document.querySelector(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentIdx = chapters.findIndex((c) => c.id === currentChapter);
  const progressPercent = Math.round(((currentIdx + 1) / chapters.length) * 100);

  return (
    <>
      {/* Desktop Vertical Journey Rail */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3 bg-[#1A1A18]/80 backdrop-blur-md p-2.5 rounded-full border border-[#3D3D38]/60 shadow-xl">
        <span className="text-[9px] font-mono font-bold text-[#E99B3D] mb-1">
          {progressPercent}%
        </span>
        {chapters.map((ch) => {
          const isActive = currentChapter === ch.id;
          const isVisited = visitedChapters.has(ch.id);
          return (
            <button
              key={ch.id}
              onClick={() => handleRailClick(ch.anchor)}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Jump to ${ch.title}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#E99B3D] scale-125 ring-4 ring-[#E99B3D]/20"
                    : isVisited
                    ? "bg-[#D9D1C3]/60 group-hover:bg-[#E99B3D]"
                    : "bg-[#3D3D38] group-hover:bg-[#88847B]"
                }`}
              />

              {/* Tooltip on hover */}
              <div className="absolute right-7 py-1 px-2.5 rounded bg-[#252522] border border-[#3D3D38] text-[11px] font-mono text-[#F2EBDD] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
                <span className="text-[#E99B3D] mr-1">{ch.number}</span>
                {ch.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Achievement Unlocked Notification Toast */}
      {recentAchievement && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1A1A18] border-2 border-[#E99B3D] rounded-xl p-4 shadow-2xl animate-bounce-once flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E99B3D]/20 border border-[#E99B3D] flex items-center justify-center text-[#E99B3D] shrink-0">
            <Trophy size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E99B3D] font-bold">
                Achievement Unlocked
              </span>
              <button
                onClick={dismissAchievement}
                className="text-[#88847B] hover:text-[#F2EBDD]"
              >
                <X size={14} />
              </button>
            </div>
            <h4 className="text-sm font-display font-bold text-[#F2EBDD] mt-0.5">
              {recentAchievement.title}
            </h4>
            <p className="text-xs text-[#88847B] mt-1 leading-snug">
              {recentAchievement.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
