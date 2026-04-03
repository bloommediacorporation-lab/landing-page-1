export default function SectionDivider() {
  return (
    <div
      style={{
        height: "200px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "1px",
          height: "80px",
          background:
            "linear-gradient(to bottom, transparent, rgba(139,92,246,0.3), transparent)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
