import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";

const AnnouncementText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div
        className="text-center"
        style={{
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 52,
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Own the AI Answer
        </span>
      </div>
    </AbsoluteFill>
  );
};

const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const translateY = interpolate(slideUp, [0, 1], [50, 0]);
  const opacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center">
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
        className="flex flex-col items-center gap-6"
      >
        {/* AEOEngine Logo/Text */}
        <div className="flex items-center gap-4">
          {/* Logo icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <span className="text-white text-4xl font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 48,
                fontWeight: 800,
                color: "#1f2937",
              }}
            >
              AEOEngine
            </span>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: "#6b7280",
              }}
            >
              AI Search SEO on Auto-Pilot
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          className="mt-4 flex items-center gap-3"
          style={{
            opacity: interpolate(frame, [fps * 0.5, fps * 0.8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span className="text-lg text-gray-500">Rank on</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Google
          </span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
            Bing
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ChatGPT
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Claude
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            Perplexity
          </span>
        </div>

        {/* URL */}
        <div
          className="mt-6"
          style={{
            opacity: interpolate(frame, [fps * 0.8, fps * 1.1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 24,
              fontWeight: 600,
              color: "#667eea",
            }}
          >
            aeoengine.ai
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LogoCombo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={60}>
        <AnnouncementText />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <BrandReveal />
      </Series.Sequence>
    </Series>
  );
};
