import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "În prima lună am avut 37 de programări noi. Nu ne așteptam la rezultate atât de rapide.",
    name: "Dr. Maria Ionescu",
    role: "Medic Stomatolog, DentaVille",
  },
  {
    quote:
      "Automatizările ne-au eliberat 15 ore pe săptămână. Acum ne concentrăm pe pacienți, nu pe admin.",
    name: "Andrei Popescu",
    role: "Manager, Clinica Plus",
  },
  {
    quote:
      "Cel mai bun ROI pe care l-am avut vreodată pe marketing. Transparent, măsurabil, predictibil.",
    name: "Elena Dumitrescu",
    role: "Fondator, SkinMed",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!quoteRef.current || !infoRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      quoteRef.current,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    );
    tl.fromTo(
      infoRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    );
  }, [active]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(8rem, 15vh, 14rem) clamp(2rem, 6vw, 8rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        opacity: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <span
        style={{
          fontSize: "0.65rem",
          color: "#333",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: "4rem",
        }}
      >
        Testimoniale
      </span>

      <span
        style={{
          fontSize: "6rem",
          fontWeight: 200,
          color: "rgba(139,92,246,0.15)",
          lineHeight: 0.5,
          marginBottom: "2rem",
          fontFamily: "Georgia, serif",
        }}
      >
        "
      </span>

      <blockquote
        ref={quoteRef}
        style={{
          fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
          fontWeight: 200,
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
          maxWidth: "700px",
          color: "rgba(255,255,255,0.85)",
          fontStyle: "italic",
        }}
      >
        {t.quote}
      </blockquote>

      <div ref={infoRef} style={{ marginTop: "2.5rem" }}>
        <span
          style={{
            fontSize: "0.85rem",
            color: "white",
            fontWeight: 500,
            display: "block",
          }}
        >
          {t.name}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#555",
            display: "block",
            marginTop: "0.3rem",
          }}
        >
          {t.role}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "3rem",
        }}
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            data-hover
            onClick={() => setActive(i)}
            style={{
              width: active === i ? "24px" : "6px",
              height: "6px",
              borderRadius: "100px",
              border: "none",
              background:
                active === i
                  ? "#8b5cf6"
                  : "rgba(255,255,255,0.1)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
