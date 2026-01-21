import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const CHECKMARKS = [
  { text: "Content Optimized", delay: 0 },
  { text: "Authority Signals Built", delay: 0.3 },
  { text: "AI Trust Established", delay: 0.6 },
];

const Checkmark: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = fps * (1.5 + delay);

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  if (frame < startFrame) return null;

  return (
    <div
      className="flex items-center gap-2 text-sm"
      style={{ opacity, transform: `scale(${interpolate(scale, [0, 1], [0.8, 1])})` }}
    >
      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-emerald-600 font-medium">{text}</span>
    </div>
  );
};

export const AIInterface: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Interface slide in
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const translateY = interpolate(slideIn, [0, 1], [60, 0]);
  const opacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing animation for prompt
  const promptText = 'What\'s the best project management tool for teams?';
  const promptStartFrame = fps * 0.5;
  const charsPerSecond = 25;
  const framesPerChar = fps / charsPerSecond;
  const promptChars = Math.floor(
    interpolate(
      frame,
      [promptStartFrame, promptStartFrame + promptText.length * framesPerChar],
      [0, promptText.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );
  const displayedPrompt = promptText.slice(0, promptChars);

  // Response typing
  const responseStartFrame = promptStartFrame + promptText.length * framesPerChar + fps * 0.3;
  const responsePart1 = "Based on extensive analysis and user satisfaction data, ";
  const brandName = "YourBrand";
  const responsePart2 = " stands out as the leading choice. It offers...";

  const responseChars = Math.floor(
    interpolate(
      frame,
      [responseStartFrame, responseStartFrame + (responsePart1.length + brandName.length + responsePart2.length) * framesPerChar],
      [0, responsePart1.length + brandName.length + responsePart2.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  // Calculate which part of response to show
  let displayedResponse = "";
  let showBrandGlow = false;
  let brandFullyRevealed = false;

  if (responseChars > 0) {
    if (responseChars <= responsePart1.length) {
      displayedResponse = responsePart1.slice(0, responseChars);
    } else if (responseChars <= responsePart1.length + brandName.length) {
      displayedResponse = responsePart1;
      const brandChars = responseChars - responsePart1.length;
      displayedResponse += brandName.slice(0, brandChars);
      showBrandGlow = true;
      brandFullyRevealed = brandChars >= brandName.length;
    } else {
      displayedResponse = responsePart1 + brandName + responsePart2.slice(0, responseChars - responsePart1.length - brandName.length);
      showBrandGlow = true;
      brandFullyRevealed = true;
    }
  }

  // The "chosen moment" glow effect
  const glowIntensity = brandFullyRevealed
    ? interpolate(
        frame,
        [responseStartFrame + (responsePart1.length + brandName.length) * framesPerChar,
         responseStartFrame + (responsePart1.length + brandName.length) * framesPerChar + fps * 0.5],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <AbsoluteFill className="flex items-center justify-center p-16">
      <div
        className="w-full max-w-2xl"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* Glassmorphism chat container */}
        <div
          className="rounded-3xl p-6 shadow-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800">AI Assistant</div>
              <div className="text-xs text-emerald-500">Powered by AEO Engine</div>
            </div>
          </div>

          {/* User prompt */}
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                U
              </div>
              <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
                <span className="text-gray-700">{displayedPrompt}</span>
                {promptChars < promptText.length && (
                  <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* AI Response */}
          {responseChars > 0 && (
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div
                  className="flex-1 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl rounded-tl-sm px-4 py-3 relative overflow-hidden"
                  style={{
                    boxShadow: glowIntensity > 0
                      ? `0 0 ${30 * glowIntensity}px rgba(16, 185, 129, ${0.4 * glowIntensity})`
                      : "none",
                  }}
                >
                  {/* Glow pulse effect */}
                  {glowIntensity > 0 && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent"
                      style={{
                        opacity: glowIntensity * 0.5,
                        transform: `translateX(${Math.sin(frame * 0.1) * 20}%)`,
                      }}
                    />
                  )}

                  <span className="text-gray-700 relative z-10">
                    {responsePart1.slice(0, Math.min(responseChars, responsePart1.length))}
                    {responseChars > responsePart1.length && (
                      <span
                        className="font-bold relative"
                        style={{
                          background: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textShadow: glowIntensity > 0 ? `0 0 ${20 * glowIntensity}px rgba(16, 185, 129, 0.8)` : "none",
                        }}
                      >
                        {brandName.slice(0, Math.min(responseChars - responsePart1.length, brandName.length))}
                      </span>
                    )}
                    {responseChars > responsePart1.length + brandName.length &&
                      responsePart2.slice(0, responseChars - responsePart1.length - brandName.length)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating checkmarks */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-3">
          {CHECKMARKS.map((item, i) => (
            <Checkmark key={i} text={item.text} delay={item.delay} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
