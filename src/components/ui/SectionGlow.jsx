export function SectionGlow({ color = "#3D6B8C", position = "right", size = "md" }) {
  const sizeClass = size === "lg" ? "w-72 h-72" : size === "sm" ? "w-36 h-36" : "w-52 h-52";
  const posClass = position === "left" ? "left-0 top-1/2 -translate-y-1/2" : "right-0 top-1/2 -translate-y-1/2 -translate-x-1/4";

  return (
    <div
      className={`absolute ${posClass} ${sizeClass} pointer-events-none z-0`}
      style={{ perspective: "800px" }}
    >
      <div
        className="w-full h-full rounded-full animate-float-3d"
        style={{
          background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
          boxShadow: `0 0 80px ${color}15`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-[15%] rounded-full animate-orbit-3d"
          style={{
            border: `1px solid ${color}20`,
            boxShadow: `inset 0 0 30px ${color}10`,
          }}
        />
        <div
          className="absolute inset-[30%] rounded-full animate-orbit-3d-reverse"
          style={{
            border: `1px solid ${color}10`,
          }}
        />
      </div>
    </div>
  );
}
