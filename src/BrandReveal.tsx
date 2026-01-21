import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
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
    <AbsoluteFill className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #667eea 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #764ba2 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
          }}
          className="mb-8"
        >
          <h1
            className="font-black tracking-tight"
            style={{
              fontSize: 72,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)",
              backgroundSize: "200% 200%",
              backgroundPosition: `${shimmerOffset}% 0%`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Own the AI Answer.
          </h1>
        </div>

        {/* Logo and brand name */}
        <div
          className="flex items-center justify-center gap-5 mb-6"
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
          }}
        >
          {/* Logo mark with holographic effect */}
          <div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.5)",
            }}
          >
            {/* Holographic shimmer */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `linear-gradient(${45 + shimmerOffset * 0.5}deg,
                  transparent 30%,
                  rgba(255,255,255,0.8) 50%,
                  transparent 70%)`,
              }}
            />
            <span className="text-white text-4xl font-bold relative z-10">A</span>
          </div>

          <div className="text-left">
            <div
              className="font-bold text-gray-900"
              style={{
                fontSize: 42,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              AEOEngine
            </div>
            <div
              className="text-gray-500 font-medium"
              style={{
                fontSize: 16,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              .ai
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div
          className="mb-8"
          style={{ opacity: taglineOpacity }}
        >
          <p
            className="text-xl text-gray-600"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            AI-Powered SEO That Makes You the{" "}
            <span className="font-semibold text-gray-800">Trusted Source</span>
          </p>
        </div>

        {/* Platform badges */}
        <div className="flex items-center justify-center gap-3 mb-10">
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
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  opacity: badgeOpacity,
                  transform: `translateY(${badgeY}px)`,
                  backgroundColor: `${platform.color}15`,
                  color: platform.color,
                  border: `1px solid ${platform.color}30`,
                }}
              >
                {platform.name}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className="space-y-4"
          style={{ opacity: ctaOpacity }}
        >
          {/* URL */}
          <div>
            <span
              className="text-2xl font-semibold"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              aeoengine.ai
            </span>
          </div>

          {/* CTA Button */}
          <div className="inline-flex items-center gap-2">
            <div
              className="px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 10px 30px -5px rgba(102, 126, 234, 0.5)",
              }}
            >
              Book Your Free Audit
            </div>
          </div>

          {/* Trust signal */}
          <div className="text-sm text-gray-400 mt-4">
            Trusted by 50+ leading brands
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
