interface Props {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export default function Section({
  children,
  zIndex = 1,
  className,
  style = {},
  id,
}: Props) {
  return (
    <div
      id={id}
      className={className}
      style={{
        position: "relative",
        zIndex,
        background: "#050505",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
