"use client";

import React, { useState, useRef, useEffect } from "react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillCategories, skillNodes } from "@/data/skills";
import { timelineData } from "@/data/experience";
import { soundEngine } from "@/lib/audio";
import { useGameStore } from "@/stores/gameStore";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2 } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const DeveloperTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs font-mono text-[#D9D1C3]">
          <div className="text-[#E99B3D] font-bold">
            SHIJAY AS // ARCHITECTURE & RUNTIME ENVIRONMENT v2.4
          </div>
          <div>Type <span className="text-[#E99B3D] font-bold">&apos;help&apos;</span> to inspect supported console instructions.</div>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const { achievements } = useGameStore();

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundEngine.playTerminalBeep();
    setInputVal("");

    // Trigger terminal achievement
    const ach = achievements.find((a) => a.id === "terminal-hacker");
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs font-mono text-[#D9D1C3]">
            <div className="text-[#E99B3D] font-bold">Available System Commands:</div>
            <div>• <span className="text-[#E99B3D]">about</span>      : Professional identity, systems mindset & background</div>
            <div>• <span className="text-[#E99B3D]">skills</span>     : Core technical competencies across 6 pillars</div>
            <div>• <span className="text-[#E99B3D]">projects</span>   : Directory of 6 production full-stack missions</div>
            <div>• <span className="text-[#E99B3D]">experience</span> : Timeline of education, hardware & software milestones</div>
            <div>• <span className="text-[#E99B3D]">contact</span>    : Central communication endpoints</div>
            <div>• <span className="text-[#E99B3D]">resume</span>     : Download verified engineering resume (PDF)</div>
            <div>• <span className="text-[#E99B3D]">clear</span>      : Clear console buffer</div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs font-mono text-[#D9D1C3]">
            <div className="text-[#E99B3D] font-bold">{profileData.name} — {profileData.role}</div>
            <p className="leading-relaxed">{profileData.headline}</p>
            <p className="text-[#88847B]">{profileData.bio[1]}</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono text-[#D9D1C3]">
            <div className="text-[#E99B3D] font-bold">Technical Competencies Matrix:</div>
            {skillCategories.map((c) => {
              const nodes = skillNodes.filter((n) => n.category === c.id).map((n) => n.name);
              return (
                <div key={c.id}>
                  <span className="text-[#E99B3D]">{c.title}:</span>{" "}
                  <span className="text-[#A8A49C]">{nodes.join(", ")}</span>
                </div>
              );
            })}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs font-mono text-[#D9D1C3]">
            <div className="text-[#E99B3D] font-bold">Active Flagship Missions:</div>
            {projectsData.map((p) => (
              <div key={p.id}>
                <span className="text-[#E99B3D]">[{p.number}] {p.title}</span> —{" "}
                <span className="text-[#88847B]">{p.category}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-xs font-mono text-[#D9D1C3]">
            <div className="text-[#E99B3D] font-bold">Verified Career & Education Progression:</div>
            {timelineData.map((t) => (
              <div key={t.id}>
                <span className="text-[#E99B3D]">{t.year}:</span>{" "}
                <span className="text-[#F2EBDD] font-bold">{t.title}</span> ({t.organization})
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono text-[#D9D1C3]">
            <div className="text-[#E99B3D] font-bold">Centralized Communication Endpoints:</div>
            <div>• Email: <a href={`mailto:${profileData.email}`} className="text-[#E99B3D] underline">{profileData.email}</a></div>
            <div>• Phone: <a href={`tel:${profileData.phone}`} className="text-[#E99B3D] underline">{profileData.phone}</a></div>
            <div>• GitHub: <a href={profileData.githubUrl} target="_blank" className="text-[#E99B3D] underline">{profileData.githubUrl}</a></div>
            <div>• LinkedIn: <a href={profileData.linkedinUrl} target="_blank" className="text-[#E99B3D] underline">{profileData.linkedinUrl}</a></div>
            <div>• Location: {profileData.location}</div>
          </div>
        );
        break;

      case "resume":
        if (typeof window !== "undefined") {
          window.open(profileData.resumeUrl, "_blank");
        }
        output = (
          <div className="text-xs font-mono text-emerald-400">
            ✓ Initiating verified resume download ({profileData.resumeUrl})...
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; for supported instructions.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  return (
    <div className="rounded-2xl bg-[#121211] border border-[#3D3D38] overflow-hidden shadow-2xl flex flex-col h-[460px]">
      {/* Window Titlebar */}
      <div className="p-3 bg-[#1A1A18] border-b border-[#3D3D38] flex items-center justify-between text-xs font-mono text-[#88847B]">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-[#E99B3D]" />
          <span className="text-[#F2EBDD]">shijay@terminal-lab: ~</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3D3D38]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3D3D38]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E99B3D]" />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-4 scanline">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-[#88847B]">
              <span className="text-[#E99B3D] font-bold">&gt;</span>
              <span className="text-[#F2EBDD]">{entry.command}</span>
            </div>
            <div className="pl-4">{entry.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Bar */}
      <form onSubmit={handleCommand} className="p-3 bg-[#1A1A18] border-t border-[#3D3D38] flex items-center gap-2">
        <span className="text-xs font-mono text-[#E99B3D] font-bold">&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help', 'skills', 'projects', 'resume'..."
          className="flex-1 bg-transparent text-xs font-mono text-[#F2EBDD] focus:outline-none placeholder-[#88847B]/50"
        />
        <button
          type="submit"
          className="p-1.5 rounded bg-[#252522] text-[#88847B] hover:text-[#E99B3D] border border-[#3D3D38]"
          title="Execute"
        >
          <CornerDownLeft size={13} />
        </button>
      </form>
    </div>
  );
};
