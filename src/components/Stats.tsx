import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Clienți mulțumiți" },
  { value: 2.5, suffix: "M+", label: "Revenue generat", isDecimal: true },
  { value: 98, suffix: "%", label: "Rată de retenție" },
  { value: 5, suffix: "x", label: "ROI mediu" },
];

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((stat) => stat.value * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "8rem 5%",
        background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.05), transparent)",
      }}
    >
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "4rem",
        textAlign: "center",
      }}>
        {stats.map((stat, index) => (
          <div key={index}>
            <div style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 200,
              color: "#a78bfa",
              lineHeight: 1,
              marginBottom: "1rem",
              fontVariantNumeric: "tabular-nums",
            }}>
              {stat.isDecimal ? counts[index].toFixed(1) : Math.floor(counts[index])}
              {stat.suffix}
            </div>
            <div style={{
              fontSize: "1rem",
              opacity: 0.6,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
