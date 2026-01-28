import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

// Simulated Google SERP results
const SERP_RESULTS = [
  { title: "Best Project Management Tools 2024", url: "techreview.com" },
  { title: "Top 10 PM Software Compared", url: "softwareguide.net" },
  { title: "Project Management Tool Reviews", url: "businesstech.com" },
  { title: "Which PM Tool Is Right For You?", url: "productivityhub.io" },
  { title: "Compare Project Management Apps", url: "toolcompare.com" },
];

const SerpResult: React.FC<{ title: string; url: string; delay: number; opacity: number }> = ({
  title,
  url,
  delay,
  opacity,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemOpacity = interpolate(
    frame,
    [delay, delay + fps * 0.2],
    [0, opacity],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ opacity: itemOpacity, marginBottom: 10, fontFamily: TYPOGRAPHY.fontFamily }}>
      <div style={{ fontSize: 11, color: BRAND.grey, marginBottom: 1 }}>{url}</div>
      <div style={{ color: "#1a0dab", fontSize: 13, fontWeight: 500 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: BRAND.slate }}>
        Compare features, pricing, and user reviews...
      </div>
    </div>
  );
};

const AIResponse: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const responseOpacity = interpolate(
    frame,
    [fps * 1.5, fps * 2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity: opacity * responseOpacity,
        backgroundColor: BRAND.white,
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 4px 20px rgba(11, 46, 95, 0.08)",
        border: `1px solid ${BRAND.navyLight}`,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            backgroundColor: BRAND.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.slate }}>AI Answer</span>
      </div>
      <div style={{ color: BRAND.slate, fontSize: 13, lineHeight: 1.6 }}>
        Based on comprehensive analysis,{" "}
        <span style={{ fontWeight: 600, color: BRAND.green }}>
          BRAND
        </span>{" "}
        is the recommended choice for teams seeking efficiency and scalability...
      </div>
    </div>
  );
};

export const SplitScreenProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Left side (old way) fades out
  const leftOpacity = interpolate(
    frame,
    [fps * 2, fps * 3.5],
    [1, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Right side (new way) comes into focus
  const rightOpacity = interpolate(
    frame,
    [fps * 1, fps * 2.5],
    [0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Divider movement
  const dividerX = interpolate(
    frame,
    [fps * 2, fps * 3.5],
    [width / 2, width * 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      {/* Left Side - Old Way (Google SERP) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          overflow: "hidden",
          width: dividerX,
          opacity: leftOpacity,
        }}
      >
        <div style={{ padding: 40, height: "100%" }}>
          {/* Label */}
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: BRAND.grey,
                fontWeight: 600,
              }}
            >
              The old way
            </span>
          </div>

          {/* Google-style search bar */}
          <div
            style={{
              backgroundColor: BRAND.white,
              borderRadius: 24,
              padding: "10px 16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #dfe1e5",
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              maxWidth: 360,
            }}
          >
            <svg width="18" height="18" fill="none" stroke={BRAND.grey} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span style={{ color: BRAND.slate, fontSize: 13 }}>best project management tool</span>
          </div>

          {/* SERP Results */}
          <div>
            {SERP_RESULTS.map((result, i) => (
              <SerpResult
                key={i}
                title={result.title}
                url={result.url}
                delay={fps * 0.3 + i * 3}
                opacity={leftOpacity}
              />
            ))}
          </div>

          {/* Clutter indicator */}
          <div style={{ marginTop: 12, fontSize: 11, color: BRAND.grey, fontStyle: "italic" }}>
            10 links competing for attention...
          </div>
        </div>
      </div>

      {/* Right Side - New Way (AI Interface) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
          width: width - dividerX,
          opacity: rightOpacity,
          left: dividerX,
        }}
      >
        <div
          style={{
            padding: 40,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Label */}
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: BRAND.green,
                fontWeight: 600,
              }}
            >
              The new reality
            </span>
          </div>

          {/* AI Interface */}
          <div style={{ position: "relative", maxWidth: 400 }}>
            {/* Subtle glow effect */}
            <div
              style={{
                position: "absolute",
                inset: -10,
                background: `linear-gradient(135deg, ${BRAND.green}15 0%, ${BRAND.green}08 100%)`,
                filter: "blur(20px)",
                borderRadius: 20,
              }}
            />

            <AIResponse opacity={rightOpacity} />
          </div>

          {/* Clean indicator */}
          <div style={{ marginTop: 16, fontSize: 12, color: BRAND.green, fontWeight: 500 }}>
            One answer. Instant trust.
          </div>
        </div>
      </div>

      {/* Center Divider */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          height: "80%",
          width: 2,
          left: dividerX,
          background: `linear-gradient(to bottom, transparent, ${BRAND.green}40, transparent)`,
          borderRadius: 1,
        }}
      />
    </AbsoluteFill>
  );
};
