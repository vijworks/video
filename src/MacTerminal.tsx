import { AbsoluteFill } from "remotion";
import { TerminalContent } from "./TerminalContent";

export const MacTerminal: React.FC = () => {
  return (
    <AbsoluteFill className="p-8">
      <div
        className="w-full h-full flex flex-col rounded-xl overflow-hidden"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Title bar - dark theme */}
        <div className="h-12 bg-[#161b22] flex items-center px-4 border-b border-[#30363d]">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
          </div>
          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-[#8b949e] text-sm font-medium">
              AEOEngine.ai - Terminal
            </span>
          </div>
          {/* Spacer for symmetry */}
          <div className="w-14" />
        </div>

        <TerminalContent />
      </div>
    </AbsoluteFill>
  );
};
