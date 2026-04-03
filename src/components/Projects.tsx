import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "DentaVille",
    category: "Landing Page + Ads",
    result: "+37 programări/lună",
    color: "#1a0a2e",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
  },
  {
    num: "02",
    title: "Clinica Plus",
    category: "Automatizări CRM",
    result: "15h/săptămână economisite",
    color: "#0a1628",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
  },
  {
    num: "03",
    title: "SkinMed",
    category: "Branding + Web",
    result: "3x ROI în 90 zile",
    color: "#1a0520",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
  },
  {
    num: "04",
    title: "OrthoSmile",
    category: "SEO + Content",
    result: "#1 Google local",
    color: "#0a1a15",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafId = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const touchStartScroll = useRef(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      if (!el) return;
      
      currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.12);
      el.scrollLeft = currentScroll.current;
      
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      targetScroll.current = el.scrollLeft;
      currentScroll.current = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      targetScroll.current -= e.movementX * 1.5;
    };

    const onUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
      el.style.userSelect = "";
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartScroll.current = el.scrollLeft;
      targetScroll.current = el.scrollLeft;
      currentScroll.current = el.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaX = touchStartX.current - e.touches[0].clientX;
      const walk = deltaX * 1.2;
      targetScroll.current = touchStartScroll.current + walk;
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    const section = sectionRef.current;
    if (!title || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            title.style.opacity = "1";
            title.style.color = "#ffffff";
            title.style.webkitTextStroke = "0px #ffffff";
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 6,
        background: "#050505",
        padding: "clamp(6rem, 12vh, 12rem) 0 clamp(4rem, 8vh, 8rem)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2rem",
          padding: "0 clamp(1.5rem, 5vw, 8rem)",
          marginBottom: "clamp(2.5rem, 4vh, 4rem)",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "#333",
            fontFamily: "monospace",
          }}
        >
          03/
        </span>
        <h2
          ref={titleRef}
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
            opacity: 0,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.3)",
            transition: "opacity 0.8s ease, color 0.8s ease, webkitTextStroke 0.8s ease",
          }}
        >
          Proiecte
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="projects-scroll"
        style={{
          display: "flex",
          gap: "1rem",
          paddingLeft: "clamp(1.5rem, 5vw, 8rem)",
          paddingRight: "clamp(1.5rem, 5vw, 8rem)",
          overflowX: "auto",
          overflowY: "hidden",
          cursor: "grab",
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            data-hover
            style={{
              flexShrink: 0,
              width: "min(85vw, 380px)",
              height: "min(55vw, 420px)",
              borderRadius: "16px",
              background: project.color,
              border: "1px solid rgba(255,255,255,0.04)",
              overflow: "hidden",
              position: "relative",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.5,
                transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!isDragging.current) {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.opacity = "0.7";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "0.5";
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                padding: "clamp(1.2rem, 3vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "monospace",
                    background: "rgba(0,0,0,0.3)",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                  }}
                >
                  {project.num}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: 0.5 }}
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                    color: "#a78bfa",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  {project.category}
                </span>
                <h3
                  style={{
                    fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.3rem",
                  }}
                >
                  {project.title}
                </h3>
                <span
                  style={{
                    fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {project.result}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div
          data-hover
          style={{
            flexShrink: 0,
            width: "min(70vw, 300px)",
            height: "min(55vw, 420px)",
            borderRadius: "16px",
            border: "1px dashed rgba(139,92,246,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            cursor: "pointer",
            transition: "border-color 0.3s, background 0.3s",
            background: "rgba(139,92,246,0.02)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
            e.currentTarget.style.background = "rgba(139,92,246,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
            e.currentTarget.style.background = "rgba(139,92,246,0.02)";
          }}
        >
          <span
            style={{
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            Următorul proiect?
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#8b5cf6",
              letterSpacing: "0.08em",
            }}
          >
            Poate fi al tău →
          </span>
        </div>
      </div>

      <style>{`
        .projects-scroll::-webkit-scrollbar {
          display: none;
        }
        .projects-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </section>
  );
}
