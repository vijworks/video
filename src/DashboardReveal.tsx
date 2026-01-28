import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

// Mock data for dashboard charts
const CHART_DATA = [35, 45, 42, 58, 65, 72, 85, 92, 88, 95, 102, 115];

const MiniChart: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartWidth = 200;
  const chartHeight = 60;
  const barWidth = 12;
  const gap = 4;

  return (
    <svg width={chartWidth} height={chartHeight}>
      {CHART_DATA.map((value, i) => {
        const barHeight = (value / 120) * chartHeight;
        const x = i * (barWidth + gap);
        const y = chartHeight - barHeight;

        const barProgress = interpolate(
          frame,
          [startFrame + i * 2, startFrame + i * 2 + fps * 0.3],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <rect
            key={i}
            x={x}
            y={y + barHeight * (1 - barProgress)}
            width={barWidth}
            height={barHeight * barProgress}
            rx={3}
            fill={i >= CHART_DATA.length - 3 ? BRAND.green : BRAND.navy}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  change: string;
  positive: boolean;
  delay: number;
}> = ({ label, value, change, positive, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const scale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        backgroundColor: BRAND.white,
        borderRadius: 10,
        padding: 16,
        border: `1px solid ${BRAND.navyLight}`,
        boxShadow: "0 2px 10px rgba(11, 46, 95, 0.05)",
      }}
    >
      <div style={{ fontSize: 10, color: BRAND.grey, marginBottom: 4, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.slate, marginBottom: 2 }}>
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: positive ? BRAND.green : "#ef4444",
          fontWeight: 600,
        }}
      >
        {change}
      </div>
    </div>
  );
};

export const DashboardReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Dashboard container animation
  const containerSpring = spring({
    frame: frame - fps * 0.2,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const containerScale = interpolate(containerSpring, [0, 1], [0.9, 1]);
  const containerOpacity = interpolate(
    frame,
    [fps * 0.2, fps * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Shadow/depth animation
  const shadowIntensity = interpolate(
    frame,
    [fps * 0.5, fps * 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.greyLight,
        fontFamily: TYPOGRAPHY.fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          background: `radial-gradient(ellipse, ${BRAND.greenLight} 0%, transparent 70%)`,
          opacity: 0.5,
        }}
      />

      {/* Dashboard mockup container */}
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          width: width * 0.85,
          maxWidth: 720,
          backgroundColor: BRAND.white,
          borderRadius: 16,
          boxShadow: `0 ${20 * shadowIntensity}px ${60 * shadowIntensity}px rgba(11, 46, 95, ${0.15 * shadowIntensity})`,
          border: `1px solid ${BRAND.navyLight}`,
          overflow: "hidden",
        }}
      >
        {/* Dashboard header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${BRAND.navyLight}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Logo placeholder */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: BRAND.navy,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.slate }}>
              AEO Engine
            </span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: BRAND.green,
              }}
            />
            <span style={{ fontSize: 11, color: BRAND.grey }}>Live Monitoring</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div style={{ padding: 24 }}>
          {/* Metrics row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <MetricCard
              label="AI Visibility Score"
              value="92"
              change="+12 this week"
              positive={true}
              delay={fps * 0.6}
            />
            <MetricCard
              label="Brand Mentions"
              value="847"
              change="+156 today"
              positive={true}
              delay={fps * 0.8}
            />
            <MetricCard
              label="Recommendation Rate"
              value="73%"
              change="+8% vs last month"
              positive={true}
              delay={fps * 1}
            />
            <MetricCard
              label="Competitor Gap"
              value="+24"
              change="Leading category"
              positive={true}
              delay={fps * 1.2}
            />
          </div>

          {/* Chart section */}
          <div
            style={{
              backgroundColor: BRAND.greyLight,
              borderRadius: 10,
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: BRAND.grey, marginBottom: 4 }}>
                AI Traffic Trend
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.slate }}>
                +234% Growth
              </div>
            </div>
            <MiniChart startFrame={fps * 1.4} />
          </div>
        </div>
      </div>

      {/* Tagline below dashboard */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: interpolate(
              frame,
              [fps * 2, fps * 2.5],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            fontSize: 14,
            color: BRAND.grey,
            fontWeight: 500,
          }}
        >
          Your command center for AI visibility
        </div>
      </div>
    </AbsoluteFill>
  );
};
