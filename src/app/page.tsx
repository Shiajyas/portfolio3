import { HeroChapter } from "@/components/storytelling/HeroChapter";
import { OriginChapter } from "@/components/storytelling/OriginChapter";
import { EvolutionChapter } from "@/components/storytelling/EvolutionChapter";
import { SkillTree } from "@/components/game/SkillTree";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { EngineeringLab } from "@/components/storytelling/EngineeringLab";
import { ClosingChapter } from "@/components/storytelling/ClosingChapter";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Chapter 01: The Entrance */}
      <HeroChapter />

      {/* Chapter 02: The Origin */}
      <OriginChapter />

      {/* Chapter 03: The Evolution */}
      <EvolutionChapter />

      {/* Chapter 04: The Skill Tree */}
      <SkillTree />

      {/* Chapter 05: The Missions (with 6 Embedded Demos) */}
      <ProjectExplorer />

      {/* Chapter 06: The Engineering Lab (Architecture Diagrams & Terminal) */}
      <EngineeringLab />

      {/* Chapter 07: The Next Quest */}
      <ClosingChapter />
    </div>
  );
}
