import { useRef, useState, useCallback } from "react";

export function TiltCard({ children, className = "", intensity = 8 }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg)",
      transition: "transform 0.5s ease-out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
