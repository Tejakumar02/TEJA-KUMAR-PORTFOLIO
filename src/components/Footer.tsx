import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { FooterConfig } from "../types";

interface FooterProps {
  config: FooterConfig;
}

export default function Footer({ config }: FooterProps) {
  // Sets current context dynamically to 2026
  const currentYear = 2026;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigationLinks = config.navLinks || [
    { label: "Mission Control", href: "#home" },
    { label: "Core Stack", href: "#skills" },
    { label: "Deployments", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ];

  const socialChannels = [
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      href: config.socials?.github || "https://github.com/Tejakumar02",
      hoverClass:
        "hover:text-[#00f964] hover:border-[#00f964]/20 hover:bg-[#00f964]/5",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      href:
        config.socials?.linkedin ||
        "https://www.linkedin.com/in/teja-kumar-g-s-373b6733a/",
      hoverClass:
        "hover:text-[#0077b5] hover:border-[#0077b5]/20 hover:bg-[#0077b5]/5",
    },

    {
      id: "email",
      label: "Email",
      icon: Mail,
      href: config.socials?.email || "mailto:jayaramteja6@gmail.com",
      hoverClass: "hover:text-green hover:border-green/20 hover:bg-green/5",
    },
  ];

  return (
    <footer
      id="portfolio-footer"
      className="bg-bg2 border-t border-border relative z-10 pt-16 pb-12 lg:pt-20 overflow-hidden select-none"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[300px] md:w-[500px] h-[200px] bg-green/[0.03] blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-[250px] md:w-[400px] h-[150px] bg-cyan/[0.02] blur-[70px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[var(--max,1280px)] mx-auto px-5 md:px-8">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-border/60 items-start">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2 lg:col-span-6 flex flex-col gap-5 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center text-green text-xs font-mono font-bold tracking-tighter shadow-inner">
                TK
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-text font-bold block">
                  Teja Kumar G S
                </span>
                <span className="block font-mono text-[8px] text-text3/80 tracking-wider uppercase mt-0.5">
                  Applied ML & Computer Vision
                </span>
              </div>
            </div>

            <p className="text-[0.84rem] text-text2 leading-[1.65] font-light">
              AI Engineer specializing in Production Computer Vision, zone-based
              spatial inspection, and full-stack model deployments. Building
              real-time inference systems designed to make robust, trusted
              decisions under strict physical constraints.
            </p>
          </div>

          {/* Quick Navigation Column */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] text-text font-bold tracking-widest uppercase border-b border-border/80 pb-2">
              SYSTEM_INDEX
            </h4>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-mono text-[11px] text-text2 hover:text-green pl-3 relative transition-colors duration-200 w-fit before:absolute before:left-0 before:text-text3/40 before:content-['//'] before:text-[9px] hover:before:text-green/60"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect Column */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] text-text font-bold tracking-widest uppercase border-b border-border/80 pb-2">
              STATION_CHANNELS
            </h4>

            <div className="flex flex-wrap items-center gap-2.5">
              {socialChannels.map((item) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-surface/40 border border-border flex items-center justify-center text-text2 transition-all duration-300 shadow-sm ${item.hoverClass}`}
                    title={item.label}
                  >
                    <IconComp size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sub-Footer Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-[0.7rem] font-mono text-text3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="opacity-90">
              © {currentYear}{" "}
              {config.copy || "Teja Kumar G S. All rights reserved."}
            </span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={handleScrollToTop}
            type="button"
            className="group inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-widest uppercase text-text3 hover:text-green hover:border-green/30 transition-all border border-border rounded-xl px-4 py-2 bg-surface/50 hover:bg-green/5 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 duration-300 text-text3 group-hover:text-green"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
