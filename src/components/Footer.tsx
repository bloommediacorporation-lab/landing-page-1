export default function Footer() {
  return (
    <footer style={{
      padding: "3rem clamp(2rem, 6vw, 8rem)",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      <span style={{
        fontSize: "0.75rem",
        color: "#333",
      }}>
        © 2025 Bloom. Toate drepturile rezervate.
      </span>

      <div style={{
        display: "flex",
        gap: "2rem",
      }}>
        {["Instagram", "LinkedIn", "Twitter"].map((s) => (
          <a
            key={s}
            href="#"
            data-hover
            style={{
              fontSize: "0.75rem",
              color: "#444",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
