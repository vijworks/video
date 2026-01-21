import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Cursor } from "./Cursor";

const AEO_LOGO = `
    _    _____ ___  _____             _
   / \\  | ____/ _ \\| ____|_ __   __ _(_)_ __   ___
  / _ \\ |  _|| | | |  _| | '_ \\ / _\` | | '_ \\ / _ \\
 / ___ \\| |__| |_| | |___| | | | (_| | | | | |  __/
/_/   \\_\\_____\\___/|_____|_| |_|\\__, |_|_| |_|\\___|
                                |___/              `;

const OUTPUT_LINES = [
  "",
  "┌  AEOEngine.ai",
  "│",
  "◇  Connecting to AI Search Optimization Engine...",
  "│",
  "◇  Analyzing your brand presence across:",
  "│     ✓ Google & Bing Search",
  "│     ✓ ChatGPT & GPT-4",
  "│     ✓ Claude & Anthropic",
  "│     ✓ Perplexity AI",
  "│     ✓ Google Gemini",
  "│",
  "●  Found 847 AI-generated answers mentioning competitors",
  "│",
  "◇  Optimization opportunities detected:",
  "│     → 12 high-impact content gaps",
  "│     → 34 citation opportunities",
  "│     → 156 answer ownership targets",
  "│",
  "└  Ready to dominate AI search. Auto-pilot engaged.",
];

export const TerminalContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const command = "npx aeoengine optimize --brand \"YourBrand\"";
  const charsPerSecond = 18;
  const framesPerChar = fps / charsPerSecond;

  const typingEndFrame = command.length * framesPerChar;
  const outputStartFrame = typingEndFrame + fps * 0.5;

  const visibleChars = Math.floor(
    interpolate(frame, [0, typingEndFrame], [0, command.length], {
      extrapolateRight: "clamp",
    })
  );

  const displayedText = command.slice(0, visibleChars);
  const isTyping = visibleChars < command.length;
  const showOutput = frame >= outputStartFrame;
  const framesPerLine = fps * 0.08;
  const logoFrame = outputStartFrame;
  const linesStartFrame = logoFrame + framesPerLine * 3;

  const visibleLines = Math.floor(
    interpolate(
      frame,
      [linesStartFrame, linesStartFrame + OUTPUT_LINES.length * framesPerLine],
      [0, OUTPUT_LINES.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  return (
    <div className="flex-1 bg-[#0d1117] p-6 font-mono text-2xl overflow-hidden">
      <div className="flex items-center text-[#c9d1d9]">
        <span className="text-[#7ee787] font-semibold">~</span>
        <span className="text-[#c9d1d9] mx-2">$</span>
        <span className="text-[#79c0ff]">{displayedText}</span>
        {!showOutput && <Cursor blinking={!isTyping} />}
      </div>

      {showOutput && (
        <div className="mt-4 text-lg leading-relaxed">
          <pre className="text-[#58a6ff] text-sm">{AEO_LOGO}</pre>
          {OUTPUT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={
                line.includes("●")
                  ? "text-[#f97583]"
                  : line.includes("✓")
                  ? "text-[#7ee787]"
                  : line.includes("→")
                  ? "text-[#d2a8ff]"
                  : "text-[#c9d1d9]"
              }
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
