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
    <div style={{ opacity: itemOpacity }} className="mb-3">
      <div className="text-xs text-gray-500 mb-0.5">{url}</div>
      <div className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
        {title}
      </div>
      <div className="text-xs text-gray-600">
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
      style={{ opacity: opacity * responseOpacity }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
        <span className="text-sm font-medium text-gray-700">AI Assistant</span>
      </div>
      <div className="text-gray-800 text-sm leading-relaxed">
        Based on expert reviews and user satisfaction data,{" "}
        <span className="font-semibold text-emerald-600">
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
    <AbsoluteFill className="bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left Side - Old Way (Google SERP) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: dividerX, opacity: leftOpacity }}
      >
        <div className="p-8 h-full">
          {/* Label */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              The old way
            </span>
          </div>

          {/* Google-style search bar */}
          <div className="bg-white rounded-full px-5 py-3 shadow-md border border-gray-200 flex items-center gap-3 mb-6 max-w-md">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-600 text-sm">best running shoes for marathons</span>
          </div>

          {/* SERP Results */}
          <div className="space-y-1">
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
          <div className="mt-4 text-xs text-gray-400 italic">
            10 competing links... which one to trust?
          </div>
        </div>
      </div>

      {/* Right Side - New Way (AI Interface) */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{
          width: width - dividerX,
          opacity: rightOpacity,
          left: dividerX
        }}
      >
        <div className="p-8 h-full flex flex-col justify-center">
          {/* Label */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-emerald-500 font-semibold">
              The new reality
            </span>
          </div>

          {/* AI Interface */}
          <div className="relative">
            {/* Glow effect behind */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-3xl rounded-3xl"
              style={{ transform: "scale(1.1)" }}
            />

            <AIResponse opacity={rightOpacity} />
          </div>

          {/* Clean indicator */}
          <div className="mt-4 text-xs text-emerald-500 font-medium">
            One authoritative answer. Instant trust.
          </div>
        </div>
      </div>

      {/* Center Divider with glow */}
      <div
        className="absolute top-0 h-full w-px"
        style={{
          left: dividerX,
          background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.5), transparent)"
        }}
      />
    </AbsoluteFill>
  );
};
