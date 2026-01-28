import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { SplitScreenProblem } from "./SplitScreenProblem";
import { StatsShowcase } from "./StatsShowcase";
import { NotificationsStack } from "./NotificationsStack";
import { DashboardReveal } from "./DashboardReveal";
import { BrandReveal } from "./BrandReveal";
import { BRAND } from "./brandColors";

// Timing constants (in seconds) - Total: 18 seconds
const ACT1_DURATION = 4;      // The Shift: Split screen old vs new
const ACT2_DURATION = 5;      // The Stats: All 4 stats showcase
const ACT3_DURATION = 5;      // Platform in Action: Notifications
const ACT4_DURATION = 3;      // Dashboard Reveal
const ACT5_DURATION = 5;      // Brand & CTA (extended for visibility)

export const Master: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame calculations
  const act1Frames = Math.round(ACT1_DURATION * fps);
  const act2Frames = Math.round(ACT2_DURATION * fps);
  const act3Frames = Math.round(ACT3_DURATION * fps);
  const act4Frames = Math.round(ACT4_DURATION * fps);
  const act5Frames = Math.round(ACT5_DURATION * fps);

  const act2Start = act1Frames;
  const act3Start = act2Start + act2Frames;
  const act4Start = act3Start + act3Frames;
  const act5Start = act4Start + act4Frames;

  // Transition overlays for smooth act changes
  const transitionDuration = fps * 0.4;

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.white }}>
      {/* ACT 1: The Shift (0-4s) - Split screen old vs new */}
      <Sequence durationInFrames={act1Frames + Math.round(transitionDuration)}>
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [act1Frames - transitionDuration, act1Frames],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <SplitScreenProblem />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 2: The Stats (4-9s) - All 4 stats showcase */}
      <Sequence
        from={act2Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act2Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [
                act2Start - transitionDuration * 0.5,
                act2Start + transitionDuration * 0.5,
                act3Start - transitionDuration,
                act3Start,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <StatsShowcase />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 3: Platform in Action (9-14s) - Notifications */}
      <Sequence
        from={act3Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act3Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [
                act3Start - transitionDuration * 0.5,
                act3Start + transitionDuration * 0.5,
                act4Start - transitionDuration,
                act4Start,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <NotificationsStack />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 4: Dashboard Reveal (14-17s) */}
      <Sequence
        from={act4Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act4Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [
                act4Start - transitionDuration * 0.5,
                act4Start + transitionDuration * 0.5,
                act5Start - transitionDuration,
                act5Start,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <DashboardReveal />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 5: Brand & CTA (17-18s) */}
      <Sequence
        from={act5Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act5Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [act5Start - transitionDuration * 0.5, act5Start + transitionDuration * 0.3],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <BrandReveal />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
