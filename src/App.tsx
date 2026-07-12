import { useState, useEffect } from "react";
import portfolioDataRaw from "./data/portfolio.json";
import { PortfolioData } from "./types";

import Navbar from "./components/Navbar";
import Terminal from "./components/Terminal";
import ChatWidget from "./components/ChatWidget";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import ImageWithFallback from "./components/ImageWithFallback";
import InspectorSimulator from "./components/InspectorSimulator";

// Import icons from lucide-react
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  MapPin,
  Terminal as TerminalIcon,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  Target,
  Twitter,
  Code2,
} from "lucide-react";

// Explicitly type the imported JSON configuration
const portfolioData = portfolioDataRaw as PortfolioData;

const jobTechTags: Record<string, string[]> = {
  j1: [
    "YOLOv8",
    "OpenCV",
    "Python",
    "Flask",
    "Docker",
    "CVAT",
    "Centroid Spatial Logic",
    "Hardware Integration",
  ],
  j2: [
    "LangChain",
    "ChromaDB",
    "Ollama",
    "Mistral",
    "LLaMA",
    "PaddleOCR",
    "Tesseract",
    "HuggingFace",
    "FastAPI",
  ],
};

export default function App() {
  // Track open state for experience accordion cards
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    j1: true,
    j2: true,
  });

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Manage theme state (persisted in localStorage, defaults to system preferences or dark mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newVal = !prev;
      localStorage.setItem("theme", newVal ? "dark" : "light");
      return newVal;
    });
  };

  // Sync document tab title from configuration
  useEffect(() => {
    if (portfolioData.site.title) {
      document.title = portfolioData.site.title;
    }
  }, []);

  // Dynamically configure theme colors on document root based on the active state
  useEffect(() => {
    const activeColors = isDarkMode
      ? portfolioData.theme.dark
      : portfolioData.theme.light;
    const root = document.documentElement;

    // Apply color definitions to root CSS variables
    root.style.setProperty("--bg", activeColors.bg);
    root.style.setProperty("--bg2", activeColors.bg2);
    root.style.setProperty("--surface", activeColors.surface);
    root.style.setProperty("--surface2", activeColors.surface2);
    root.style.setProperty("--border", activeColors.border);
    root.style.setProperty("--border2", activeColors.border2);
    root.style.setProperty("--green", activeColors.green);
    root.style.setProperty("--cyan", activeColors.cyan);
    root.style.setProperty("--text", activeColors.text);
    root.style.setProperty("--text2", activeColors.text2);
    root.style.setProperty("--text3", activeColors.text3);

    // Apply transparent derivatives for accents
    if (isDarkMode) {
      root.style.setProperty("--green-10", "rgba(0, 249, 100, 0.10)");
      root.style.setProperty("--green-06", "rgba(0, 249, 100, 0.06)");
      root.style.setProperty("--green-glow", "rgba(0, 249, 100, 0.18)");
    } else {
      root.style.setProperty("--green-10", "rgba(16, 185, 129, 0.10)");
      root.style.setProperty("--green-06", "rgba(16, 185, 129, 0.06)");
      root.style.setProperty("--green-glow", "rgba(16, 185, 129, 0.18)");
    }

    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen relative text-text bg-bg font-sans transition-colors duration-300">
      {/* Background radial glowing gradients */}
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      {/* ── NAV ─────────────────────────────── */}
      <Navbar
        config={portfolioData.navigation}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* ── SECTIONS PIPELINE (DYNAMICAL ORDERING) ─────────────────────────── */}
      <div className="relative z-10">
        {portfolioData.sections.map((sec) => {
          if (!sec.enabled) return null;

          switch (sec.id) {
            /* ── HERO SECTION ─────────────────────────── */
            case "hero": {
              const hero = portfolioData.hero;
              const iconMap = {
                Github: Github,
                Linkedin: Linkedin,
                Mail: Mail,
              };
              const items = portfolioData?.contact?.HeroGetInTouch;
              return (
                <section
                  key="hero"
                  id="hero"
                  className="relative overflow-hidden flex items-center pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 px-5 md:px-7"
                >
                  <div className="w-full max-w-[var(--max)] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                      {/* Left Column - Content */}
                      <div className="flex flex-col">
                        {/* Eyebrow */}
                        <div className="hero-anim-1 inline-flex items-center gap-2 mb-5">
                          <span className="w-2 h-2 rounded-full bg-green pulse-glow-dot" />
                          <span className="font-mono text-[0.72rem] font-bold tracking-[0.15em] uppercase text-green">
                            {hero.eyebrow}
                          </span>
                        </div>

                        {/* Main Display Title */}
                        <h1 className="hero-anim-2 font-display font-bold text-[clamp(2.8rem,7.5vw,5.2rem)] leading-[0.9] tracking-tight text-text mb-4">
                          {hero.firstName}{" "}
                          <span className="font-serif italic font-normal tracking-[-0.01em] text-green">
                            {hero.lastNameSuffix}
                          </span>
                        </h1>

                        {/* Metadata Tags Row */}
                        <div className="hero-anim-3 flex items-center flex-wrap gap-2.5 mb-6 text-[0.72rem] font-mono text-text2">
                          {hero.roleDetails.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {idx > 0 && (
                                <span className="text-border2 select-none">
                                  •
                                </span>
                              )}
                              <span
                                className={`px-2.5 py-1 rounded border ${
                                  detail.type === "highlight"
                                    ? "bg-green/10 border-green/30 text-green font-bold uppercase tracking-wider"
                                    : "bg-surface2/50 border-border text-text2"
                                }`}
                              >
                                {detail.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Main Description */}
                        <p className="hero-anim-4 text-[clamp(0.92rem,2vw,1.05rem)] text-text2 leading-[1.7] font-light max-w-[580px] mb-8">
                          {hero.description}
                        </p>

                        {/* CTA Buttons & Unified Premium Social Matrix Row */}
                        <div className="hero-anim-5 flex flex-col sm:flex-row sm:items-center gap-6 mb-4">
                          <div className="flex flex-wrap gap-3">
                            {/* Main Primary Action */}
                            <a
                              href="#projects"
                              className="inline-flex items-center justify-center font-mono text-[0.72rem] tracking-[0.08em] uppercase px-5.5 py-3 rounded-lg font-bold bg-green text-bg hover:bg-transparent hover:text-green border border-transparent hover:border-green shadow-lg shadow-green/10 hover:shadow-none transition-all duration-300"
                            >
                              View Projects
                            </a>

                            {/* Resume Download Action */}
                            <a
                              href={portfolioData.navigation.resumeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase px-4.5 py-3 rounded-lg font-bold border border-border2 text-text2 hover:text-green hover:border-green hover:bg-green/5 transition-all duration-300"
                            >
                              <FileText size={13} />
                              Download Resume
                            </a>

                            {/* Contact Link Action */}
                            <a
                              href="#contact"
                              className="inline-flex items-center justify-center font-mono text-[0.72rem] tracking-[0.08em] uppercase px-4.5 py-3 rounded-lg font-bold text-text2 hover:text-text hover:bg-surface2/30 transition-all duration-300"
                            >
                              Get in Touch
                            </a>
                          </div>

                          {/* Desktop vertical separator */}
                          <div className="hidden sm:block w-[1px] h-8 bg-border" />

                          {/* Redesigned interactive glassmorphism icons with tooltips & brand-glows */}
                          <div className="flex items-center gap-3">
                            {items?.map((item) => {
                              // Find the right component based on the JSON string name, fallback to Mail if missing
                              const IconComp = iconMap[item.icon] || Mail;

                              return (
                                <div key={item.id} className="relative group">
                                  {/* Tooltip */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 bg-surface border border-border rounded font-mono text-[8px] font-bold uppercase tracking-wider text-text pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 shadow-xl white-space-nowrap">
                                    {item.label}
                                  </div>

                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    /* Swapped invalid w-9.5 to exact modern arbitrary pixel size w-[38px] */
                                    className={`w-[38px] h-[38px] rounded-lg border border-border flex items-center justify-center text-text3 transition-all duration-300 ${item.color} active:scale-95`}
                                  >
                                    <IconComp size={14} />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Beautiful Live Interactive Visual */}
                      <div className="hero-anim-7 flex justify-center w-full max-w-[420px] mx-auto lg:max-w-none">
                        <InspectorSimulator />
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            /* ── STATS SECTION ─────────────────────────── */
            case "stats": {
              const stats = portfolioData.stats;
              return (
                <div
                  key="stats"
                  id="stats"
                  className="border-t border-b border-border bg-bg2 py-0 relative z-10"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 grid grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="py-6 md:py-8 border-r border-border md:pl-7 first:pl-0 last:border-r-0 relative overflow-hidden group/stat"
                      >
                        <span className="font-mono text-[clamp(1.6rem,4.5vw,2.2rem)] font-bold text-green block leading-none mb-1">
                          {stat.value}
                        </span>
                        <span className="font-mono text-[0.66rem] text-text3 tracking-[0.1em] uppercase font-semibold">
                          {stat.label}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green scale-x-0 origin-left transition-transform duration-500 ease-out group-hover/stat:scale-x-100" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            /* ── ABOUT SECTION ─────────────────────────── */
            case "about": {
              const about = portfolioData.about;
              return (
                <section
                  key="about"
                  id="about"
                  className="py-14 md:py-18 border-t border-border relative overflow-hidden"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-8 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green" />
                      About Engineering Core
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_380px] gap-12 lg:gap-16 items-start">
                      <ScrollReveal className="flex flex-col">
                        <h2
                          className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-light tracking-tight leading-[1.25] mb-8 text-text"
                          dangerouslySetInnerHTML={{
                            __html: about.heading
                              .replace("\n", "<br/>")
                              .replace(
                                /<em>(.*?)<\/em>/g,
                                '<span class="font-serif italic text-green font-normal">$1</span>',
                              ),
                          }}
                        />
                        <div className="flex flex-col gap-5 text-[0.94rem] text-text2 leading-[1.75] font-light">
                          {about.paragraphs.map((para, idx) => (
                            <p
                              key={idx}
                              dangerouslySetInnerHTML={{ __html: para }}
                            />
                          ))}
                        </div>
                      </ScrollReveal>

                      {/* Interactive Constraints box card */}
                      <ScrollReveal className="bg-surface border border-border rounded-xl overflow-hidden shadow-xl hover:border-border2 transition-all">
                        <div className="px-5 py-4 border-b border-border font-mono text-[0.68rem] text-text2 tracking-[0.12em] uppercase flex items-center justify-between bg-bg2">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green pulse-glow-dot" />
                            <span>{about.constraintsBox.title}</span>
                          </div>
                          <span className="text-[10px] text-green font-bold">
                            VERIFIED
                          </span>
                        </div>
                        <div className="flex flex-col divide-y divide-border">
                          {about.constraintsBox.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="px-5 py-4 font-mono text-[0.74rem] text-text2 leading-[1.5] transition-colors hover:bg-green/5 flex items-start gap-3"
                            >
                              <span className="text-green font-bold shrink-0">
                                ▸
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </section>
              );
            }

            /* ── TERMINAL SECTION ─────────────────────────── */
            case "terminal": {
              return (
                <section
                  key="terminal"
                  id="terminal-section"
                  className="py-14 md:py-18 border-t border-border bg-bg2"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-8 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green" />
                      System Init Sequence
                    </div>

                    <div className="max-w-[760px] mx-auto">
                      <Terminal config={portfolioData.terminal} />
                    </div>
                  </div>
                </section>
              );
            }

            /* ── EXPERIENCE SECTION ─────────────────────────── */
            case "experience": {
              const exp = portfolioData.experience;
              return (
                <section
                  key="experience"
                  id="experience"
                  className="py-14 md:py-20 border-t border-border bg-bg/50"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    {/* Section Label */}
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-10 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                      Experience & Milestones
                    </div>

                    {/* Vertical Stack: Experience Top, Education Bottom */}
                    <div className="flex flex-col gap-14 items-stretch">
                      {/* Top: Work History Cards (Fully Expanded) */}
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2.5 mb-1">
                          <Briefcase size={16} className="text-green" />
                          <h3 className="font-mono text-xs uppercase tracking-wider text-text2 font-bold">
                            Work History
                          </h3>
                        </div>

                        <div className="flex flex-col gap-5">
                          {exp.jobs.map((job) => (
                            <ScrollReveal
                              key={job.id}
                              className="group relative border border-border bg-surface/40 rounded-xl overflow-hidden p-6 md:p-8 hover:border-border2 hover:bg-surface hover:shadow-lg hover:shadow-green/2 transition-all duration-300 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-transparent hover:before:bg-green before:transition-all before:duration-300"
                            >
                              {/* Card Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="text-[1.15rem] font-bold tracking-tight text-text group-hover:text-green transition-colors">
                                    {job.title}
                                  </span>
                                  <span className="font-mono text-[0.65rem] text-cyan px-2.5 py-0.5 rounded-md bg-cyan/5 border border-cyan/15 font-semibold uppercase tracking-wider">
                                    @{job.company}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-text3 text-[0.72rem] font-mono sm:self-center">
                                  <Calendar
                                    size={12}
                                    className="text-text3/70 shrink-0"
                                  />
                                  <span>{job.period}</span>
                                </div>
                              </div>

                              {/* Responsibilities List */}
                              <ul className="list-none flex flex-col gap-3">
                                {job.bullets.map((bullet, bIdx) => (
                                  <li
                                    key={bIdx}
                                    className="text-[0.88rem] text-text2 pl-5 relative leading-[1.7] font-light"
                                    dangerouslySetInnerHTML={{
                                      __html: `<span class="absolute left-0 text-[var(--green)] font-bold text-[10px] top-[4px]">▸</span>${bullet}`,
                                    }}
                                  />
                                ))}
                              </ul>

                              {/* Premium Technology Badges */}
                              {jobTechTags[job.id] &&
                                jobTechTags[job.id].length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border/30">
                                    {jobTechTags[job.id].map((tag) => (
                                      <span
                                        key={tag}
                                        className="font-mono text-[0.62rem] font-medium tracking-wide text-text2 bg-bg border border-border/80 rounded-md px-2.5 py-0.5 transition-all hover:text-green hover:border-green/30 hover:bg-green/5"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                            </ScrollReveal>
                          ))}
                        </div>
                      </div>

                      {/* Bottom: Education Grid */}
                      <div className="flex flex-col gap-5 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2.5 mb-1">
                          <GraduationCap size={16} className="text-green" />
                          <h3 className="font-mono text-xs uppercase tracking-wider text-text2 font-bold">
                            Academic Background
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {exp.education.map((edu, idx) => (
                            <ScrollReveal
                              key={idx}
                              className="p-6 border border-border rounded-xl bg-surface/40 hover:bg-surface hover:border-border2 hover:shadow-md transition-all duration-300 flex items-start gap-4"
                            >
                              <div className="w-11 h-11 rounded-xl bg-bg border border-border flex items-center justify-center text-green shrink-0 shadow-inner">
                                <GraduationCap size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[1.02rem] font-bold tracking-tight text-text">
                                  {edu.degree}
                                </div>
                                <div className="text-[0.82rem] text-text2 font-light mt-0.5">
                                  {edu.university}
                                </div>
                                <div className="flex items-center gap-2 mt-3 text-text3 text-[0.7rem] font-mono">
                                  <Calendar
                                    size={12}
                                    className="text-text3/70 shrink-0"
                                  />
                                  <span>{edu.period}</span>
                                </div>
                              </div>
                            </ScrollReveal>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            /* ── PROJECTS SECTION ─────────────────────────── */
            case "projects": {
              const projects = portfolioData.projects;
              return (
                <section
                  key="projects"
                  id="projects"
                  className="py-16 md:py-24 border-t border-border bg-bg/40 relative overflow-hidden"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    {/* Section Title */}
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-10 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                      Featured Project Showcase
                    </div>

                    {/* Featured Projects Stack */}
                    <div className="grid grid-cols-1 gap-10">
                      {projects.map((proj) => {
                        if (proj.featured) {
                          return (
                            <ScrollReveal
                              key={proj.id}
                              className="group col-span-1 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] bg-surface border border-border rounded-2xl overflow-hidden hover:border-border2/80 shadow-xl hover:shadow-2xl hover:shadow-green/2 transition-all duration-300"
                            >
                              {/* Left Column: Media & Primary Core Context */}
                              <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border">
                                {/* Visual Media Cover wrapper */}
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="proj-scanlines relative flex items-center justify-center min-h-[240px] md:min-h-[300px] bg-black overflow-hidden cursor-pointer w-full"
                                >
                                  <ImageWithFallback
                                    src={proj.image}
                                    alt={proj.title}
                                    fallbackIcon={proj.fallbackIcon || "🔬"}
                                    classNameBg="proj-img-bg opacity-90 group-hover:opacity-70 transition-all duration-500 scale-100 group-hover:scale-105"
                                    classNameFg="proj-img-fg transition-transform duration-500"
                                  />
                                  <span className="absolute top-4 right-4 z-10 font-mono text-[0.62rem] font-bold px-3 py-1 rounded-md bg-green/10 backdrop-blur-md border border-green/30 text-green uppercase tracking-wider shadow-sm">
                                    {proj.badge}
                                  </span>
                                </a>

                                {/* Left Main Content Block */}
                                <div className="p-6 md:p-8 flex flex-col gap-4 justify-between flex-1">
                                  <div className="flex flex-col gap-3.5">
                                    {/* Dynamic Core Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                      {proj.tags.map((tag, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className="font-mono text-[0.62rem] text-text2 bg-bg/80 border border-border/80 rounded-md px-2.5 py-0.5 shadow-sm font-medium tracking-wide"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>

                                    <h3 className="text-[1.28rem] font-bold tracking-tight text-text group-hover:text-green transition-colors duration-300">
                                      {proj.title}
                                    </h3>
                                    <p className="text-[0.88rem] text-text2 leading-[1.7] font-light">
                                      {proj.description}
                                    </p>
                                  </div>

                                  {/* Design Decisions Structural Block */}
                                  {proj.designDecisions && (
                                    <div className="bg-bg/60 border border-border/70 rounded-xl p-4 md:p-5 mt-2 shadow-inner">
                                      <div className="font-mono text-[0.62rem] text-cyan tracking-[0.12em] uppercase mb-3 font-bold flex items-center gap-2">
                                        <Layers
                                          size={11}
                                          className="text-cyan animate-pulse"
                                        />
                                        {proj.designDecisions.title}
                                      </div>
                                      <ul className="list-none flex flex-col gap-2">
                                        {proj.designDecisions.bullets.map(
                                          (db, dbIdx) => (
                                            <li
                                              key={dbIdx}
                                              className="font-mono text-[0.68rem] text-text2 pl-5 relative leading-[1.5]"
                                            >
                                              <span className="absolute left-0 text-text3/50 select-none">
                                                //
                                              </span>
                                              {db}
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Action Link Row */}
                                  <div className="pt-2">
                                    <a
                                      href={proj.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-mono text-[0.72rem] text-green font-bold tracking-wider inline-flex items-center gap-2 hover:text-green/80 hover:underline decoration-green/30 underline-offset-4 transition-all uppercase"
                                    >
                                      {proj.linkLabel}
                                      <ExternalLink
                                        size={12}
                                        className="shrink-0"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Right Column: Validation Dashboard Analytics Sidebar */}
                              <div className="p-6 md:p-8 flex flex-col justify-center gap-4 bg-bg2/40">
                                <div className="font-mono text-[0.62rem] text-text3 uppercase tracking-widest font-bold mb-1 pl-1 flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-text3/60" />
                                  System Validation Logs
                                </div>

                                <div className="flex flex-col gap-3">
                                  {proj.metrics?.map((m, mIdx) => (
                                    <div
                                      key={mIdx}
                                      className="bg-bg border border-border rounded-xl p-4 flex justify-between items-center transition-all duration-300 hover:border-border2 hover:shadow-md shadow-sm"
                                    >
                                      <span className="font-mono text-[0.7rem] text-text2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan/80 shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
                                        {m.key}
                                      </span>
                                      <span className="font-mono text-[0.78rem] text-green font-bold bg-green/5 px-2.5 py-0.5 rounded-md border border-green/10 shadow-inner">
                                        {m.val}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </ScrollReveal>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {/* Subsection Grid: Regular Projects Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                      {projects.map((proj) => {
                        if (!proj.featured) {
                          return (
                            <ScrollReveal
                              key={proj.id}
                              className="group bg-surface border border-border rounded-xl overflow-hidden flex flex-col hover:border-border2 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green/1 transition-all duration-300"
                            >
                              {/* Aspect-Ratio Restricted Top Media Element */}
                              <a
                                href={proj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative h-[170px] flex items-center justify-center bg-black overflow-hidden cursor-pointer group-hover:opacity-90 transition-opacity"
                              >
                                <ImageWithFallback
                                  src={proj.image}
                                  alt={proj.title}
                                  fallbackIcon={proj.fallbackIcon || "📂"}
                                  classNameBg="proj-img-bg opacity-90 group-hover:scale-105 transition-transform duration-500"
                                  classNameFg="proj-img-fg transition-transform duration-500"
                                />
                                {proj.badge && (
                                  <span
                                    className={`absolute top-4 right-4 z-10 font-mono text-[0.6rem] font-bold px-2.5 py-0.5 rounded-md border backdrop-blur-md uppercase tracking-wider ${
                                      proj.badgeStyle === "blue"
                                        ? "bg-cyan/10 border-cyan/20 text-cyan"
                                        : "bg-green/10 border-green/20 text-green"
                                    }`}
                                  >
                                    {proj.badge}
                                  </span>
                                )}
                              </a>

                              {/* Interior Content Column Container */}
                              <div className="p-6 flex flex-col gap-4 justify-between flex-1 min-h-0">
                                <div className="flex flex-col gap-3">
                                  {/* Flex Inline Badges */}
                                  <div className="flex flex-wrap gap-1">
                                    {proj.tags.map((tag, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="font-mono text-[0.62rem] text-text2 bg-bg/60 border border-border/80 rounded-md px-2 py-0.5"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <h3 className="text-[1.08rem] font-bold tracking-tight text-text group-hover:text-green transition-colors duration-300">
                                    {proj.title}
                                  </h3>
                                  <p className="text-[0.84rem] text-text2 leading-[1.65] font-light">
                                    {proj.description}
                                  </p>
                                </div>

                                {/* External Navigation Link Footer Anchor */}
                                <div className="pt-2">
                                  <a
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[0.7rem] text-green font-bold tracking-wide inline-flex items-center gap-1.5 hover:text-green/80 transition-colors uppercase"
                                  >
                                    {proj.linkLabel}
                                    <ExternalLink
                                      size={11}
                                      className="shrink-0"
                                    />
                                  </a>
                                </div>
                              </div>
                            </ScrollReveal>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </section>
              );
            }

            /* ── SKILLS SECTION ─────────────────────────── */
            case "skills": {
              const skills = portfolioData.skills;
              return (
                <section
                  key="skills"
                  id="skills"
                  className="py-16 md:py-24 border-t border-border bg-bg/20"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-10 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                      Core Capabilities
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skills.map((skill, idx) => (
                        <ScrollReveal
                          key={idx}
                          className="group bg-surface/60 border border-border rounded-xl p-6 hover:border-border2/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-green/2 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="font-mono text-[0.62rem] text-green tracking-[0.12em] uppercase mb-2 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                              {skill.category}
                            </div>
                            <h3 className="text-[1.05rem] font-bold tracking-tight mb-2 text-text group-hover:text-green transition-colors duration-300">
                              {skill.title}
                            </h3>
                            <p className="text-[0.84rem] text-text2 leading-[1.65] font-light mb-5">
                              {skill.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
                            {skill.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="font-mono text-[0.62rem] text-text2 bg-bg/50 border border-border/70 rounded-md px-2.5 py-0.5 transition-all duration-200 hover:text-green hover:border-green/30 hover:bg-green/5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            /* ── PROCESS SECTION ─────────────────────────── */
            case "process": {
              const process = portfolioData.process;
              return (
                <section
                  key="process"
                  id="process"
                  className="py-16 md:py-24 border-t border-border bg-bg/40"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-10 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                      Engineering Pipeline
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-stretch">
                      {/* Left: Connected Steps list */}
                      <div className="flex flex-col gap-4 justify-center">
                        {process.steps.map((step) => (
                          <ScrollReveal
                            key={step.num}
                            className="group grid grid-cols-[60px_1fr] bg-surface/50 border border-border rounded-xl overflow-hidden hover:border-border2/80 hover:bg-surface transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <div className="bg-bg2/60 border-r border-border flex items-center justify-center font-mono text-[0.85rem] font-bold text-text3 group-hover:text-green transition-colors duration-300">
                              {step.num.toString().padStart(2, "0")}
                            </div>
                            <div className="p-5 md:p-6">
                              <h4 className="text-[0.98rem] font-bold tracking-tight mb-1.5 text-text group-hover:text-green transition-colors duration-300">
                                {step.title}
                              </h4>
                              <p className="text-[0.84rem] text-text2 leading-[1.65] font-light">
                                {step.description}
                              </p>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>

                      {/* Right: Mock chat widget */}
                      <ScrollReveal className="w-full flex items-stretch">
                        <div className="w-full p-0.5 rounded-2xl border border-border/75 bg-surface/40 backdrop-blur-sm overflow-hidden flex flex-col shadow-lg h-full">
                          <ChatWidget config={process.chatWidget} />
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </section>
              );
            }

            /* ── CONTACT SECTION ─────────────────────────── */
            case "contact": {
              const contact = portfolioData.contact;
              return (
                <section
                  key="contact"
                  id="contact"
                  className="py-16 md:py-24 border-t border-border bg-bg/20"
                >
                  <div className="max-w-[var(--max)] mx-auto px-5 md:px-7 relative z-10">
                    <div className="section-label font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase text-green mb-10 flex items-center gap-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                      Get in Touch
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      {/* Left: Contact Channels */}
                      <div className="flex flex-col gap-4 justify-between">
                        {contact.channels.map((channel, idx) => (
                          <ScrollReveal key={idx} className="h-full flex">
                            <a
                              href={channel.href}
                              target={channel.external ? "_blank" : undefined}
                              rel={
                                channel.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="w-full flex items-center gap-4 bg-surface/50 border border-border rounded-xl p-5 hover:border-border2/80 hover:bg-surface group shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                            >
                              <div className="w-12 h-12 rounded-xl bg-bg/80 border border-border flex items-center justify-center text-[1rem] shrink-0 text-text group-hover:border-green/20 group-hover:bg-green/5 transition-all duration-300 shadow-inner">
                                {channel.type === "email" && (
                                  <Mail size={16} className="text-green" />
                                )}
                                {channel.type === "phone" && (
                                  <Phone size={16} className="text-cyan" />
                                )}
                                {channel.type === "github" && (
                                  <Github
                                    size={16}
                                    className="text-[#a8b8cc]"
                                  />
                                )}
                                {channel.type === "linkedin" && (
                                  <Linkedin
                                    size={16}
                                    className="text-[#0077b5]"
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-[0.62rem] text-text3 tracking-[0.1em] uppercase font-bold">
                                  {channel.label}
                                </div>
                                <div className="font-mono text-[0.84rem] text-text mt-0.5 group-hover:text-green transition-colors truncate">
                                  {channel.value}
                                </div>
                              </div>
                              {channel.external && (
                                <span className="text-text3/60 text-[0.8rem] transition-transform duration-300 group-hover:text-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 px-1">
                                  ↗
                                </span>
                              )}
                            </a>
                          </ScrollReveal>
                        ))}
                      </div>

                      {/* Right: Availability Card */}
                      <ScrollReveal className="relative bg-surface/50 border border-border rounded-xl p-6 md:p-8 hover:border-border2/80 hover:bg-surface transition-all duration-300 shadow-md flex flex-col justify-between h-full min-h-[300px] before:absolute before:left-0 before:top-0 before:right-0 before:h-[3px] before:bg-green">
                        <div>
                          <div className="font-mono text-[0.68rem] text-green tracking-[0.1em] mb-4 flex items-center gap-2.5 font-bold uppercase">
                            <span className="w-2 h-2 rounded-full bg-green animate-ping shrink-0" />
                            {contact.availability.status}
                          </div>
                          <p className="text-[0.96rem] text-text2 leading-[1.75] font-light whitespace-pre-line">
                            {contact.availability.text}
                          </p>
                        </div>

                        <a
                          href={portfolioData.navigation.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-start inline-flex items-center justify-center font-mono text-[0.7rem] tracking-[0.08em] uppercase px-5 py-3 rounded-lg font-bold bg-green text-bg hover:bg-transparent hover:text-green border border-transparent hover:border-green transition-all duration-300 mt-8 cursor-pointer shadow-lg shadow-green/5"
                        >
                          View Full Resume ↗
                        </a>
                      </ScrollReveal>
                    </div>
                  </div>
                </section>
              );
            }

            default:
              return null;
          }
        })}
      </div>

      {/* ── FOOTER ────────────────────────────── */}
      <Footer config={portfolioData.footer} />
    </div>
  );
}
