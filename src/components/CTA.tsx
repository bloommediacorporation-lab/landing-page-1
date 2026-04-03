import { useEffect, useRef, useState } from "react";

export default function CTA() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const text = "Gata să transformi vizitatorii în clienți?";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const checkVisibility = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
        setIsVisible(true);
      }
    };

    const handleLenisScroll = () => {
      checkVisibility();
    };

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on("scroll", handleLenisScroll);
    } else {
      window.addEventListener("scroll", checkVisibility, { passive: true });
    }

    checkVisibility();

    return () => {
      if (lenis) {
        lenis.off("scroll", handleLenisScroll);
      } else {
        window.removeEventListener("scroll", checkVisibility);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (lineRef.current && buttonRef.current) {
        lineRef.current.style.opacity = "1";
        lineRef.current.style.transform = "scaleX(1)";
        buttonRef.current.style.opacity = "1";
        buttonRef.current.style.transform = "translateY(0)";
      }
      
      if (containerRef.current) {
        const chars = containerRef.current.querySelectorAll(".cta-char");
        chars.forEach((char, i) => {
          setTimeout(() => {
            char.classList.add("animate");
          }, i * 40);
        });
      }
    }
  }, [isVisible]);

  const characters = text.split("").map((char, i) => (
    <span
      key={i}
      className="cta-char"
      data-index={i}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <>
      <style>{`
        .cta-char {
          display: inline-block;
          opacity: 0;
          transform-origin: center bottom;
        }
        
        .cta-char.animate {
          animation: ctaReveal 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        @keyframes ctaReveal {
          from { 
            opacity: 0; 
            transform: translateY(20px) rotateX(-40deg); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) rotateX(0); 
          }
        }
      `}</style>
      
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

        <div
          ref={containerRef}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 200,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            perspective: "1000px",
          }}
        >
          {characters}
        </div>

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
            transition: "transform 0.8s ease-out 0.3s, opacity 0.8s ease-out 0.3s",
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
            transition: "opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s, background 0.4s ease, border-color 0.4s ease, color 0.4s ease",
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
    </>
  );
}
