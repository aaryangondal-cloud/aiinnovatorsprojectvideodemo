import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FPS = 30;
export const DURATION = 600; // 20 seconds

const NAVY_GRADIENT =
  "linear-gradient(135deg, #1a2439 0%, #2c3b5b 60%, #3a4f7a 100%)";
const GOLD = "#FED700";
const GOLD_DEEP = "#d4b300";
const NAVY = "#2c3b5b";
const NAVY_DEEP = "#0e1628";
const CREAM = "#fdfcf8";

const fontStack =
  "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Sparkle particle (a small drifting dot)
const Sparkle: React.FC<{ x: number; y: number; delay: number; size: number }> = ({
  x,
  y,
  delay,
  size,
}) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const opacity = interpolate(
    (local % 90) / 90,
    [0, 0.4, 1],
    [0, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const drift = interpolate((local % 90) / 90, [0, 1], [0, -40]);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + drift,
        width: size,
        height: size,
        borderRadius: "50%",
        background: GOLD,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${GOLD}`,
      }}
    />
  );
};

const SparkleField: React.FC = () => {
  // Deterministic pseudo-random positions
  const particles = Array.from({ length: 28 }, (_, i) => {
    const x = (i * 71) % 1920;
    const y = ((i * 137) % 1080);
    const delay = (i * 11) % 60;
    const size = 3 + (i % 4);
    return { x, y, delay, size, key: i };
  });
  return (
    <>
      {particles.map((p) => (
        <Sparkle key={p.key} x={p.x} y={p.y} delay={p.delay} size={p.size} />
      ))}
    </>
  );
};

// ---------- Scene 1: Title ----------
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labsOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const subtitleY = interpolate(frame, [30, 55], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [65, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: NAVY_GRADIENT,
        opacity: exit,
      }}
    >
      <SparkleField />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 12,
            color: GOLD,
            opacity: labsOpacity,
            marginBottom: 24,
          }}
        >
          AMIPI LABS
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 220,
            fontWeight: 900,
            letterSpacing: -6,
            lineHeight: 1,
            transform: `scale(${logoScale})`,
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          GemCopy
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 34,
            fontWeight: 300,
            marginTop: 20,
            color: "#c9d0e0",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          A gift to the jewelers we partner with
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Scene 2: Problem ----------
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const minutesSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const count = Math.floor(interpolate(minutesSpring, [0, 1], [0, 45]));
  const strikethroughWidth = interpolate(frame, [65, 95], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [95, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: CREAM, opacity: exit }}>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 8,
            color: NAVY,
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          The old way
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              fontFamily: fontStack,
              fontSize: 320,
              fontWeight: 900,
              color: NAVY,
              letterSpacing: -8,
              lineHeight: 1,
            }}
          >
            {count}
          </div>
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: 0,
              width: `${strikethroughWidth}%`,
              height: 16,
              background: GOLD,
              borderRadius: 8,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 40,
            fontWeight: 700,
            color: NAVY,
            marginTop: 24,
          }}
        >
          minutes per jewelry listing
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Scene 3: Workflow ----------
const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Enter: certificate card slides in
  const cardSpring = spring({ frame, fps, config: { damping: 20, stiffness: 130 } });
  const cardX = interpolate(cardSpring, [0, 1], [-400, 0]);
  const cardOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Fields populate in stagger starting at frame 30
  const fields = [
    { label: "Stone", value: "Natural Diamond", frame: 30 },
    { label: "Carat", value: "1.50ct", frame: 42 },
    { label: "Cut", value: "Excellent", frame: 54 },
    { label: "Color", value: "F", frame: 66 },
    { label: "Clarity", value: "VS1", frame: 78 },
    { label: "Metal", value: "Platinum", frame: 90 },
  ];

  // AI generate bar fills 110-150
  const genProgress = interpolate(frame, [110, 150], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const generatingOpacity = interpolate(frame, [100, 115, 150, 158], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Output reveal 160+
  const outputSpring = spring({ frame: frame - 160, fps, config: { damping: 18 } });
  const outputY = interpolate(outputSpring, [0, 1], [40, 0]);
  const outputOpacity = interpolate(frame, [160, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pendant fade in from 180
  const pendantSpring = spring({ frame: frame - 180, fps, config: { damping: 18 } });
  const pendantScale = interpolate(pendantSpring, [0, 1], [0.92, 1]);
  const pendantOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exit = interpolate(frame, [260, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tags = ["1.5ct diamond", "VS1 clarity", "platinum solitaire"];

  return (
    <AbsoluteFill
      style={{
        background: NAVY_GRADIENT,
        opacity: exit,
        padding: 80,
      }}
    >
      <SparkleField />
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: fontStack,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 8,
          color: GOLD,
          textTransform: "uppercase",
        }}
      >
        The new way
      </div>

      {/* Left: Certificate data card */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 220,
          width: 640,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 32,
          padding: 44,
          transform: `translateX(${cardX}px)`,
          opacity: cardOpacity,
          fontFamily: fontStack,
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#c9d0e0",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          GIA Certificate
        </div>
        {fields.map((f) => {
          const visible = frame >= f.frame;
          const fade = interpolate(frame, [f.frame, f.frame + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame, [f.frame, f.frame + 10], [12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={f.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                padding: "14px 0",
                opacity: visible ? fade : 0,
                transform: `translateY(${y}px)`,
                fontSize: 26,
              }}
            >
              <span style={{ color: "#99a8c4", fontWeight: 400 }}>{f.label}</span>
              <span style={{ color: "white", fontWeight: 700 }}>{f.value}</span>
            </div>
          );
        })}

        {/* Generating bar */}
        <div
          style={{
            marginTop: 32,
            opacity: generatingOpacity,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            AI is writing...
          </div>
          <div
            style={{
              height: 8,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${genProgress}%`,
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_DEEP})`,
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      </div>

      {/* Right: Pendant image */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 200,
          width: 520,
          height: 520,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          opacity: pendantOpacity,
          transform: `scale(${pendantScale})`,
        }}
      >
        <Img src={staticFile("jewelry/pendant.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Bottom: Output card */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 80,
          width: 1400,
          transform: `translateX(-50%) translateY(${outputY}px)`,
          opacity: outputOpacity,
          background: "white",
          borderRadius: 28,
          padding: 36,
          fontFamily: fontStack,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          border: `2px solid ${GOLD}`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 5,
            color: GOLD_DEEP,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Generated in 8 seconds
        </div>
        <div style={{ fontSize: 46, fontWeight: 900, color: NAVY, lineHeight: 1.1, marginBottom: 14 }}>
          Radiance That Lasts a Lifetime
        </div>
        <div style={{ fontSize: 22, color: "#4a5568", marginBottom: 18 }}>
          Some stones hold light. This one commands it.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((t, i) => {
            const tagOpacity = interpolate(frame, [200 + i * 6, 215 + i * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <span
                key={t}
                style={{
                  fontSize: 20,
                  padding: "8px 16px",
                  background: "#eef0f5",
                  color: NAVY,
                  border: "1px solid #c9d0e0",
                  borderRadius: 999,
                  opacity: tagOpacity,
                }}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 4: Payoff ----------
const PayoffScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bigSpring = spring({ frame, fps, config: { damping: 12, stiffness: 150 } });
  const bigScale = interpolate(bigSpring, [0, 1], [0.7, 1]);

  const freeOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const freeY = interpolate(frame, [30, 55], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exit = interpolate(frame, [95, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: NAVY_GRADIENT,
        opacity: exit,
      }}
    >
      <SparkleField />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 260,
            fontWeight: 900,
            letterSpacing: -6,
            lineHeight: 1,
            transform: `scale(${bigScale})`,
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          30 seconds.
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 48,
            fontWeight: 700,
            marginTop: 20,
            opacity: freeOpacity,
            transform: `translateY(${freeY}px)`,
          }}
        >
          Free for Amipi partners.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Scene 5: Outro ----------
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const phoneSpring = spring({ frame: frame - 6, fps, config: { damping: 16 } });
  const phoneScale = interpolate(phoneSpring, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{
        background: NAVY_DEEP,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 8,
            color: GOLD,
            marginBottom: 18,
            textTransform: "uppercase",
          }}
        >
          Talk to Amipi
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: -2,
            transform: `scale(${phoneScale})`,
          }}
        >
          1-800-530-2647
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontSize: 26,
            fontWeight: 400,
            color: "#99a8c4",
            marginTop: 20,
          }}
        >
          42 W 48th St, New York · info@amipi.com
        </div>
        <div
          style={{
            marginTop: 48,
            padding: "12px 24px",
            border: `1px solid ${GOLD}`,
            borderRadius: 999,
            fontFamily: fontStack,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          Amipi Labs · GemCopy
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- Main Composition ----------
export const GemCopyDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: NAVY_DEEP }}>
      <Sequence from={0} durationInFrames={75}>
        <TitleScene />
      </Sequence>
      <Sequence from={75} durationInFrames={105}>
        <ProblemScene />
      </Sequence>
      <Sequence from={180} durationInFrames={270}>
        <WorkflowScene />
      </Sequence>
      <Sequence from={450} durationInFrames={105}>
        <PayoffScene />
      </Sequence>
      <Sequence from={555} durationInFrames={45}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
