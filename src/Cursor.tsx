import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface CursorProps {
  blinking: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ blinking }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blinkCycle = fps * 0.5; // 0.5s per blink
  const opacity = blinking
    ? Math.floor(frame / blinkCycle) % 2 === 0
      ? 1
      : 0
    : 1;

  return (
    <span
      className="w-4 h-10 bg-[#333] ml-0.5 inline-block"
      style={{ opacity }}
    />
  );
};
