import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMousePosition } from "@/hooks/useMousePosition";

const COUNT = 80;

function Particles() {
  const meshRef = useRef();
  const mouse = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  const speeds = useMemo(
    () => Array.from({ length: COUNT }, () => 0.02 + Math.random() * 0.04),
    []
  );

  useFrame(({ clock }) => {
    mouseRef.current.x += (mouse.x / window.innerWidth - 0.5 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (mouse.y / window.innerHeight - 0.5 - mouseRef.current.y) * 0.02;

    if (meshRef.current) {
      meshRef.current.rotation.x = mouseRef.current.y * 0.3;
      meshRef.current.rotation.y = mouseRef.current.x * 0.3;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#3D6B8C"
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 1.5]}>
        <Particles />
      </Canvas>
    </div>
  );
}
