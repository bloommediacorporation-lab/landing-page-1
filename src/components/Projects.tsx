import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "DentaVille",
    category: "Landing Page + Ads",
    result: "+37 programări/lună",
    color: "#1a0a2e",
  },
  {
    num: "02",
    title: "Clinica Plus",
    category: "Automatizări CRM",
    result: "15h/săptămână economisite",
    color: "#0a1628",
  },
  {
    num: "03",
    title: "SkinMed",
    category: "Branding + Web",
    result: "3x ROI în 90 zile",
    color: "#1a0520",
  },
  {
    num: "04",
    title: "OrthoSmile",
    category: "SEO + Content",
    result: "#1 Google local",
    color: "#0a1a15",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX;
      scrollStart.current = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const walk = (e.pageX - startX.current) * 1.5;
      el.scrollLeft = scrollStart.current - walk;
    };

    const onUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <section
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
          padding: "0 clamp(2rem, 6vw, 8rem)",
          marginBottom: "clamp(3rem, 5vh, 5rem)",
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
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
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
          gap: "1.5rem",
          paddingLeft: "clamp(2rem, 6vw, 8rem)",
          paddingRight: "clamp(2rem, 6vw, 8rem)",
          overflowX: "auto",
          overflowY: "hidden",
          cursor: "grab",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            data-hover
            style={{
              flexShrink: 0,
              width: "clamp(320px, 35vw, 420px)",
              height: "clamp(380px, 45vh, 480px)",
              borderRadius: "16px",
              background: project.color,
              border: "1px solid rgba(255,255,255,0.04)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              scrollSnapAlign: "start",
            }}
            onMouseEnter={(e) => {
              if (!isDragging.current)
                e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.15)",
                  fontFamily: "monospace",
                }}
              >
                {project.num}
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                style={{ opacity: 0.15 }}
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#8b5cf6",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {project.category}
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.6rem",
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {project.result}
              </span>
            </div>
          </div>
        ))}

        <div
          data-hover
          style={{
            flexShrink: 0,
            width: "clamp(280px, 30vw, 350px)",
            height: "clamp(380px, 45vh, 480px)",
            borderRadius: "16px",
            border: "1px dashed rgba(139,92,246,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
            cursor: "pointer",
            transition: "border-color 0.3s, background 0.3s",
            scrollSnapAlign: "start",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
            e.currentTarget.style.background = "rgba(139,92,246,0.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
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
