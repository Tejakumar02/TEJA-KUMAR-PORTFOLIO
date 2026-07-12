import { JSX } from "react/jsx-runtime";

export interface ColorTheme {
  bg: string;
  bg2: string;
  surface: string;
  surface2: string;
  border: string;
  border2: string;
  green: string;
  cyan: string;
  text: string;
  text2: string;
  text3: string;
}

export interface FontTheme {
  sans: string;
  mono: string;
  serif: string;
  display: string;
}

export interface ThemeConfig {
  dark: ColorTheme;
  light: ColorTheme;
  fonts: FontTheme;
}

export interface SectionToggle {
  id: string;
  enabled: boolean;
}

export interface SiteInfo {
  title: string;
  favicon: string;
}

export interface NavLink {
  label: string;
  target: string;
}

export interface NavigationConfig {
  logoText: string;
  resumeLink: string;
  links: NavLink[];
}

export interface RoleDetail {
  text: string;
  type: "text" | "highlight";
}

export interface CtaButton {
  label: string;
  target: string;
  style: "primary" | "ghost";
}

export interface StripLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeroConfig {
  eyebrow: string;
  firstName: string;
  lastNameSuffix: string;
  roleDetails: RoleDetail[];
  description: string;
  cta: CtaButton[];
  strip: StripLink[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ConstraintsBox {
  title: string;
  items: string[];
}

export interface AboutConfig {
  heading: string;
  paragraphs: string[];
  constraintsBox: ConstraintsBox;
}

export interface TerminalMessage {
  type: "cmd" | "orange" | "yellow" | "white" | "gap" | "bullet";
  value?: string;
}

export interface TerminalConfig {
  title: string;
  sequence: TerminalMessage[];
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  university: string;
  period: string;
}

export interface ExperienceConfig {
  jobs: JobItem[];
  education: EducationItem[];
}

export interface DesignDecision {
  title: string;
  bullets: string[];
}

export interface ProjectMetric {
  key: string;
  val: string;
}

export interface ProjectItem {
  id: string;
  featured: boolean;
  title: string;
  image?: string;
  fallbackIcon?: string;
  badge?: string;
  badgeStyle?: "green" | "blue";
  tags: string[];
  description: string;
  link: string;
  linkLabel: string;
  designDecisions?: DesignDecision;
  metrics?: ProjectMetric[];
}

export interface SkillItem {
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  num: number;
  title: string;
  description: string;
}

export interface ChatMessage {
  sender: "agent" | "user";
  label: string;
  bubble: string;
  icon?: string;
}

export interface ChatWidgetConfig {
  agentName: string;
  status: string;
  initials: string;
  messages: ChatMessage[];
}

export interface ProcessConfig {
  heading: string;
  steps: ProcessStep[];
  chatWidget: ChatWidgetConfig;
}

export interface ContactAvailability {
  status: string;
  text: string;
}

export interface ContactChannel {
  type: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  arrow?: boolean;
}

export interface ContactConfig {
  heading: string;
  availability: ContactAvailability;
  channels: ContactChannel[];
  HeroGetInTouch: HeroGetInTouch[];
}
export interface HeroGetInTouch {
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  id: string;
  label: string;
  icon: string;
  href: string;
  color: string;
}
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterConfig {
  copy: string;
  links: FooterLink[];
}

export interface PortfolioData {
  theme: ThemeConfig;
  sections: SectionToggle[];
  site: SiteInfo;
  navigation: NavigationConfig;
  hero: HeroConfig;
  stats: StatItem[];
  about: AboutConfig;
  terminal: TerminalConfig;
  experience: ExperienceConfig;
  projects: ProjectItem[];
  skills: SkillItem[];
  process: ProcessConfig;
  contact: ContactConfig;
  HeroGetInTouch: HeroGetInTouch;
  footer: FooterConfig;
}
