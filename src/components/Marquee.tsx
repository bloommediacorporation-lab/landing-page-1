import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ITEMS = [
  "LANDING PAGES",
  "AUTOMATIZĂRI",
  "CONVERSIE MAXIMĂ",
  "DESIGN PREMIUM",
  "SEO & ADS",
  "BRANDING",
  "WEB DEVELOPMENT",
  "STRATEGIE",
];

export default function Marquee() {
  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track1.current || !track2.current) return;

    const w1 = track1.current.scrollWidth / 2;
    const w2 = track2.current.scrollWidth / 2;

    gsap.to(track1.current, {
      x: -w1,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    gsap.fromTo(
      track2.current,
      { x: -w2 },
      {
        x: 0,
        duration: 45,
        ease: "none",
        repeat: -1,
      }
    );

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  const renderItems = (outlined = false) => (
    <>
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span
          key={i}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 200,
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(1.5rem, 3vw, 3rem)",
            marginRight: "clamp(1.5rem, 3vw, 3rem)",
            color: outlined ? "transparent" : "rgba(255,255,255,0.04)",
            WebkitTextStroke: outlined
              ? "1px rgba(255,255,255,0.07)"
              : "none",
            letterSpacing: "-0.02em",
          }}
        >
          {item}
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#8b5cf6",
              opacity: 0.2,
              flexShrink: 0,
            }}
          />
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={sectionRef}
      style={{
        padding: "clamp(3rem, 6vh, 6rem) 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        opacity: 0,
      }}
    >
      <div
        ref={track1}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {renderItems(false)}
      </div>
      <div
        ref={track2}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {renderItems(true)}
      </div>
    </div>
  );
}
