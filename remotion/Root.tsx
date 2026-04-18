import { Composition } from "remotion";
import { GemCopyDemo, FPS, DURATION } from "./GemCopyDemo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="GemCopyDemo"
      component={GemCopyDemo}
      durationInFrames={DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
