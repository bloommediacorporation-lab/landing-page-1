import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const title = titleRef.current;
    const section = sectionRef.current;
    if (!title || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = title.querySelectorAll(".cta-word");
            words.forEach((word) => {
              (word as HTMLElement).style.color = "#ffffff";
              (word as HTMLElement).style.webkitTextStroke = "0px #ffffff";
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
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
            style={{ 
              opacity: 0.08,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              transition: "color 0.8s ease, webkitTextStroke 0.8s ease, opacity 0.8s ease"
            }}
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
            display: "inline-block",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            padding: "1rem 2.5rem",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "100px",
            transition: "all 0.4s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(139,92,246,0.1)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "rgba(139,92,246,0.6)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "";
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "rgba(139,92,246,0.3)";
            (e.currentTarget as HTMLAnchorElement).style.color =
              "rgba(255,255,255,0.7)";
          }}
        >
          contact@bloommedia.ro
        </a>
      </div>
    </section>
  );
}
