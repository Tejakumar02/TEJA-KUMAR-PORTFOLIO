import { useState, MouseEvent } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { NavigationConfig } from "../types";

interface NavbarProps {
  config: NavigationConfig;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  config,
  isDarkMode,
  onToggleTheme,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    // FIXED: Changed bg-bg/80 to an explicit style/arbitrary value fallback to ensure it renders even if your Tailwind theme variables use Hex codes.
    <nav
      style={{ backgroundColor: "var(--bg, #0c0f16)" }}
      className="fixed top-0 left-0 right-0 h-[var(--nav-h,64px)] z-[999] flex items-center border-b border-border/40 backdrop-blur-md select-none shadow-sm"
    >
      <div className="w-full max-w-[var(--max,1200px)] mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        {/* Logo Badge */}
        <a
          href="#hero"
          className="flex items-center shrink-0 z-10"
          aria-label="Teja Kumar G S — home"
          onClick={handleLogoClick}
        >
          {/* FIXED: Removed the slash opacity from the badge bg to ensure it always renders solid and visible */}
          <span className="nav-logo-badge logo-pulse-animated px-3 py-1.5 bg-surface border border-border rounded-xl font-mono text-[0.75rem] font-bold tracking-wider text-text hover:text-green hover:border-green/30 transition-all duration-300 cursor-pointer shadow-sm">
            {config.logoText}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-7 h-full">
          {config.links.map((link, idx) => (
            <li key={idx} className="h-full flex items-center">
              <a
                href={link.target}
                className="relative font-mono text-[0.7rem] tracking-widest uppercase text-text2 hover:text-green transition-colors py-2 h-fit after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-green hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions Cluster */}
        <div className="flex items-center gap-2.5 shrink-0 z-10">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            type="button"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border/70 text-text2 hover:text-green hover:border-green/30 hover:bg-green/5 transition-all duration-300 cursor-pointer focus:outline-none shadow-sm"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-green" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Resume Link (Hidden on small mobile screens to save space) */}
          <a
            href={config.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center font-mono text-[0.7rem] tracking-[0.08em] uppercase px-4 rounded-xl font-bold bg-green text-bg hover:bg-transparent hover:text-green border border-transparent hover:border-green transition-all duration-300 whitespace-nowrap h-9 cursor-pointer shadow-md shadow-green/5"
          >
            Resume ↗
          </a>

          {/* Mobile Menu Action Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border/70 text-text2 hover:text-green hover:border-green/30 hover:bg-green/5 transition-all duration-300 cursor-pointer focus:outline-none"
          >
            {isOpen ? (
              <X className="w-4 h-4 text-green" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Container */}
      {isOpen && (
        <div
          style={{ backgroundColor: "var(--surface, #111622)" }}
          className="absolute top-[var(--nav-h,64px)] left-0 right-0 border-b border-border flex flex-col p-6 gap-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl max-h-[calc(100dvh-var(--nav-h,64px))] overflow-y-auto"
        >
          <ul className="flex flex-col gap-2">
            {config.links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.target}
                  onClick={() => setIsOpen(false)}
                  className="block font-mono text-[0.78rem] tracking-widest uppercase text-text2 hover:text-green transition-all py-3 pl-4 relative touch-manipulation before:absolute before:left-0 before:text-text3/40 before:content-['//'] before:text-[9px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-border/60">
            <a
              href={config.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center font-mono text-[0.72rem] tracking-[0.08em] uppercase font-bold bg-green text-bg hover:bg-transparent hover:text-green border border-transparent hover:border-green py-3 rounded-xl transition-all duration-300 w-full h-11 touch-manipulation shadow-md shadow-green/5"
            >
              Resume ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
