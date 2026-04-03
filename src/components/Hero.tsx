import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWords = ["Clientele", "tale", "te", "caută."];
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    wordRefs.current.forEach((word, i) => {
      if (!word) return;
      const inner = word.querySelector(".word-inner") as HTMLElement;
      tl.fromTo(
        inner,
        { y: "105%", rotateX: -60 },
        {
          y: "0%",
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        i * 0.08
      );
    });

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.4"
    );

    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll(".stat-item");
      tl.fromTo(
        items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" },
        "-=0.8"
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(2rem, 6vw, 8rem)",
        overflow: "hidden",
      }}
    >
      <h1 style={{
        fontSize: "clamp(3.5rem, 9vw, 8rem)",
        fontWeight: 300,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: "0 0.3em",
      }}>
        {titleWords.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{
              overflow: "hidden",
              display: "inline-block",
              perspective: "600px",
            }}
          >
            <span
              className="word-inner"
              style={{
                display: "inline-block",
                willChange: "transform",
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      <p
        ref={subRef}
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          color: "#666",
          marginTop: "1.5rem",
          maxWidth: "500px",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 2,
          opacity: 0,
        }}
      >
        Noi ne asigurăm că te găsesc. Construim sisteme de marketing
        care funcționează 24/7.
      </p>

      <div
        ref={lineRef}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          marginTop: "3rem",
          transformOrigin: "left",
          transform: "scaleX(0)",
          position: "relative",
          zIndex: 2,
        }}
      />

      <div
        ref={statsRef}
        style={{
          display: "flex",
          gap: "clamp(2rem, 5vw, 5rem)",
          marginTop: "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {[
          { num: "25-40", label: "Programări noi", sub: "/ lună" },
          { num: "30", label: "Zile", sub: "primele rezultate" },
          { num: "100%", label: "Transparent", sub: "în raportare" },
        ].map((stat, i) => (
          <div key={i} className="stat-item" style={{ opacity: 0 }}>
            <span style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 200,
              color: "#a78bfa",
              display: "block",
            }}>
              {stat.num}
            </span>
            <span style={{
              fontSize: "0.65rem",
              color: "#555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "0.3rem",
              display: "block",
            }}>
              {stat.label}
            </span>
            <span style={{
              fontSize: "0.6rem",
              color: "#333",
              display: "block",
            }}>
              {stat.sub}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        position: "absolute",
        bottom: "2.5rem",
        right: "clamp(2rem, 6vw, 8rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.8rem",
        zIndex: 2,
      }}>
        <span style={{
          fontSize: "0.55rem",
          letterSpacing: "0.25em",
          color: "#444",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
        }}>
          Scroll
        </span>
        <div style={{
          width: "1px",
          height: "50px",
          background: "linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)",
          animation: "pulse 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
