import { ChatWidgetConfig } from "../types";
import { Cpu, MessageSquare } from "lucide-react";

interface ChatWidgetProps {
  config: ChatWidgetConfig;
}

export default function ChatWidget({ config }: ChatWidgetProps) {
  return (
    /* Changed h-[400px] to h-full so it matches the parent column height exactly */
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-xl flex flex-col h-full hover:border-border2/80 transition-all duration-300">
      {/* Control Bar Header */}
      <div className="px-5 py-3.5 bg-bg2/80 backdrop-blur-md border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center text-green font-bold text-xs shadow-inner">
            {config.initials}
          </div>
          <div>
            <div className="font-bold text-[11px] tracking-wide text-text leading-tight">
              {config.agentName}
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-green font-semibold mt-0.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              {config.status}
            </div>
          </div>
        </div>
        <div className="text-text3/70 p-1.5 rounded-lg bg-bg/40 border border-border/50">
          <MessageSquare size={13} />
        </div>
      </div>

      {/* Message Stream Area - Handles explicit internal overflow scrolling */}
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-surface/30 font-mono text-[11px] leading-relaxed select-none scrollbar-thin">
        {config.messages.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 max-w-[88%] ${
                isUser ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              {/* Avatar Icon Accent */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] shrink-0 font-bold border transition-colors shadow-sm ${
                  isUser
                    ? "bg-cyan/10 border-cyan/20 text-cyan"
                    : "bg-green/5 border-green/20 text-green"
                }`}
              >
                {isUser ? msg.icon || "👤" : <Cpu size={12} />}
              </div>

              {/* Speech Elements Group */}
              <div
                className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
              >
                {/* Meta Logging Label */}
                <span className="text-[8px] font-bold text-text3/70 uppercase tracking-widest px-1">
                  {msg.label}
                </span>

                {/* Text Bubble Layer */}
                <div
                  className={`p-3.5 rounded-xl border relative overflow-hidden transition-all shadow-sm ${
                    isUser
                      ? "bg-cyan/5 border-cyan/15 rounded-tr-none text-cyan"
                      : "bg-bg/40 border-border/70 rounded-tl-none text-text2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-green/40"
                  }`}
                >
                  {msg.bubble}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Mock Terminal Footer */}
      <div className="px-5 py-3.5 bg-bg2/80 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[9px] text-text3 shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-green/70">$</span>
          <span>sys_agent : execution_pipeline</span>
          <span className="w-1.5 h-3 bg-text3/50 inline-block animate-pulse ml-0.5" />
        </div>
        <span className="text-green uppercase tracking-wider font-bold bg-green/5 px-2 py-0.5 rounded border border-green/10 self-start sm:self-auto">
          ● ONLINE_COMMS_OK
        </span>
      </div>
    </div>
  );
}
