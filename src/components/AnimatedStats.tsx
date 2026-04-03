import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { end: 50, suffix: "+", label: "Clienți activi" },
  { end: 1200, suffix: "+", label: "Programări generate" },
  { end: 98, suffix: "%", label: "Rată de retenție" },
  { end: 3, suffix: "x", label: "ROI mediu" },
];

function Counter({
  end,
  suffix,
  label,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        setTimeout(() => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => setCount(Math.floor(obj.val)),
          });
        }, delay);
      },
    });
  }, [end, delay]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <span
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 200,
          color: "white",
          display: "block",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        <span style={{ color: "#8b5cf6" }}>{suffix}</span>
      </span>
      <span
        style={{
          fontSize: "0.65rem",
          color: "#444",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginTop: "0.8rem",
          display: "block",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AnimatedStats() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      style={{
        padding: "clamp(6rem, 10vh, 10rem) clamp(2rem, 6vw, 8rem)",
      }}
    >
      <div
        ref={lineRef}
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
          marginBottom: "clamp(4rem, 6vh, 6rem)",
          transformOrigin: "center",
          transform: "scaleX(0)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        {STATS.map((stat, i) => (
          <Counter key={i} {...stat} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}
