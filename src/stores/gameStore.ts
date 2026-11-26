import { create } from "zustand";
import { soundEngine } from "@/lib/audio";
import { SkillNode } from "@/types";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface GameState {
  currentChapter: string;
  visitedChapters: Set<string>;
  discoveredSkills: Set<string>;
  exploredMissions: Set<string>;
  activeDemoId: string | null;
  selectedSkill: SkillNode | null;
  soundEnabled: boolean;
  easterEggFound: boolean;
  achievements: Achievement[];
  recentAchievement: Achievement | null;

  setCurrentChapter: (chapterId: string) => void;
  discoverSkill: (skillId: string) => void;
  exploreMission: (missionId: string) => void;
  openDemo: (demoId: string) => void;
  closeDemo: () => void;
  setSelectedSkill: (skill: SkillNode | null) => void;
  toggleSound: () => void;
  triggerEasterEgg: () => void;
  dismissAchievement: () => void;
}

const initialAchievements: Achievement[] = [
  {
    id: "first-step",
    title: "Initiate Journey",
    description: "Entered Shijay's interactive developer world.",
    icon: "Compass",
    unlocked: true,
  },
  {
    id: "skill-seeker",
    title: "Tech Tree Scholar",
    description: "Inspected 5 or more technology nodes in the Skill Tree.",
    icon: "Network",
    unlocked: false,
  },
  {
    id: "mission-specialist",
    title: "Mission Commander",
    description: "Explored and interacted with 3 embedded project demos.",
    icon: "Rocket",
    unlocked: false,
  },
  {
    id: "erp-architect",
    title: "ERP Systems Specialist",
    description: "Generated a sample quotation in JS Informatics ERP.",
    icon: "FileCheck",
    unlocked: false,
  },
  {
    id: "terminal-hacker",
    title: "Console Operator",
    description: "Executed a command in the Developer Terminal.",
    icon: "Terminal",
    unlocked: false,
  },
  {
    id: "easter-egg",
    title: "Matrix Breaker",
    description: "Discovered the hidden developer rune.",
    icon: "Sparkles",
    unlocked: false,
  },
];

export const useGameStore = create<GameState>((set, get) => ({
  currentChapter: "entrance",
  visitedChapters: new Set(["entrance"]),
  discoveredSkills: new Set(),
  exploredMissions: new Set(),
  activeDemoId: null,
  selectedSkill: null,
  soundEnabled: false,
  easterEggFound: false,
  achievements: initialAchievements,
  recentAchievement: null,

  setCurrentChapter: (chapterId: string) => {
    const { visitedChapters } = get();
    const updated = new Set(visitedChapters);
    updated.add(chapterId);
    set({ currentChapter: chapterId, visitedChapters: updated });
  },

  discoverSkill: (skillId: string) => {
    const { discoveredSkills, achievements } = get();
    soundEngine.playNodeSelect();
    const updated = new Set(discoveredSkills);
    updated.add(skillId);

    // Check achievement
    let newRecent: Achievement | null = null;
    const updatedAchievements = achievements.map((ach) => {
      if (ach.id === "skill-seeker" && !ach.unlocked && updated.size >= 5) {
        newRecent = { ...ach, unlocked: true };
        soundEngine.playChime();
        return newRecent;
      }
      return ach;
    });

    set({
      discoveredSkills: updated,
      achievements: updatedAchievements,
      recentAchievement: newRecent || get().recentAchievement,
    });
  },

  exploreMission: (missionId: string) => {
    const { exploredMissions, achievements } = get();
    const updated = new Set(exploredMissions);
    updated.add(missionId);

    let newRecent: Achievement | null = null;
    const updatedAchievements = achievements.map((ach) => {
      if (ach.id === "mission-specialist" && !ach.unlocked && updated.size >= 3) {
        newRecent = { ...ach, unlocked: true };
        soundEngine.playChime();
        return newRecent;
      }
      return ach;
    });

    set({
      exploredMissions: updated,
      achievements: updatedAchievements,
      recentAchievement: newRecent || get().recentAchievement,
    });
  },

  openDemo: (demoId: string) => {
    soundEngine.playClick();
    get().exploreMission(demoId);
    set({ activeDemoId: demoId });
  },

  closeDemo: () => {
    soundEngine.playClick();
    set({ activeDemoId: null });
  },

  setSelectedSkill: (skill: SkillNode | null) => {
    if (skill) {
      get().discoverSkill(skill.id);
    }
    set({ selectedSkill: skill });
  },

  toggleSound: () => {
    const nextState = !get().soundEnabled;
    soundEngine.setSoundEnabled(nextState);
    set({ soundEnabled: nextState });
  },

  triggerEasterEgg: () => {
    if (get().easterEggFound) return;
    soundEngine.playChime();
    const { achievements } = get();
    let newRecent: Achievement | null = null;
    const updatedAchievements = achievements.map((ach) => {
      if (ach.id === "easter-egg") {
        newRecent = { ...ach, unlocked: true };
        return newRecent;
      }
      return ach;
    });
    set({
      easterEggFound: true,
      achievements: updatedAchievements,
      recentAchievement: newRecent,
    });
  },

  dismissAchievement: () => {
    set({ recentAchievement: null });
  },
}));
