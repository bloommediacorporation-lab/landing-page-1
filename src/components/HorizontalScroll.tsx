import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "DentaVille",
    category: "Landing Page + Ads",
    result: "+37 programări/lună",
    color: "#1a0a2e",
  },
  {
    title: "Clinica Plus",
    category: "Automatizări CRM",
    result: "15h/săptămână economisite",
    color: "#0a1628",
  },
  {
    title: "SkinMed",
    category: "Branding + Web",
    result: "3x ROI în 90 zile",
    color: "#1a0520",
  },
  {
    title: "OrthoSmile",
    category: "SEO + Content",
    result: "#1 Google local",
    color: "#0a1a15",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3rem",
          left: "clamp(2rem, 6vw, 8rem)",
          zIndex: 2,
          display: "flex",
          alignItems: "baseline",
          gap: "2rem",
        }}
      >
        <span style={{
          fontSize: "0.7rem",
          color: "#333",
          fontFamily: "monospace",
        }}>
          03/
        </span>
        <h2
          ref={titleRef}
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
            opacity: 0,
          }}
        >
          Proiecte
        </h2>
      </div>

      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "2rem",
          padding: "8rem clamp(2rem, 6vw, 8rem) 4rem",
          height: "100vh",
          alignItems: "center",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            data-hover
            style={{
              flexShrink: 0,
              width: "clamp(350px, 40vw, 500px)",
              height: "clamp(400px, 50vh, 550px)",
              borderRadius: "16px",
              background: project.color,
              border: "1px solid rgba(255,255,255,0.04)",
              padding: "clamp(2rem, 3vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "2rem",
                left: "2rem",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "monospace",
              }}
            >
              0{i + 1}
            </span>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#8b5cf6",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {project.category}
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 400,
                  marginBottom: "0.8rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {project.result}
              </span>
            </div>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                opacity: 0.15,
              }}
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>
        ))}

        <div
          data-hover
          style={{
            flexShrink: 0,
            width: "clamp(300px, 30vw, 400px)",
            height: "clamp(400px, 50vh, 550px)",
            borderRadius: "16px",
            border: "1px solid rgba(139,92,246,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            cursor: "pointer",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)";
          }}
        >
          <span style={{
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
          }}>
            Următorul proiect?
          </span>
          <span style={{
            fontSize: "0.75rem",
            color: "#8b5cf6",
            letterSpacing: "0.1em",
          }}>
            Poate fi al tău →
          </span>
        </div>
      </div>
    </section>
  );
}
