import { useEffect, useRef } from "react";

export default function CTA() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const line = lineRef.current;
    const button = buttonRef.current;
    
    if (!text || !line || !button) return;

    // Start at 0 opacity
    text.style.opacity = "0";
    line.style.opacity = "0";
    line.style.transform = "scaleX(0)";
    button.style.opacity = "0";
    button.style.transform = "translateY(20px)";

    const handleScroll = () => {
      const rect = text.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Fade starts when element top is at 80% of viewport height
      // Fade completes when element top reaches 30% of viewport height
      const fadeStart = windowHeight * 0.8;
      const fadeEnd = windowHeight * 0.3;
      
      if (rect.top <= fadeEnd) {
        // Fully visible
        text.style.opacity = "1";
        line.style.opacity = "1";
        line.style.transform = "scaleX(1)";
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
      } else if (rect.top < fadeStart) {
        // In transition zone — calculate opacity
        const progress = (fadeStart - rect.top) / (fadeStart - fadeEnd);
        const opacity = Math.max(0, Math.min(1, progress));
        text.style.opacity = String(opacity);
        line.style.opacity = String(opacity);
        line.style.transform = `scaleX(${opacity})`;
        button.style.opacity = String(opacity);
        button.style.transform = `translateY(${20 * (1 - opacity)}px)`;
      }
      // If rect.top >= fadeStart, opacity stays 0
    };

    // Use Lenis scroll if available, otherwise native scroll
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Run once on mount
    handleScroll();

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const words = "Gata să transformi vizitatorii în clienți?".split(" ");

  return (
    <section
      id="contact"
      ref={sectionRef}
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
        ref={textRef}
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
          opacity: 0,
          transition: "opacity 1s ease-out",
          color: "#ffffff",
        }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ color: "#ffffff" }}>
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
          opacity: 0,
          transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
        }}
      />

      <a
        href="mailto:contact@bloommedia.ro"
        ref={buttonRef}
        data-hover
        style={{
          display: "inline-block",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          color: "rgba(255,255,255,0.7)",
          textDecoration: "none",
          padding: "1rem 2.5rem",
          border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: "100px",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s, background 0.4s ease, border-color 0.4s ease, color 0.4s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(139,92,246,0.1)";
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }}
      >
        contact@bloommedia.ro
      </a>
    </section>
  );
}
