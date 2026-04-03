import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const words = "Gata să transformi vizitatorii în clienți?".split(" ");
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    wordRefs.current.forEach((word) => {
      if (!word) return;
      gsap.fromTo(
        word,
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: word,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: "clamp(8rem, 18vh, 16rem) clamp(2rem, 6vw, 8rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <span style={{
        fontSize: "0.7rem",
        color: "#333",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        marginBottom: "3rem",
      }}>
        Contact
      </span>

      <h2 style={{
        fontSize: "clamp(2rem, 5vw, 4.5rem)",
        fontWeight: 300,
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
        maxWidth: "800px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 0.3em",
      }}>
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{
              opacity: 0.1,
              transition: "color 0.3s",
            }}
          >
            {word}
          </span>
        ))}
      </h2>

      <div style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}>
        <a
          href="mailto:contact@bloommedia.ro"
          data-hover
          style={{
            fontSize: "1rem",
            color: "#666",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
        >
          contact@bloommedia.ro
        </a>
        <a
          href="tel:0734270188"
          data-hover
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "#888",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
        >
          0734 270 188
        </a>
      </div>

      <a
        href="mailto:contact@bloommedia.ro"
        data-hover
        style={{
          marginTop: "3.5rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.8rem",
          padding: "1.1rem 2.8rem",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "100px",
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: "transparent",
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.color = "#050505";
          e.currentTarget.style.borderColor = "white";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "white";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Hai să vorbim
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
    </section>
  );
}
