import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
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
    <AbsoluteFill className="flex items-center justify-center pointer-events-none">
      <div
        className="text-center"
        style={{
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
            className="font-black"
            style={{
              fontSize: 140,
              background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 80px rgba(244, 63, 94, 0.4)",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            60%
          </span>
        </div>

        {/* Supporting text */}
        <div
          style={{ opacity: textOpacity }}
          className="mt-2"
        >
          <span
            className="text-2xl font-medium text-slate-600"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            of searches{" "}
            <span className="text-slate-800 font-semibold">never click a link</span>{" "}
            anymore.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
