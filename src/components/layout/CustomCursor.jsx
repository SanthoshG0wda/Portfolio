import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-300 hidden lg:block"
        style={{
          left: x - 4,
          top: y - 4,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[#3D6B8C] shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
      </div>
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out hidden lg:block"
        style={{
          left: x - 16,
          top: y - 16,
          width: 32,
          height: 32,
          opacity: visible ? 0.15 : 0,
        }}
      >
        <div className="w-full h-full rounded-full border border-[#3D6B8C]" />
      </div>
    </>
  );
}
