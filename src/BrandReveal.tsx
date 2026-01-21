import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const PLATFORMS = [
  { name: "Google", color: "#4285f4" },
  { name: "ChatGPT", color: "#10a37f" },
  { name: "Claude", color: "#cc785c" },
  { name: "Perplexity", color: "#20b2aa" },
  { name: "Gemini", color: "#8e44ad" },
];

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline animation
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const headlineScale = interpolate(headlineSpring, [0, 1], [0.5, 1]);
  const headlineOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo animation
  const logoDelay = fps * 0.4;
  const logoSpring = spring({
    frame: frame - logoDelay,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const logoY = interpolate(logoSpring, [0, 1], [40, 0]);
  const logoOpacity = interpolate(
    frame,
    [logoDelay, logoDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Tagline animation
  const taglineDelay = fps * 0.8;
  const taglineOpacity = interpolate(
    frame,
    [taglineDelay, taglineDelay + fps * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Platform badges slide up
  const badgesDelay = fps * 1.2;

  // CTA animation
  const ctaDelay = fps * 1.8;
  const ctaOpacity = interpolate(
    frame,
    [ctaDelay, ctaDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Holographic shimmer effect for logo
  const shimmerOffset = (frame / fps) * 200;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 25% 25%, #667eea 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #764ba2 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            marginBottom: 32,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)",
              backgroundSize: "200% 200%",
              backgroundPosition: `${shimmerOffset}% 0%`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              margin: 0,
            }}
          >
            Own the AI Answer.
          </h1>
        </div>

        {/* Logo and brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginBottom: 24,
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
          }}
        >
          {/* Logo mark with holographic effect */}
          <div
            style={{
              position: "relative",
              width: 80,
              height: 80,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.5)",
            }}
          >
            {/* Holographic shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.4,
                background: `linear-gradient(${45 + shimmerOffset * 0.5}deg,
                  transparent 30%,
                  rgba(255,255,255,0.8) 50%,
                  transparent 70%)`,
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: 36,
                fontWeight: 700,
                position: "relative",
                zIndex: 10,
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              A
            </span>
          </div>

          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#1f2937",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                lineHeight: 1.1,
              }}
            >
              AEOEngine
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#6b7280",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              .ai
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ marginBottom: 32, opacity: taglineOpacity }}>
          <p
            style={{
              fontSize: 20,
              color: "#4b5563",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              margin: 0,
            }}
          >
            AI-Powered SEO That Makes You the{" "}
            <span style={{ fontWeight: 600, color: "#1f2937" }}>Trusted Source</span>
          </p>
        </div>

        {/* Platform badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {PLATFORMS.map((platform, i) => {
            const badgeDelay = badgesDelay + i * 4;
            const badgeSpring = spring({
              frame: frame - badgeDelay,
              fps,
              config: { damping: 20, stiffness: 150 },
            });

            const badgeY = interpolate(badgeSpring, [0, 1], [30, 0]);
            const badgeOpacity = interpolate(
              frame,
              [badgeDelay, badgeDelay + fps * 0.2],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  padding: "8px 16px",
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 500,
                  opacity: badgeOpacity,
                  transform: `translateY(${badgeY}px)`,
                  backgroundColor: `${platform.color}20`,
                  color: platform.color,
                  border: `1px solid ${platform.color}40`,
                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              >
                {platform.name}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{ opacity: ctaOpacity }}>
          {/* URL */}
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              aeoengine.ai
            </span>
          </div>

          {/* CTA Button */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                padding: "12px 24px",
                borderRadius: 9999,
                color: "white",
                fontWeight: 600,
                fontSize: 18,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 10px 30px -5px rgba(102, 126, 234, 0.5)",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Book Your Free Audit
            </div>
          </div>

          {/* Trust signal */}
          <div
            style={{
              fontSize: 14,
              color: "#9ca3af",
              marginTop: 16,
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Trusted by 50+ leading brands
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
