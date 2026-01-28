import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

interface Stat {
  value: string;
  label: string;
  source?: string;
}

const STATS: Stat[] = [
  { value: "60%", label: "of Google searches no longer click a link" },
  { value: "9x", label: "higher conversion rate from AI-driven traffic", source: "Forbes" },
  { value: "920%", label: "average traffic growth across campaigns" },
  { value: "7x", label: "AI-driven traffic to stores", source: "TechCrunch" },
];

const StatCard: React.FC<{ stat: Stat; index: number; startFrame: number }> = ({
  stat,
  index,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * fps * 0.8;

  // Impact spring animation
  const impactSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 180,
      mass: 0.6,
    },
  });

  const scale = interpolate(
    impactSpring,
    [0, 1],
    [2, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle float animation after settling
  const floatPhase = Math.sin((frame - delay) * 0.05) * 2;

  // Label fade in
  const labelOpacity = interpolate(
    frame,
    [delay + fps * 0.3, delay + fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < delay) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        transform: `translateY(${floatPhase}px)`,
      }}
    >
      {/* The big stat value */}
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: BRAND.green,
            fontFamily: TYPOGRAPHY.fontFamily,
            textShadow: `0 4px 20px ${BRAND.greenLight}`,
          }}
        >
          {stat.value}
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          marginTop: 8,
          maxWidth: 200,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: BRAND.slate,
            fontFamily: TYPOGRAPHY.fontFamily,
            lineHeight: 1.4,
          }}
        >
          {stat.label}
        </span>
        {stat.source && (
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              color: BRAND.grey,
              fontWeight: 400,
            }}
          >
            — {stat.source}
          </div>
        )}
      </div>
    </div>
  );
};

export const StatsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background gradient animation
  const bgOpacity = interpolate(
    frame,
    [0, fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Headline fade in
  const headlineOpacity = interpolate(
    frame,
    [fps * 0.2, fps * 0.6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const headlineY = interpolate(
    frame,
    [fps * 0.2, fps * 0.6],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.white,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity * 0.5,
          background: `radial-gradient(circle at 30% 20%, ${BRAND.greenLight} 0%, transparent 50%),
                       radial-gradient(circle at 70% 80%, ${BRAND.navyLight} 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 40,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: BRAND.slate,
              margin: 0,
              marginBottom: 8,
            }}
          >
            The AI Revolution is Here
          </h2>
          <p
            style={{
              fontSize: 16,
              color: BRAND.grey,
              margin: 0,
            }}
          >
            And your competitors are already adapting.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            maxWidth: 600,
          }}
        >
          {STATS.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              startFrame={fps * 0.8}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
