import React, { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Bloom a transformat complet strategia noastră de marketing. Am crescut de la 50 la 300 de clienți noi lunar în doar 6 luni.",
    author: "Maria Ionescu",
    role: "CEO, TechStart Solutions",
    company: "TechStart",
  },
  {
    quote: "Profesionalism desăvârșit și rezultate concrete. Echipa înțelege cu adevărat ce înseamnă marketing digital de performanță.",
    author: "Andrei Popescu",
    role: "Founder, GreenLife Organics",
    company: "GreenLife",
  },
  {
    quote: "Cel mai bun partener pentru creșterea business-ului online. ROI-ul campaniilor a depășit toate așteptările noastre.",
    author: "Elena Dumitrescu",
    role: "Marketing Director, Luxe Fashion",
    company: "Luxe Fashion",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimoniale"
      style={{
        padding: "8rem 5%",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "5rem", textAlign: "center" }}>
        <div style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#a78bfa",
          marginBottom: "1rem",
        }}>
          Testimoniale
        </div>
        <h2 style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 200,
          letterSpacing: "-0.02em",
        }}>
          Ce spun <span style={{ fontWeight: 600 }}>clienții noștri</span>
        </h2>
      </div>

      <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transform: activeIndex === index ? "translateX(0)" : "translateX(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              position: activeIndex === index ? "relative" : "absolute",
              pointerEvents: activeIndex === index ? "auto" : "none",
            }}
          >
            <div style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 200,
              lineHeight: 1.4,
              marginBottom: "3rem",
              fontStyle: "italic",
            }}>
              "{testimonial.quote}"
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}>
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <div style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                }}>
                  {testimonial.author}
                </div>
                <div style={{
                  fontSize: "0.875rem",
                  opacity: 0.6,
                }}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          marginTop: "3rem",
        }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: activeIndex === index ? "40px" : "12px",
                height: "12px",
                borderRadius: "6px",
                background: activeIndex === index ? "#a78bfa" : "rgba(255,255,255,0.2)",
                border: "none",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
