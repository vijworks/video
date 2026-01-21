import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// Simulated Google SERP results
const SERP_RESULTS = [
  { title: "Best Running Shoes 2024 - Top 10 Picks", url: "runnerworld.com" },
  { title: "Running Shoe Reviews & Comparisons", url: "shoeguide.net" },
  { title: "The Ultimate Running Shoe Guide", url: "athleticgear.com" },
  { title: "Expert Running Shoe Recommendations", url: "fitnessmag.com" },
  { title: "Compare Running Shoes - Best Deals", url: "shoedeals.com" },
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
    <div style={{ opacity: itemOpacity, marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>{url}</div>
      <div style={{ color: "#2563eb", fontSize: 14, fontWeight: 500 }}>
        {title}
      </div>
      <div style={{ fontSize: 12, color: "#4b5563" }}>
        Discover the best options with our comprehensive guide...
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
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            background: "linear-gradient(135deg, #34d399 0%, #14b8a6 100%)",
          }}
        />
        <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>AI Assistant</span>
      </div>
      <div style={{ color: "#1f2937", fontSize: 14, lineHeight: 1.6 }}>
        Based on expert reviews and user satisfaction data,{" "}
        <span style={{ fontWeight: 600, color: "#059669" }}>
          the top recommendation
        </span>{" "}
        is clear. Here's the definitive answer you're looking for...
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
    [fps * 2, fps * 3],
    [1, 0.15],
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
    [fps * 2, fps * 3],
    [width / 2, width * 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
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
        <div style={{ padding: 32, height: "100%" }}>
          {/* Label */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#9ca3af",
                fontWeight: 500,
              }}
            >
              The old way
            </span>
          </div>

          {/* Google-style search bar */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 9999,
              padding: "12px 20px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              maxWidth: 400,
            }}
          >
            <svg width="20" height="20" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span style={{ color: "#4b5563", fontSize: 14 }}>best running shoes for marathons</span>
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
          <div style={{ marginTop: 16, fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>
            10 competing links... which one to trust?
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
            padding: 32,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Label */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#10b981",
                fontWeight: 600,
              }}
            >
              The new reality
            </span>
          </div>

          {/* AI Interface */}
          <div style={{ position: "relative" }}>
            {/* Glow effect behind */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                background: "linear-gradient(135deg, rgba(52, 211, 153, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)",
                filter: "blur(40px)",
                borderRadius: 24,
              }}
            />

            <AIResponse opacity={rightOpacity} />
          </div>

          {/* Clean indicator */}
          <div style={{ marginTop: 16, fontSize: 12, color: "#10b981", fontWeight: 500 }}>
            One authoritative answer. Instant trust.
          </div>
        </div>
      </div>

      {/* Center Divider with glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
          width: 1,
          left: dividerX,
          background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.5), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
