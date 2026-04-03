import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem clamp(2rem, 5vw, 6rem)",
        mixBlendMode: "difference",
        transition: "padding 0.5s ease",
        ...(scrolled ? { padding: "1rem clamp(2rem, 5vw, 6rem)" } : {}),
      }}
    >
      <a href="/" data-hover style={{
        fontSize: "1.3rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        Bloom Media
        <span style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#8b5cf6",
          display: "inline-block",
        }} />
      </a>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(1.5rem, 3vw, 3rem)",
      }}>
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-hover
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "white",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
