import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

interface Metric {
  label: string;
  value: string;
  status: "bad" | "neutral";
}

const STRUGGLING_METRICS: Metric[] = [
  { label: "Site Authority", value: "12", status: "bad" },
  { label: "AI Traffic", value: "234/mo", status: "bad" },
  { label: "Keywords Ranked", value: "47", status: "neutral" },
  { label: "LLM Citations", value: "0", status: "bad" },
  { label: "Revenue Impact", value: "$0", status: "bad" },
];

const MetricRow: React.FC<{ metric: Metric; index: number; startFrame: number }> = ({
  metric,
  index,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * 6;

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateX = interpolate(slideIn, [0, 1], [-30, 0]);

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: metric.status === "bad" ? "#fef2f2" : BRAND.greyLight,
        borderRadius: 8,
        marginBottom: 8,
        border: `1px solid ${metric.status === "bad" ? "#fecaca" : BRAND.navyLight}`,
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
          color: metric.status === "bad" ? "#dc2626" : BRAND.grey,
          fontFamily: TYPOGRAPHY.fontFamily,
        }}
      >
        {metric.value}
      </span>
    </div>
  );
};

export const BeforeActivation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(
    frame,
    [fps * 0.2, fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Button appears after metrics
  const buttonDelay = fps * 2.5;
  const buttonSpring = spring({
    frame: frame - buttonDelay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 1.2 },
  });

  const buttonScale = interpolate(buttonSpring, [0, 1], [0.5, 1]);
  const buttonOpacity = interpolate(
    frame,
    [buttonDelay, buttonDelay + fps * 0.3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Button pulse animation
  const pulsePhase = Math.sin((frame - buttonDelay) * 0.15) * 0.5 + 0.5;
  const glowIntensity = interpolate(pulsePhase, [0, 1], [0.3, 0.8]);

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
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 30%, #fee2e220 0%, transparent 50%)`,
        }}
      />

      <div
        style={{
          width: 480,
          padding: 32,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: headerOpacity,
            textAlign: "center",
            marginBottom: 32,
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

        {/* Dashboard card */}
        <div
          style={{
            backgroundColor: BRAND.white,
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: `1px solid ${BRAND.navyLight}`,
          }}
        >
          {/* Metrics */}
          {STRUGGLING_METRICS.map((metric, index) => (
            <MetricRow
              key={metric.label}
              metric={metric}
              index={index}
              startFrame={fps * 0.6}
            />
          ))}

          {/* Activate button */}
          <div
            style={{
              marginTop: 24,
              opacity: buttonOpacity,
              transform: `scale(${buttonScale})`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                padding: "16px 40px",
                borderRadius: 12,
                backgroundColor: BRAND.navy,
                color: BRAND.white,
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 0 ${30 * glowIntensity}px ${BRAND.navy}60`,
              }}
            >
              {/* Glow effect */}
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${BRAND.green}40, ${BRAND.navy}40)`,
                  opacity: glowIntensity,
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
              />
              ACTIVATE AEO ENGINE
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
