import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled
          ? "1rem clamp(2rem, 5vw, 6rem)"
          : "1.5rem clamp(2rem, 5vw, 6rem)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled
          ? "rgba(5, 5, 5, 0.8)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.04)"
          : "1px solid transparent",
      }}
    >
      <a
        href="/"
        data-hover
        style={{
          fontSize: "1.2rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          color: "white",
        }}
      >
        Bloom Media
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#8b5cf6",
            display: "inline-block",
          }}
        />
      </a>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-hover
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "white")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
            }
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
