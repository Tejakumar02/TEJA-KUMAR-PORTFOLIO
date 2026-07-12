import { useEffect, useRef, useState } from "react";
import { TerminalConfig, TerminalMessage } from "../types";

interface TerminalProps {
  config: TerminalConfig;
}

interface RenderedLine {
  type: TerminalMessage["type"];
  value: string;
  isCompleted: boolean;
}

export default function Terminal({ config }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [renderedLines, setRenderedLines] = useState<RenderedLine[]>([]);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [activeMessageIndex, setActiveMessageIndex] = useState(-1);

  // Kick off the terminal sequence once elements scroll into view
  useEffect(() => {
    const element = terminalRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveMessageIndex(0);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }, // Adjusted slightly for quicker mobile triggering
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Centralized scroll-to-bottom controller triggered on text mutations
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [renderedLines, currentTypingText]);

  // Process terminal message sequence loop safely
  useEffect(() => {
    if (activeMessageIndex < 0 || activeMessageIndex >= config.sequence.length)
      return;

    const message = config.sequence[activeMessageIndex];
    const { type, value = "" } = message;

    let timerId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    // Instant/Static lines handling
    if (type === "gap") {
      setRenderedLines((prev) => [
        ...prev,
        { type, value: "", isCompleted: true },
      ]);
      timerId = setTimeout(() => setActiveMessageIndex((idx) => idx + 1), 60);
      return () => clearTimeout(timerId);
    }

    if (type === "yellow" || type === "white") {
      setRenderedLines((prev) => [...prev, { type, value, isCompleted: true }]);
      timerId = setTimeout(() => setActiveMessageIndex((idx) => idx + 1), 80);
      return () => clearTimeout(timerId);
    }

    // Interactive character-by-character layout typing simulation
    let charIndex = 0;
    setCurrentTypingText("");

    intervalId = setInterval(() => {
      if (charIndex < value.length) {
        setCurrentTypingText((prev) => prev + value[charIndex]);
        charIndex++;
      } else {
        clearInterval(intervalId);

        // Push completed line stack
        setRenderedLines((prev) => [
          ...prev,
          { type, value, isCompleted: true },
        ]);
        setCurrentTypingText("");

        // Safe external rest timeout delay before initiating next line index
        const delay = type === "cmd" ? 180 : 80;
        timerId = setTimeout(() => {
          setActiveMessageIndex((idx) => idx + 1);
        }, delay);
      }
    }, 25);

    // Completely cleans up both loops safely on immediate execution unmounts
    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [activeMessageIndex, config.sequence]);

  const getLineClass = (type: TerminalMessage["type"]) => {
    switch (type) {
      case "cmd":
        return "t-prompt font-bold text-[var(--cyan,#06b6d4)]";
      case "orange":
        return "t-orange text-orange-400 font-semibold";
      case "yellow":
        return "t-yellow text-[var(--text2,#a1a1aa)] font-bold";
      case "white":
        return "t-white text-[var(--text,#f4f4f5)] font-medium";
      case "bullet":
        return "t-green text-[var(--green,#22c55e)] font-semibold";
      default:
        return "t-dim text-[var(--text3,#71717a)]";
    }
  };

  const isCurrentlyTyping =
    activeMessageIndex >= 0 &&
    activeMessageIndex < config.sequence.length &&
    !["gap", "yellow", "white"].includes(
      config.sequence[activeMessageIndex].type,
    );

  return (
    <div
      ref={terminalRef}
      className="terminal w-full bg-[var(--surface,#18181b)] border border-[var(--border,#27272a)] rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
    >
      {/* Top window management header bar */}
      <div className="t-bar bg-[var(--bg2,#09090b)] border-b border-[var(--border,#27272a)] px-4 py-3 flex items-center justify-between">
        <div className="t-dots flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
        </div>
        <span className="t-title font-mono text-[0.68rem] md:text-[0.72rem] text-[var(--text3,#71717a)] tracking-[0.12em] uppercase font-semibold selection:bg-transparent">
          {config.title || "SYSTEM_SHELL"}
        </span>
        <div className="w-14 hidden sm:block"></div>{" "}
        {/* Balanced spacer layer */}
      </div>

      {/* Main Stream Shell Input/Output Wrapper */}
      <div
        ref={bodyRef}
        className="t-body p-4 md:p-6 overflow-y-auto font-mono text-[0.78rem] md:text-[0.84rem] bg-[var(--surface,#18181b)] max-h-[340px] md:max-h-[400px] scrollbar-thin scrollbar-thumb-[var(--border)]"
      >
        {/* Rendered & completed streams */}
        {renderedLines.map((line, idx) => {
          if (line.type === "gap") {
            return <div key={idx} className="h-4" />;
          }
          return (
            <div
              key={idx}
              className="tl font-mono mb-1.5 leading-relaxed flex items-start break-all"
            >
              {line.type === "bullet" && (
                <span className="t-bullet text-[var(--green,#22c55e)] mr-2 select-none">
                  ▸
                </span>
              )}
              <span className={getLineClass(line.type)}>{line.value}</span>
            </div>
          );
        })}

        {/* Dynamic character typing rendering block */}
        {isCurrentlyTyping && (
          <div className="tl font-mono mb-1.5 leading-relaxed flex items-start break-all">
            {config.sequence[activeMessageIndex].type === "bullet" && (
              <span className="t-bullet text-[var(--green,#22c55e)] mr-2 select-none">
                ▸
              </span>
            )}
            <span
              className={getLineClass(config.sequence[activeMessageIndex].type)}
            >
              {currentTypingText}
            </span>
            <span className="terminal-cursor w-1.5 h-4 bg-[var(--text2,#a1a1aa)] inline-block ml-1 animate-pulse self-center" />
          </div>
        )}
      </div>
    </div>
  );
}
