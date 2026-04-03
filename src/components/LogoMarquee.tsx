import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LOGOS = [
  "MedLife",
  "Regina Maria",
  "Dent Estet",
  "Dr. Leahu",
  "Sanador",
  "Clinica Plus",
  "DentaVille",
  "SmileDent",
  "OrthoSmile",
  "SkinMed",
];

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const w = trackRef.current.scrollWidth / 2;
    gsap.to(trackRef.current, {
      x: -w,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        padding: "clamp(4rem, 6vh, 6rem) 0",
        borderTop: "1px solid rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.03)",
        opacity: 0,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: "0.65rem",
          color: "#333",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
        }}
      >
        Au avut încredere în noi
      </p>

      <div style={{ overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(3rem, 6vw, 6rem)",
            whiteSpace: "nowrap",
          }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.12)",
                letterSpacing: "0.05em",
                flexShrink: 0,
                transition: "color 0.3s",
              }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
