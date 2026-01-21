import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const KineticStat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Delay before stat appears
  const startFrame = fps * 2.5;

  // Impact scale animation - starts big, slams down
  const impactSpring = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const scale = interpolate(
    impactSpring,
    [0, 1],
    [2.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fps * 0.1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle shake on impact
  const shakeIntensity = interpolate(
    frame,
    [startFrame, startFrame + fps * 0.15, startFrame + fps * 0.3],
    [0, 4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const shakeX = Math.sin(frame * 2) * shakeIntensity;
  const shakeY = Math.cos(frame * 3) * shakeIntensity * 0.5;

  // Text fade in for supporting copy
  const textOpacity = interpolate(
    frame,
    [startFrame + fps * 0.4, startFrame + fps * 0.7],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame) return null;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* The big stat */}
        <div
          style={{
            opacity,
            transform: `scale(${scale})`,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            60%
          </span>
        </div>

        {/* Supporting text */}
        <div style={{ opacity: textOpacity, marginTop: 8 }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#475569",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            of searches{" "}
            <span style={{ color: "#1e293b", fontWeight: 600 }}>never click a link</span>{" "}
            anymore.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
