/* Pure server component — zero JS, zero bundle cost */

const shapes = [
  { type: "circle",  w: 64, h: 64, top: "10%", left: "5%",  delay: "0s",  dur: "11s" },
  { type: "hexagon", w: 72, h: 72, top: "18%", left: "82%", delay: "-3s", dur: "13s" },
  { type: "triangle",w: 52, h: 52, top: "55%", left: "12%", delay: "-6s", dur: "10s" },
  { type: "pill",    w: 80, h: 32, top: "72%", left: "70%", delay: "-2s", dur: "12s" },
  { type: "circle",  w: 48, h: 48, top: "82%", left: "40%", delay: "-8s", dur: "14s" },
  { type: "hexagon", w: 56, h: 56, top: "38%", left: "90%", delay: "-4s", dur: "11s" },
] as const;

type Shape = typeof shapes[number];

function shapeStyle(s: Shape): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    top: s.top, left: s.left,
    width: s.w, height: s.h,
    animation: `drift ${s.dur} ease-in-out infinite`,
    animationDelay: s.delay,
    willChange: "transform",
  };
  if (s.type === "circle")  return { ...base, borderRadius: "50%", border: "1.5px solid rgba(225,29,72,0.15)" };
  if (s.type === "pill")    return { ...base, borderRadius: 999,   border: "1.5px solid rgba(225,29,72,0.15)" };
  if (s.type === "hexagon") return { ...base, clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "rgba(225,29,72,0.07)" };
  /* triangle */             return { ...base, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",                            background: "rgba(225,29,72,0.06)" };
}

export default function Background() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(225,29,72,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225,29,72,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 80%)",
        }}
      />

      {/* Shapes — translateZ(0) on parent promotes children to GPU layers */}
      <div style={{ position: "absolute", inset: 0, transform: "translateZ(0)" }}>
        {shapes.map((s, i) => (
          <div key={i} style={shapeStyle(s)} />
        ))}
      </div>
    </div>
  );
}
