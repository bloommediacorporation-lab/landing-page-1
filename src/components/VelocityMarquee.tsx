import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  text: string;
  speed?: number;
  direction?: 1 | -1;
}

export default function VelocityMarquee({
  text,
  speed = 50,
  direction = 1,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current || !wrapperRef.current) return;

    const inner = innerRef.current;
    const content = inner.querySelector('.marquee-content');
    if (!content) return;

    const totalWidth = content.scrollWidth / 2;

    gsap.to(content, {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
    });
  }, [speed]);

  const items = `${text} · `.repeat(12);

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "0.8rem 0",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div ref={innerRef} style={{ display: "inline-block" }}>
        <span
          className="marquee-content"
          style={{
            display: "inline-block",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 200,
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.02em",
            paddingRight: "2rem",
          }}
        >
          {items}
        </span>
      </div>
    </div>
  );
}
