import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

interface MetricTransition {
  label: string;
  before: string;
  after: string;
}

const METRICS: MetricTransition[] = [
  { label: "Site Authority", before: "12", after: "67" },
  { label: "AI Traffic", before: "234/mo", after: "4,850/mo" },
  { label: "Keywords Ranked", before: "47", after: "312" },
  { label: "LLM Citations", before: "0", after: "847" },
  { label: "Revenue Impact", before: "$0", after: "$42K/mo" },
];

// Animated number counter
const AnimatedValue: React.FC<{
  before: string;
  after: string;
  progress: number;
}> = ({ before, after, progress }) => {
  // For simple display, crossfade between values
  const beforeOpacity = interpolate(progress, [0, 0.3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(progress, [0.3, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative" }}>
      <span style={{ opacity: beforeOpacity, color: "#dc2626" }}>{before}</span>
      <span
        style={{
          position: "absolute",
          left: 0,
          opacity: afterOpacity,
          color: BRAND.green,
        }}
      >
        {after}
      </span>
    </div>
  );
};

const MetricRow: React.FC<{
  metric: MetricTransition;
  index: number;
  activationFrame: number;
}> = ({ metric, index, activationFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const metricDelay = activationFrame + fps * 0.3 + index * 8;

  const progress = interpolate(
    frame,
    [metricDelay, metricDelay + fps * 0.8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background color transition
  const bgColor = interpolate(
    progress,
    [0, 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: bgColor > 0.5 ? "#f0fdf4" : "#fef2f2",
        borderRadius: 8,
        marginBottom: 8,
        border: `1px solid ${bgColor > 0.5 ? "#bbf7d0" : "#fecaca"}`,
        transition: "background-color 0.3s, border-color 0.3s",
      }}
    >
      <span
        style={{
          fontSize: 14,
          color: BRAND.slate,
          fontWeight: 500,
          fontFamily: TYPOGRAPHY.fontFamily,
        }}
      >
        {metric.label}
      </span>
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          fontFamily: TYPOGRAPHY.fontFamily,
        }}
      >
        <AnimatedValue
          before={metric.before}
          after={metric.after}
          progress={progress}
        />
      </span>
    </div>
  );
};

// Particle burst effect
const Particle: React.FC<{
  angle: number;
  distance: number;
  delay: number;
  size: number;
  color: string;
}> = ({ angle, distance, delay, size, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame,
    [delay, delay + fps * 0.8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const x = Math.cos(angle) * distance * progress;
  const y = Math.sin(angle) * distance * progress;
  const opacity = interpolate(progress, [0, 0.2, 1], [0, 1, 0]);
  const scale = interpolate(progress, [0, 0.3, 1], [0, 1.5, 0.5]);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        opacity,
      }}
    />
  );
};

export const ActivationMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Button press happens immediately
  const buttonPressFrame = fps * 0.3;

  // Button press animation
  const buttonPress = spring({
    frame: frame - buttonPressFrame,
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.5 },
  });

  const buttonScale = interpolate(
    frame,
    [buttonPressFrame, buttonPressFrame + 3, buttonPressFrame + 10],
    [1, 0.9, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Shockwave/ripple effect
  const rippleProgress = interpolate(
    frame,
    [buttonPressFrame + 5, buttonPressFrame + fps * 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rippleScale = interpolate(rippleProgress, [0, 1], [0, 8]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0.8, 0.4, 0]);

  // Header text change
  const headerTransition = interpolate(
    frame,
    [buttonPressFrame + fps * 0.5, buttonPressFrame + fps * 0.8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background flash
  const flashOpacity = interpolate(
    frame,
    [buttonPressFrame, buttonPressFrame + 5, buttonPressFrame + fps * 0.3],
    [0, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Generate particles
  const particles = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    particles.push({
      angle,
      distance: 80 + Math.random() * 60,
      delay: buttonPressFrame + Math.random() * 5,
      size: 6 + Math.random() * 8,
      color: i % 2 === 0 ? BRAND.green : BRAND.navy,
    });
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        fontFamily: TYPOGRAPHY.fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: BRAND.green,
          opacity: flashOpacity,
        }}
      />

      {/* Success gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${BRAND.greenLight} 0%, transparent 60%)`,
          opacity: headerTransition,
        }}
      />

      <div
        style={{
          width: 480,
          padding: 32,
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 32,
            position: "relative",
          }}
        >
          {/* Before text */}
          <div
            style={{
              opacity: 1 - headerTransition,
              position: headerTransition > 0.5 ? "absolute" : "relative",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#dc2626",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Current Performance
            </div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: BRAND.slate,
                margin: 0,
              }}
            >
              Without AEO Engine
            </h2>
          </div>

          {/* After text */}
          <div
            style={{
              opacity: headerTransition,
              position: headerTransition < 0.5 ? "absolute" : "relative",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: BRAND.green,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              AEO Engine Activated
            </div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: BRAND.slate,
                margin: 0,
              }}
            >
              Performance Unlocked
            </h2>
          </div>
        </div>

        {/* Dashboard card */}
        <div
          style={{
            backgroundColor: BRAND.white,
            borderRadius: 16,
            padding: 24,
            boxShadow: `0 8px 32px rgba(0,0,0,0.08)`,
            border: `1px solid ${headerTransition > 0.5 ? "#bbf7d0" : BRAND.navyLight}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ripple effect */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: `3px solid ${BRAND.green}`,
              transform: `translate(-50%, -50%) scale(${rippleScale})`,
              opacity: rippleOpacity,
              pointerEvents: "none",
            }}
          />

          {/* Metrics */}
          {METRICS.map((metric, index) => (
            <MetricRow
              key={metric.label}
              metric={metric}
              index={index}
              activationFrame={buttonPressFrame}
            />
          ))}

          {/* Button with particles */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Particles */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {particles.map((p, i) => (
                <Particle key={i} {...p} />
              ))}
            </div>

            {/* Button */}
            <div
              style={{
                position: "relative",
                padding: "16px 40px",
                borderRadius: 12,
                backgroundColor: headerTransition > 0.5 ? BRAND.green : BRAND.navy,
                color: BRAND.white,
                fontSize: 18,
                fontWeight: 700,
                transform: `scale(${buttonScale})`,
                boxShadow: `0 0 30px ${headerTransition > 0.5 ? BRAND.green : BRAND.navy}60`,
                transition: "background-color 0.3s",
              }}
            >
              {headerTransition > 0.5 ? "ACTIVATED" : "ACTIVATE AEO ENGINE"}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
