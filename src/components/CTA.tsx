import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".cta-word");
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.08 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: word,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
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
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  const words = "Gata să transformi vizitatorii în clienți?".split(" ");

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(10rem, 20vh, 20rem) clamp(2rem, 6vw, 8rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <span
        style={{
          fontSize: "0.65rem",
          color: "#444",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: "3rem",
        }}
      >
        Contact
      </span>

      <h2
        ref={titleRef}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 200,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          maxWidth: "900px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 0.3em",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="cta-word"
            style={{ opacity: 0.08 }}
          >
            {word}
          </span>
        ))}
      </h2>

      <div
        ref={lineRef}
        style={{
          width: "80px",
          height: "1px",
          background: "rgba(139,92,246,0.4)",
          margin: "3rem 0",
          transformOrigin: "center",
          transform: "scaleX(0)",
        }}
      />

      <div ref={contentRef}>
        <a
          href="mailto:contact@bloommedia.ro"
          data-hover
          style={{
            fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
            color: "#666",
            display: "block",
            marginBottom: "0.5rem",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
        >
          contact@bloommedia.ro
        </a>

        <a
          href="tel:0734270188"
          data-hover
          style={{
            fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
            color: "#444",
            display: "block",
            marginBottom: "3rem",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
        >
          0734 270 188
        </a>

        <a
          href="mailto:contact@bloommedia.ro"
          data-hover
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
            padding: "1.1rem 3rem",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "100px",
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
            color: "white",
            background: "transparent",
            transition:
              "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#050505";
            e.currentTarget.style.borderColor = "white";
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 0 40px rgba(139,92,246,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor =
              "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Hai să vorbim
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
