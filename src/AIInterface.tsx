import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
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
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        opacity,
        transform: `scale(${interpolate(scale, [0, 1], [0.8, 1])})`,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#10b981",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span style={{ color: "#059669", fontWeight: 500 }}>{text}</span>
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
  const promptText = "What's the best project management tool for teams?";
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

  // The "chosen moment" glow effect
  const brandFullyRevealed = responseChars > responsePart1.length + brandName.length;
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
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 64,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 672,
          opacity,
          transform: `translateY(${translateY}px)`,
          position: "relative",
        }}
      >
        {/* Glassmorphism chat container */}
        <div
          style={{
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: "linear-gradient(135deg, #34d399 0%, #14b8a6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#1f2937" }}>AI Assistant</div>
              <div style={{ fontSize: 12, color: "#10b981" }}>Powered by AEO Engine</div>
            </div>
          </div>

          {/* User prompt */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #60a5fa 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                U
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#f9fafb",
                  borderRadius: 16,
                  borderTopLeftRadius: 4,
                  padding: "12px 16px",
                }}
              >
                <span style={{ color: "#374151" }}>{displayedPrompt}</span>
                {promptChars < promptText.length && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: 16,
                      backgroundColor: "#9ca3af",
                      marginLeft: 2,
                      animation: "pulse 1s infinite",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* AI Response */}
          {responseChars > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #34d399 0%, #14b8a6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)",
                    borderRadius: 16,
                    borderTopLeftRadius: 4,
                    padding: "12px 16px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: glowIntensity > 0
                      ? `0 0 ${30 * glowIntensity}px rgba(16, 185, 129, ${0.4 * glowIntensity})`
                      : "none",
                  }}
                >
                  {/* Glow pulse effect */}
                  {glowIntensity > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to right, transparent, rgba(167, 243, 208, 0.5), transparent)",
                        opacity: glowIntensity * 0.5,
                        transform: `translateX(${Math.sin(frame * 0.1) * 20}%)`,
                      }}
                    />
                  )}

                  <span style={{ color: "#374151", position: "relative", zIndex: 10 }}>
                    {responsePart1.slice(0, Math.min(responseChars, responsePart1.length))}
                    {responseChars > responsePart1.length && (
                      <span
                        style={{
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
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
        <div
          style={{
            position: "absolute",
            right: -180,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {CHECKMARKS.map((item, i) => (
            <Checkmark key={i} text={item.text} delay={item.delay} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
