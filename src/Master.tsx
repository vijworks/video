import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { SplitScreenProblem } from "./SplitScreenProblem";
import { StatsShowcase } from "./StatsShowcase";
import { BeforeActivation } from "./BeforeActivation";
import { ActivationMoment } from "./ActivationMoment";
import { VisibilityMonitoring } from "./VisibilityMonitoring";
import { SmartRoutingAgent } from "./SmartRoutingAgent";
import { DashboardReveal } from "./DashboardReveal";
import { BrandReveal } from "./BrandReveal";
import { BRAND } from "./brandColors";

// Timing constants (in seconds) - Total: 33 seconds
const ACT1_DURATION = 4;      // The Shift: Split screen old vs new
const ACT2_DURATION = 5;      // The Stats: All 4 stats showcase
const ACT3_DURATION = 4;      // Before Activation: Struggling metrics
const ACT4_DURATION = 3;      // Activation Moment: Button press + surge
const ACT5_DURATION = 4;      // Visibility Monitoring: Weekly scan
const ACT6_DURATION = 4;      // Smart Routing Agent
const ACT7_DURATION = 3;      // Dashboard Reveal (condensed)
const ACT8_DURATION = 6;      // Brand & CTA

export const Master: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame calculations
  const act1Frames = Math.round(ACT1_DURATION * fps);
  const act2Frames = Math.round(ACT2_DURATION * fps);
  const act3Frames = Math.round(ACT3_DURATION * fps);
  const act4Frames = Math.round(ACT4_DURATION * fps);
  const act5Frames = Math.round(ACT5_DURATION * fps);
  const act6Frames = Math.round(ACT6_DURATION * fps);
  const act7Frames = Math.round(ACT7_DURATION * fps);
  const act8Frames = Math.round(ACT8_DURATION * fps);

  const act2Start = act1Frames;
  const act3Start = act2Start + act2Frames;
  const act4Start = act3Start + act3Frames;
  const act5Start = act4Start + act4Frames;
  const act6Start = act5Start + act5Frames;
  const act7Start = act6Start + act6Frames;
  const act8Start = act7Start + act7Frames;

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

      {/* ACT 3: Before Activation (9-13s) - Struggling metrics */}
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
          <BeforeActivation />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 4: Activation Moment (13-16s) - Button press + metrics surge */}
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
          <ActivationMoment />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 5: Visibility Monitoring (16-20s) - Weekly scan */}
      <Sequence
        from={act5Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act5Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [
                act5Start - transitionDuration * 0.5,
                act5Start + transitionDuration * 0.5,
                act6Start - transitionDuration,
                act6Start,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <VisibilityMonitoring />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 6: Smart Routing Agent (20-24s) */}
      <Sequence
        from={act6Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act6Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [
                act6Start - transitionDuration * 0.5,
                act6Start + transitionDuration * 0.5,
                act7Start - transitionDuration,
                act7Start,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <SmartRoutingAgent />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 7: Dashboard Reveal (24-27s) */}
      <Sequence
        from={act7Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act7Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [
                act7Start - transitionDuration * 0.5,
                act7Start + transitionDuration * 0.5,
                act8Start - transitionDuration,
                act8Start,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <DashboardReveal />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 8: Brand & CTA (27-33s) */}
      <Sequence
        from={act8Start - Math.round(transitionDuration * 0.5)}
        durationInFrames={act8Frames + Math.round(transitionDuration)}
      >
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [act8Start - transitionDuration * 0.5, act8Start + transitionDuration * 0.3],
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
