import { useRef, useCallback } from "react";

export function Magnetic({ children, className = "", strength = 0.3 }) {
  const elRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!elRef.current) return;
      const rect = elRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      elRef.current.style.transform = `translate(${x}px, ${y}px)`;
      elRef.current.style.transition = "transform 0.2s ease-out";
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!elRef.current) return;
    elRef.current.style.transform = "translate(0px, 0px)";
    elRef.current.style.transition = "transform 0.4s ease-out";
  }, []);

  return (
    <div
      ref={elRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}
