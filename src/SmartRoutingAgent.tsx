import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

interface UncitedPrompt {
  query: string;
  platform: string;
}

const UNCITED_PROMPTS: UncitedPrompt[] = [
  { query: "best enterprise CRM software", platform: "ChatGPT" },
  { query: "top marketing automation tools", platform: "Claude" },
  { query: "project management comparison", platform: "Perplexity" },
];

const ContentBrief: React.FC<{
  title: string;
  index: number;
  startFrame: number;
}> = ({ title, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * fps * 0.25;

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(slideIn, [0, 1], [20, 0]);

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: 12,
        backgroundColor: BRAND.white,
        borderRadius: 8,
        border: `1px solid ${BRAND.greenLight}`,
        borderLeft: `3px solid ${BRAND.green}`,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: BRAND.green,
          fontWeight: 600,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Content Brief Generated
      </div>
      <div
        style={{
          fontSize: 12,
          color: BRAND.slate,
          fontWeight: 500,
          fontFamily: TYPOGRAPHY.fontFamily,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const PromptCard: React.FC<{
  prompt: UncitedPrompt;
  index: number;
  startFrame: number;
}> = ({ prompt, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * fps * 0.4;

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

  const translateX = interpolate(slideIn, [0, 1], [-30, 0]);

  // Flag animation
  const flagDelay = delay + fps * 0.3;
  const flagOpacity = interpolate(
    frame,
    [flagDelay, flagDelay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow animation
  const arrowDelay = delay + fps * 0.6;
  const arrowProgress = interpolate(
    frame,
    [arrowDelay, arrowDelay + fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
      }}
    >
      {/* Prompt card */}
      <div
        style={{
          flex: 1,
          padding: 12,
          backgroundColor: "#fef2f2",
          borderRadius: 8,
          border: "1px solid #fecaca",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: BRAND.grey,
            marginBottom: 4,
          }}
        >
          {prompt.platform}
        </div>
        <div
          style={{
            fontSize: 12,
            color: BRAND.slate,
            fontWeight: 500,
            fontFamily: TYPOGRAPHY.fontFamily,
          }}
        >
          "{prompt.query}"
        </div>

        {/* Not cited flag */}
        <div
          style={{
            position: "absolute",
            top: -8,
            right: 8,
            padding: "2px 8px",
            backgroundColor: "#dc2626",
            borderRadius: 4,
            fontSize: 9,
            color: "white",
            fontWeight: 600,
            opacity: flagOpacity,
          }}
        >
          NOT CITED
        </div>
      </div>

      {/* Arrow */}
      <div
        style={{
          width: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: arrowProgress,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={BRAND.green}
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export const SmartRoutingAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(
    frame,
    [fps * 0.2, fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const headerY = interpolate(
    frame,
    [fps * 0.2, fps * 0.5],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Blog Manager panel animation
  const panelDelay = fps * 1.2;
  const panelOpacity = interpolate(
    frame,
    [panelDelay, panelDelay + fps * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const panelSlide = spring({
    frame: frame - panelDelay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const panelX = interpolate(panelSlide, [0, 1], [50, 0]);

  // Pulsing agent indicator
  const pulsePhase = Math.sin(frame * 0.15) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 70% 50%, ${BRAND.greenLight} 0%, transparent 50%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          padding: "40px 50px",
          gap: 40,
        }}
      >
        {/* Left side - Agent header and prompts */}
        <div style={{ flex: 1 }}>
          {/* Agent header */}
          <div
            style={{
              opacity: headerOpacity,
              transform: `translateY(${headerY}px)`,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                backgroundColor: BRAND.navy,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              {/* Pulsing dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: BRAND.green,
                  boxShadow: `0 0 ${10 + pulsePhase * 10}px ${BRAND.green}`,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: BRAND.white,
                  letterSpacing: "0.02em",
                }}
              >
                SMART ROUTING AGENT
              </span>
            </div>

            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: BRAND.slate,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Uncited Prompts?<br />
              <span style={{ color: BRAND.green }}>We Fix That.</span>
            </h2>
          </div>

          {/* Uncited prompts */}
          <div>
            {UNCITED_PROMPTS.map((prompt, index) => (
              <PromptCard
                key={index}
                prompt={prompt}
                index={index}
                startFrame={fps * 0.8}
              />
            ))}
          </div>
        </div>

        {/* Right side - Blog Manager panel */}
        <div
          style={{
            flex: 1,
            opacity: panelOpacity,
            transform: `translateX(${panelX}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: BRAND.white,
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              border: `1px solid ${BRAND.navyLight}`,
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: `1px solid ${BRAND.navyLight}`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: BRAND.green,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: BRAND.slate,
                  }}
                >
                  Blog Manager
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: BRAND.grey,
                  }}
                >
                  Content Creation Campaign
                </div>
              </div>
            </div>

            {/* Content briefs */}
            <ContentBrief
              title="10 Best Enterprise CRM Solutions for 2025"
              index={0}
              startFrame={fps * 2}
            />
            <ContentBrief
              title="Marketing Automation: Complete Buyer's Guide"
              index={1}
              startFrame={fps * 2}
            />
            <ContentBrief
              title="Project Management Tools Compared: Expert Review"
              index={2}
              startFrame={fps * 2}
            />

            {/* Auto-generating indicator */}
            <div
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: BRAND.greyLight,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: BRAND.green,
                  animation: "pulse 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: BRAND.grey,
                }}
              >
                Auto-generating optimized content...
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
