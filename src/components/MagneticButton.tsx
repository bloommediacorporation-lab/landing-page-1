import { useRef, useCallback } from "react";

interface Props {
  children: React.ReactNode;
  href?: string;
  strength?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  strength = 0.3,
  style = {},
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => {
      if (el) el.style.transition = "transform 0.15s ease-out";
    }, 500);
  }, []);

  const handleEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.15s ease-out";
  }, []);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    padding: "1.2rem 3rem",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "100px",
    background: "transparent",
    color: "white",
    fontSize: "0.85rem",
    letterSpacing: "0.05em",
    textDecoration: "none",
    cursor: "none",
    willChange: "transform",
    transition: "transform 0.15s ease-out",
    ...style,
  };

  const props = {
    ref: ref as any,
    style: baseStyle,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onMouseEnter: handleEnter,
    "data-hover": true,
  };

  if (href) {
    return (
      <a {...props} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
}
