import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (timeRef.current) {
        const now = new Date();
        timeRef.current.textContent = now.toLocaleTimeString("ro-RO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Bucharest",
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        padding: "clamp(6rem, 12vh, 12rem) clamp(2rem, 6vw, 8rem) 3rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(6rem, 10vh, 10rem)",
        }}
      >
        <h3
          ref={titleRef}
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
            opacity: 0,
          }}
        >
          Hai să construim
          <br />
          <span style={{ color: "#8b5cf6" }}>împreună.</span>
        </h3>

        <MagneticButton href="mailto:contact@bloommedia.ro" strength={0.25}>
          contact@bloommedia.ro
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </MagneticButton>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.7rem", color: "#333" }}>
            © 2025 Bloom Media
          </span>
          <span style={{ fontSize: "0.7rem", color: "#333" }}>
            București, România
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span
            ref={timeRef}
            style={{
              fontSize: "0.7rem",
              color: "#555",
              fontFamily: "monospace",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            --:--:--
          </span>
          <span style={{ fontSize: "0.65rem", color: "#333" }}>
            EET
          </span>
        </div>

        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { name: "Instagram", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "Facebook", url: "#" },
          ].map((s) => (
            <a
              key={s.name}
              href={s.url}
              data-hover
              style={{
                fontSize: "0.7rem",
                color: "#444",
                transition: "color 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "white")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#444")
              }
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </footer>
  );
}
