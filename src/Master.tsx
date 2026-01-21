import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { SplitScreenProblem } from "./SplitScreenProblem";
import { KineticStat } from "./KineticStat";
import { AgentNetwork } from "./AgentNetwork";
import { AIInterface } from "./AIInterface";
import { BrandReveal } from "./BrandReveal";

// Timing constants (in seconds)
const ACT1_DURATION = 3.5;
const ACT2_DURATION = 3.5;
const ACT3_DURATION = 3;

export const Master: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame calculations
  const act1Frames = Math.round(ACT1_DURATION * fps);
  const act2Frames = Math.round(ACT2_DURATION * fps);
  const act3Frames = Math.round(ACT3_DURATION * fps);

  const act2Start = act1Frames;
  const act3Start = act1Frames + act2Frames;

  // Transition overlays for smooth act changes
  const act1ToAct2Fade = interpolate(
    frame,
    [act1Frames - fps * 0.3, act1Frames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const act2ToAct3Fade = interpolate(
    frame,
    [act3Start - fps * 0.3, act3Start],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ACT 1: The Problem (0-3.5s) */}
      <Sequence durationInFrames={act1Frames + Math.round(fps * 0.5)}>
        <AbsoluteFill style={{ opacity: 1 - act1ToAct2Fade * 0.8 }}>
          <SplitScreenProblem />
          <KineticStat />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 2: The Transformation (3.5-7s) */}
      <Sequence from={act2Start - Math.round(fps * 0.2)} durationInFrames={act2Frames + Math.round(fps * 0.5)}>
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [act2Start - fps * 0.2, act2Start + fps * 0.3],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ) * (1 - act2ToAct3Fade * 0.8),
          }}
        >
          {/* Background: Agent Network */}
          <AgentNetwork />

          {/* Foreground: AI Chat Interface */}
          <AIInterface />
        </AbsoluteFill>
      </Sequence>

      {/* ACT 3: The Payoff (7-10s) */}
      <Sequence from={act3Start - Math.round(fps * 0.2)} durationInFrames={act3Frames + Math.round(fps * 0.5)}>
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [act3Start - fps * 0.2, act3Start + fps * 0.3],
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
