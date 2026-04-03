import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (textRef.current) {
      const lines = textRef.current.querySelectorAll(".about-line");
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              once: true,
            },
            delay: i * 0.1,
          }
        );
      });
    }

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
      ref={sectionRef}
      id="about"
      style={{
        padding: "clamp(8rem, 15vh, 16rem) clamp(2rem, 6vw, 8rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(4rem, 8vw, 10rem)",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div ref={textRef}>
        <span
          className="about-line"
          style={{
            fontSize: "0.7rem",
            color: "#8b5cf6",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "2rem",
            opacity: 0,
          }}
        >
          Despre noi
        </span>

        <h2
          className="about-line"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 200,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
            opacity: 0,
          }}
        >
          Nu suntem o agenție.
          <br />
          <span style={{ color: "#8b5cf6" }}>
            Suntem un sistem.
          </span>
        </h2>

        <div
          ref={lineRef}
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(139,92,246,0.5)",
            marginBottom: "2rem",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />

        <p
          className="about-line"
          style={{
            fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
            color: "#666",
            lineHeight: 1.8,
            maxWidth: "440px",
            opacity: 0,
          }}
        >
          Majoritatea agențiilor îți vând promisiuni.
          Noi construim infrastructura digitală care
          aduce clienți în mod predictibil — landing pages
          care convertesc, automatizări care nu dorm,
          și campanii optimizate zilnic.
        </p>

        <p
          className="about-line"
          style={{
            fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
            color: "#555",
            lineHeight: 1.8,
            maxWidth: "440px",
            marginTop: "1.5rem",
            opacity: 0,
          }}
        >
          Rezultatul? Un flux constant de clienți noi,
          fără să depinzi de recomandări sau noroc.
        </p>

        <div
          className="about-line"
          style={{
            display: "flex",
            gap: "3rem",
            marginTop: "3rem",
            opacity: 0,
          }}
        >
          {[
            { num: "50+", label: "Clienți activi" },
            { num: "3x", label: "ROI mediu" },
            { num: "2019", label: "Din anul" },
          ].map((s) => (
            <div key={s.label}>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "white",
                  display: "block",
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#444",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: "clamp(400px, 60vh, 700px)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          ref={imageRef}
          style={{
            position: "absolute",
            inset: "-15%",
            background:
              "linear-gradient(135deg, #1a0a2e 0%, #0a0015 50%, #150a25 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1px solid rgba(139,92,246,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "1px solid rgba(139,92,246,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8b5cf6",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Est. 2019 — România
        </div>
      </div>
    </section>
  );
}
