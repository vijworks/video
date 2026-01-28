import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, TYPOGRAPHY } from "./brandColors";

interface Notification {
  platform: string;
  platformColor: string;
  title: string;
  message: string;
  icon: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    platform: "ChatGPT",
    platformColor: "#10a37f",
    title: "Brand Mention Detected",
    message: "Your brand was recommended in response to 'best project management tools'",
    icon: "🎯",
  },
  {
    platform: "Perplexity",
    platformColor: "#20b2aa",
    title: "Featured Answer",
    message: "Your product ranked #1 for 'enterprise software comparison'",
    icon: "🏆",
  },
  {
    platform: "Google AI",
    platformColor: "#4285f4",
    title: "AI Overview Inclusion",
    message: "Included in AI-generated answer for 12 new queries",
    icon: "✨",
  },
  {
    platform: "Claude",
    platformColor: "#cc785c",
    title: "Authority Citation",
    message: "Referenced as industry leader in technical discussions",
    icon: "📚",
  },
];

const NotificationCard: React.FC<{
  notification: Notification;
  index: number;
  startFrame: number;
}> = ({ notification, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * fps * 0.6;

  // Slide in from right
  const slideSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 120,
      mass: 0.8,
    },
  });

  const translateX = interpolate(
    slideSpring,
    [0, 1],
    [300, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle hover/glow effect
  const glowIntensity = interpolate(
    Math.sin((frame - delay) * 0.1),
    [-1, 1],
    [0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          backgroundColor: BRAND.white,
          borderRadius: 12,
          padding: 16,
          boxShadow: `0 4px 20px rgba(11, 46, 95, ${0.08 * glowIntensity})`,
          border: `1px solid ${BRAND.navyLight}`,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          maxWidth: 340,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            backgroundColor: `${notification.platformColor}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {notification.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Platform badge */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: `${notification.platformColor}15`,
              color: notification.platformColor,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 10,
              marginBottom: 4,
              fontFamily: TYPOGRAPHY.fontFamily,
            }}
          >
            {notification.platform}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: BRAND.slate,
              marginBottom: 2,
              fontFamily: TYPOGRAPHY.fontFamily,
            }}
          >
            {notification.title}
          </div>

          {/* Message */}
          <div
            style={{
              fontSize: 11,
              color: BRAND.grey,
              lineHeight: 1.4,
              fontFamily: TYPOGRAPHY.fontFamily,
            }}
          >
            {notification.message}
          </div>
        </div>

        {/* Green dot indicator */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: BRAND.green,
            flexShrink: 0,
            marginTop: 4,
          }}
        />
      </div>
    </div>
  );
};

export const NotificationsStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left side text animation
  const textOpacity = interpolate(
    frame,
    [fps * 0.3, fps * 0.7],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textY = interpolate(
    frame,
    [fps * 0.3, fps * 0.7],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.greyLight,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}
    >
      {/* Background gradient accents */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${BRAND.greenLight} 0%, transparent 70%)`,
          opacity: 0.6,
        }}
      />

      {/* Main layout */}
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          padding: "40px 60px",
          gap: 60,
        }}
      >
        {/* Left side - Text content */}
        <div
          style={{
            flex: 1,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: BRAND.green,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Real-Time Monitoring
          </div>

          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: BRAND.slate,
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Know When AI<br />
            Talks About You
          </h2>

          <p
            style={{
              fontSize: 15,
              color: BRAND.grey,
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 280,
            }}
          >
            Get instant alerts when your brand is mentioned,
            recommended, or cited across every major AI platform.
          </p>

          {/* Platform logos */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            {["Google", "ChatGPT", "Perplexity", "Claude", "Gemini"].map((platform, i) => {
              const platformOpacity = interpolate(
                frame,
                [fps * 1.5 + i * 3, fps * 1.7 + i * 3],
                [0, 0.7],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={platform}
                  style={{
                    opacity: platformOpacity,
                    fontSize: 10,
                    color: BRAND.grey,
                    padding: "4px 10px",
                    backgroundColor: BRAND.white,
                    borderRadius: 12,
                    border: `1px solid ${BRAND.navyLight}`,
                  }}
                >
                  {platform}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Notification stack */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {NOTIFICATIONS.map((notification, index) => (
            <NotificationCard
              key={index}
              notification={notification}
              index={index}
              startFrame={fps * 0.5}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
