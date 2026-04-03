import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  baseSpeed?: number;
  direction?: 1 | -1;
}

export default function VelocityMarquee({
  text,
  baseSpeed = 1,
  direction = 1,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const speedRef = useRef(baseSpeed);

  useEffect(() => {
    if (!innerRef.current || !wrapperRef.current) return;

    const inner = innerRef.current;
    const totalWidth = inner.scrollWidth / 2;

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        speedRef.current = baseSpeed + Math.abs(self.getVelocity()) * 0.0003;
      },
    });

    const tick = () => {
      xRef.current += speedRef.current * direction;

      if (direction === 1 && xRef.current > totalWidth) {
        xRef.current -= totalWidth;
      }
      if (direction === -1 && xRef.current < -totalWidth) {
        xRef.current += totalWidth;
      }

      inner.style.transform = `translateX(${-xRef.current}px)`;
      speedRef.current += (baseSpeed - speedRef.current) * 0.05;

      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [baseSpeed, direction]);

  const items = `${text} · `.repeat(12);

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "1rem 0",
      }}
    >
      <div
        ref={innerRef}
        style={{
          display: "inline-block",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 200,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.02em",
          }}
        >
          {items}
        </span>
      </div>
    </div>
  );
}
