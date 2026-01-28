import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

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
  const logoDelay = fps * 0.3;
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
  const taglineDelay = fps * 0.6;
  const taglineOpacity = interpolate(
    frame,
    [taglineDelay, taglineDelay + fps * 0.4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // CTA animation
  const ctaDelay = fps * 0.9;
  const ctaOpacity = interpolate(
    frame,
    [ctaDelay, ctaDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BRAND.white,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${BRAND.greenLight} 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 70%, ${BRAND.navyLight} 0%, transparent 40%)`,
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            marginBottom: 28,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: BRAND.slate,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Own the{" "}
            <span
              style={{
                color: BRAND.green,
              }}
            >
              AI Answer
            </span>
          </h1>
        </div>

        {/* Brand name - text only */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: BRAND.slate,
              letterSpacing: "-0.02em",
            }}
          >
            AEO Engine
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: BRAND.grey,
              marginTop: 4,
            }}
          >
            aeoengine.ai
          </div>
        </div>

        {/* Tagline */}
        <div style={{ marginBottom: 28, opacity: taglineOpacity }}>
          <p
            style={{
              fontSize: 18,
              color: BRAND.grey,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Rank on Google.{" "}
            <span style={{ fontWeight: 600, color: BRAND.slate }}>
              Get recommended by AI.
            </span>
          </p>
        </div>

        {/* Platform badges - compact row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {PLATFORMS.map((platform, i) => {
            const badgeDelay = fps * 0.5 + i * 3;
            const badgeOpacity = interpolate(
              frame,
              [badgeDelay, badgeDelay + fps * 0.15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  padding: "6px 12px",
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 500,
                  opacity: badgeOpacity,
                  backgroundColor: `${platform.color}12`,
                  color: platform.color,
                  border: `1px solid ${platform.color}25`,
                }}
              >
                {platform.name}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{ opacity: ctaOpacity }}>
          {/* CTA Button - Navy for action */}
          <div
            style={{
              display: "inline-flex",
              padding: "14px 32px",
              borderRadius: 9999,
              color: BRAND.white,
              fontWeight: 600,
              fontSize: 16,
              backgroundColor: BRAND.navy,
              boxShadow: `0 12px 30px -5px ${BRAND.navy}40`,
            }}
          >
            Book Your Free Audit →
          </div>

          {/* Trust signal */}
          <div
            style={{
              fontSize: 12,
              color: BRAND.grey,
              marginTop: 14,
            }}
          >
            Join 50+ brands owning the AI answer
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
