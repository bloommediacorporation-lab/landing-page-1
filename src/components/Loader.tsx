import React, { useEffect, useRef, useState } from "react";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let count = 0;
    const target = 100;
    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      count = Math.floor(eased * target);

      if (numRef.current) numRef.current.textContent = String(count);
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${eased})`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.transform = "translateY(-100%)";
            loaderRef.current.style.transition = "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)";
          }
          setTimeout(() => setHidden(true), 1000);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <span style={{
        fontSize: "0.7rem",
        letterSpacing: "0.3em",
        color: "#333",
        textTransform: "uppercase",
      }}>
        Bloom
      </span>

      <span
        ref={numRef}
        style={{
          fontSize: "clamp(4rem, 12vw, 9rem)",
          fontWeight: 200,
          color: "white",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        0
      </span>

      <div style={{
        width: "120px",
        height: "1px",
        background: "#1a1a1a",
        position: "relative",
        overflow: "hidden",
      }}>
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
