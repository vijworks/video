import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

const LLMS = [
  { name: "ChatGPT", color: "#10a37f", prompts: 3240 },
  { name: "Claude", color: "#cc785c", prompts: 2180 },
  { name: "Perplexity", color: "#20b2aa", prompts: 2890 },
  { name: "Gemini", color: "#8e44ad", prompts: 2450 },
  { name: "Google AI", color: "#4285f4", prompts: 1640 },
];

const ScanningPrompt: React.FC<{
  index: number;
  startFrame: number;
  x: number;
  y: number;
}> = ({ index, startFrame, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * 2;

  const progress = interpolate(
    frame,
    [delay, delay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 0.3]);
  const scale = interpolate(progress, [0, 0.5, 1], [0, 1, 0.8]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: BRAND.green,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 0 10px ${BRAND.green}`,
      }}
    />
  );
};

const LLMCard: React.FC<{
  llm: typeof LLMS[0];
  index: number;
  startFrame: number;
}> = ({ llm, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * fps * 0.3;

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(slideIn, [0, 1], [20, 0]);

  // Scanning animation
  const scanProgress = interpolate(
    frame,
    [delay + fps * 0.5, delay + fps * 1.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scannedCount = Math.round(llm.prompts * scanProgress);

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        backgroundColor: BRAND.white,
        borderRadius: 10,
        padding: 14,
        border: `1px solid ${BRAND.navyLight}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* LLM indicator */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: llm.color,
          boxShadow: scanProgress > 0 ? `0 0 8px ${llm.color}` : "none",
        }}
      />

      {/* Name and count */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: BRAND.slate,
            fontFamily: TYPOGRAPHY.fontFamily,
          }}
        >
          {llm.name}
        </div>
        <div
          style={{
            fontSize: 11,
            color: BRAND.grey,
            fontFamily: TYPOGRAPHY.fontFamily,
          }}
        >
          {scannedCount.toLocaleString()} prompts scanned
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 60,
          height: 4,
          backgroundColor: BRAND.navyLight,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${scanProgress * 100}%`,
            height: "100%",
            backgroundColor: BRAND.green,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};

export const VisibilityMonitoring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(
    frame,
    [fps * 0.2, fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Result counter
  const resultDelay = fps * 2.5;
  const resultOpacity = interpolate(
    frame,
    [resultDelay, resultDelay + fps * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const totalPrompts = LLMS.reduce((sum, llm) => sum + llm.prompts, 0);
  const mentionedPrompts = 847;

  const countProgress = interpolate(
    frame,
    [resultDelay, resultDelay + fps * 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const displayedMentions = Math.round(mentionedPrompts * countProgress);
  const displayedTotal = Math.round(totalPrompts * countProgress);

  // Generate scanning dots
  const scanDots = [];
  for (let i = 0; i < 30; i++) {
    scanDots.push({
      x: 100 + Math.random() * (width - 200),
      y: 150 + Math.random() * (height - 300),
    });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.greyLight,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      {/* Scanning dots animation */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {scanDots.map((dot, i) => (
          <ScanningPrompt
            key={i}
            index={i}
            startFrame={fps * 0.8 + i * 3}
            x={dot.x}
            y={dot.y}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          padding: "40px 60px",
          gap: 60,
        }}
      >
        {/* Left side - Text content */}
        <div
          style={{
            flex: 1,
            opacity: headerOpacity,
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: BRAND.green,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Weekly Brand Scan
          </div>

          <h2
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: BRAND.slate,
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Monitoring 1000s of<br />
            Prompts Every Week
          </h2>

          <p
            style={{
              fontSize: 14,
              color: BRAND.grey,
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 300,
            }}
          >
            We track brand visibility across all major AI platforms,
            analyzing thousands of real user prompts weekly.
          </p>

          {/* Result card */}
          <div
            style={{
              marginTop: 24,
              padding: 20,
              backgroundColor: BRAND.white,
              borderRadius: 12,
              border: `2px solid ${BRAND.green}`,
              opacity: resultOpacity,
              maxWidth: 320,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: BRAND.grey,
                marginBottom: 8,
              }}
            >
              Scan Results
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: BRAND.green,
              }}
            >
              {displayedMentions.toLocaleString()}{" "}
              <span style={{ fontSize: 14, fontWeight: 500, color: BRAND.grey }}>
                of {displayedTotal.toLocaleString()} prompts
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: BRAND.slate,
                marginTop: 4,
              }}
            >
              Your brand was mentioned or recommended
            </div>
          </div>
        </div>

        {/* Right side - LLM cards */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxWidth: 320,
          }}
        >
          {LLMS.map((llm, index) => (
            <LLMCard
              key={llm.name}
              llm={llm}
              index={index}
              startFrame={fps * 0.6}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
