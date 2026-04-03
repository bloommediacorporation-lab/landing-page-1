import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Landing Pages",
    desc: "Design premium optimizat pentru conversii. Fiecare element are un scop.",
    tags: ["Design", "Development", "CRO"],
  },
  {
    num: "02",
    title: "Automatizări",
    desc: "Sisteme care lucrează 24/7. Lead nurturing, follow-up, booking automat.",
    tags: ["CRM", "Email", "Workflows"],
  },
  {
    num: "03",
    title: "Ads & SEO",
    desc: "Campanii targetate cu ROI măsurabil. Google, Meta, SEO local.",
    tags: ["Google Ads", "Meta", "Analytics"],
  },
  {
    num: "04",
    title: "Branding",
    desc: "Identitate vizuală coerentă care construiește încredere.",
    tags: ["Identity", "Guidelines", "Strategy"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }

    itemsRef.current.forEach((item, i) => {
      if (!item) return;

      const line = item.querySelector(".service-line") as HTMLElement;
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        item.querySelector(".service-content"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            once: true,
          },
          delay: 0.2,
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        padding: "clamp(8rem, 15vh, 14rem) clamp(2rem, 6vw, 8rem)",
      }}
    >
      <div
        ref={titleRef}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2rem",
          marginBottom: "clamp(4rem, 8vh, 8rem)",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "#333",
            fontFamily: "monospace",
          }}
        >
          02/
        </span>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 200,
            letterSpacing: "-0.04em",
          }}
        >
          Ce Facem
        </h2>
      </div>

      <div>
        {SERVICES.map((service, i) => (
          <div
            key={i}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            data-hover
            style={{ position: "relative" }}
          >
            <div
              className="service-line"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(139,92,246,0.3), rgba(255,255,255,0.06))",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />

            <div
              className="service-content"
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr auto",
                gap: "clamp(1.5rem, 4vw, 4rem)",
                alignItems: "start",
                padding: "clamp(2.5rem, 4vw, 4rem) 0",
                opacity: 0,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const title = e.currentTarget.querySelector(
                  ".service-title"
                ) as HTMLElement;
                if (title) {
                  title.style.transform = "translateX(20px)";
                  title.style.color = "#c4b5fd";
                }
                const arrow = e.currentTarget.querySelector(
                  ".service-arrow"
                ) as HTMLElement;
                if (arrow) {
                  arrow.style.transform = "translate(4px, -4px)";
                  arrow.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                const title = e.currentTarget.querySelector(
                  ".service-title"
                ) as HTMLElement;
                if (title) {
                  title.style.transform = "translateX(0)";
                  title.style.color = "white";
                }
                const arrow = e.currentTarget.querySelector(
                  ".service-arrow"
                ) as HTMLElement;
                if (arrow) {
                  arrow.style.transform = "translate(0, 0)";
                  arrow.style.opacity = "0.2";
                }
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#8b5cf6",
                  fontFamily: "monospace",
                  paddingTop: "0.6rem",
                  opacity: 0.6,
                }}
              >
                {service.num}
              </span>

              <div>
                <h3
                  className="service-title"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                    transition:
                      "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                    lineHeight: 1.7,
                    maxWidth: "480px",
                  }}
                >
                  {service.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "1.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.6rem",
                        color: "#666",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "100px",
                        padding: "0.35rem 0.9rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <svg
                className="service-arrow"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  marginTop: "0.6rem",
                  opacity: 0.2,
                  transition:
                    "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s",
                }}
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        ))}

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />
      </div>
    </section>
  );
}
