import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    let raf: number;
    const follow = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    const handleEnter = () => {
      ring.style.width = "80px";
      ring.style.height = "80px";
      ring.style.marginLeft = "-40px";
      ring.style.marginTop = "-40px";
      ring.style.borderColor = "rgba(139, 92, 246, 0.4)";
      dot.style.opacity = "0";
    };
    const handleLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.marginLeft = "0";
      ring.style.marginTop = "0";
      ring.style.borderColor = "rgba(255, 255, 255, 0.2)";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      document.documentElement.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    borderRadius: "50%",
    transition: "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s, margin 0.3s",
  };

  return (
    <>
      <div ref={dotRef} style={{
        ...base,
        width: 8,
        height: 8,
        background: "#a78bfa",
        mixBlendMode: "difference",
      }} />
      <div ref={ringRef} style={{
        ...base,
        width: 40,
        height: 40,
        border: "1px solid rgba(255,255,255,0.2)",
        zIndex: 9998,
      }} />
    </>
  );
}
