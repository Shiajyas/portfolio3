export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  location: string;
  email: string;
  phone: string;
  availableForOpportunities: boolean;
  availabilityNote: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  resumeUrl: string;
  bio: string[];
}

export interface TimelineItem {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: "education" | "experience" | "transition" | "milestone";
  summary: string;
  highlights: string[];
  skills: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "realtime" | "ai" | "devops";
  experienceLevel: "Production" | "Advanced" | "Proficient" | "Working Knowledge";
  description: string;
  context: string;
  relatedProjectIds: string[];
  connections: string[];
}

export interface ProjectArchitectureLayer {
  name: string;
  description: string;
  technologies: string[];
}

export interface ProjectData {
  id: string;
  number: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  roleDescription: string;
  technologies: string[];
  keyFeatures: string[];
  engineeringChallenges: string[];
  architectureSummary: string;
  architectureLayers: ProjectArchitectureLayer[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  demoType: "vconnect" | "ai-commerce" | "thinkthank" | "image-gallery" | "erp" | "gym";
}

export interface ChapterNav {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  anchor: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
