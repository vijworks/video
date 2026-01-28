import "./index.css";
import { Composition } from "remotion";
import { Master } from "./Master";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AEOEnginePromo"
        component={Master}
        durationInFrames={540}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
