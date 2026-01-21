import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { MacTerminal } from "./MacTerminal";
import { LogoCombo } from "./LogoCombo";

const OUTPUT_DONE_FRAME = 150;

export const Master: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Slide in animation
  const slideIn = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  // Flip out animation
  const flipOut = spring({
    frame: frame - OUTPUT_DONE_FRAME,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const translateY = interpolate(slideIn, [0, 1], [700, 80]);
  const rotateY = interpolate(frame, [0, durationInFrames], [8, -8]);
  const scale = interpolate(frame, [0, durationInFrames], [0.92, 1]);

  const flipRotateX =
    frame >= OUTPUT_DONE_FRAME ? interpolate(flipOut, [0, 1], [0, -90]) : 0;

  return (
    <AbsoluteFill
      className="bg-gradient-to-br from-slate-50 to-slate-100"
      style={{ perspective: 1200 }}
    >
      {/* LogoCombo behind the terminal */}
      <Sequence
        from={OUTPUT_DONE_FRAME}
        durationInFrames={durationInFrames - OUTPUT_DONE_FRAME}
      >
        <LogoCombo />
      </Sequence>

      {/* Terminal on top */}
      <Sequence
        durationInFrames={durationInFrames}
        style={{
          transform: `translateY(${translateY}px) rotateX(18deg) rotateY(${rotateY}deg) scale(${scale})`,
        }}
      >
        {/* Flip wrapper with transform origin at bottom */}
        <div
          style={{
            width: "100%",
            height: "100%",
            perspective: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "center bottom",
              transform: `rotateX(${flipRotateX}deg)`,
            }}
          >
            <MacTerminal />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
