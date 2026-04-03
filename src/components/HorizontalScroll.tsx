const PROJECTS = [
  {
    title: "DentaVille",
    category: "Landing Page + Ads",
    result: "+37 programări/lună",
    color: "#1a0a2e",
  },
  {
    title: "Clinica Plus",
    category: "Automatizări CRM",
    result: "15h/săptămână economisite",
    color: "#0a1628",
  },
  {
    title: "SkinMed",
    category: "Branding + Web",
    result: "3x ROI în 90 zile",
    color: "#1a0520",
  },
  {
    title: "OrthoSmile",
    category: "SEO + Content",
    result: "#1 Google local",
    color: "#0a1a15",
  },
];

const MARQUEE_ITEMS = [
  "Proiecte", "—", "Rezultate Reale", "—", 
  "ROI Demonstrabil", "—", "Clienți Mulțumiți", "—",
  "Proiecte", "—", "Rezultate Reale", "—", 
  "ROI Demonstrabil", "—", "Clienți Mulțumiți", "—",
];

export default function HorizontalScroll() {
  return (
    <section
      style={{
        padding: "clamp(8rem, 15vh, 12rem) clamp(2rem, 6vw, 8rem)",
      }}
    >
      <div
        style={{
          marginBottom: "clamp(3rem, 6vh, 5rem)",
          display: "flex",
          alignItems: "baseline",
          gap: "2rem",
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
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
          }}
        >
          Proiecte
        </h2>
      </div>

      <div
        style={{
          overflow: "hidden",
          paddingVertical: "clamp(1.5rem, 3vh, 2.5rem)",
          marginBottom: "clamp(3rem, 6vh, 5rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "fit-content",
            animation: "marquee 40s linear infinite",
          }}
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: item === "—" ? "#8b5cf6" : "transparent",
                WebkitTextStroke: item === "—" ? "none" : "1px rgba(255,255,255,0.15)",
                paddingRight: "clamp(1rem, 2vw, 2rem)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            data-hover
            style={{
              height: "clamp(300px, 45vh, 450px)",
              borderRadius: "16px",
              background: project.color,
              border: "1px solid rgba(255,255,255,0.04)",
              padding: "clamp(2rem, 3vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "2rem",
                left: "2rem",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "monospace",
              }}
            >
              0{i + 1}
            </span>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
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
                  marginBottom: "0.8rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {project.result}
              </span>
            </div>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                opacity: 0.15,
              }}
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
