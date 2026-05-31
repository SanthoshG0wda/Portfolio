import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

const geometries = {
  torusKnot: [0.8, 0.3, 100, 16],
  icosahedron: [0.7, 0],
  octahedron: [0.7, 0],
  torus: [0.6, 0.25, 16, 100],
  dodecahedron: [0.65, 0],
};

function Shape({ type, color, mouseFactor = 0.03 }) {
  const meshRef = useRef();

  useFrame(({ pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += pointer.y * mouseFactor * 0.01;
      meshRef.current.rotation.y += pointer.x * mouseFactor * 0.01;
    }
  });

  const args = geometries[type] || geometries.torusKnot;

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        {type === "torusKnot" && <torusKnotGeometry args={args} />}
        {type === "icosahedron" && <icosahedronGeometry args={args} />}
        {type === "octahedron" && <octahedronGeometry args={args} />}
        {type === "torus" && <torusGeometry args={args} />}
        {type === "dodecahedron" && <dodecahedronGeometry args={args} />}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.3}
          roughness={0.4}
          wireframe={false}
          transparent
          opacity={0.7}
          distort={0.05}
          radius={0.3}
        />
      </mesh>
      <mesh scale={1.15}>
        {type === "torusKnot" && <torusKnotGeometry args={args} />}
        {type === "icosahedron" && <icosahedronGeometry args={args} />}
        {type === "octahedron" && <octahedronGeometry args={args} />}
        {type === "torus" && <torusGeometry args={args} />}
        {type === "dodecahedron" && <dodecahedronGeometry args={args} />}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function FloatingShape3D({
  type = "torusKnot",
  color = "#3D6B8C",
  position = "right",
  size = "md",
}) {
  const sizeMap = { sm: 200, md: 300, lg: 400 };
  const dim = sizeMap[size] || 300;
  const posClasses = {
    right: "right-0 top-1/2 -translate-y-1/2",
    left: "left-0 top-1/2 -translate-y-1/2",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-right": "right-0 top-0",
    "bottom-right": "right-0 bottom-0",
    "top-left": "left-0 top-0",
  };

  return (
    <div
      className={`absolute ${posClasses[position] || posClasses.right} pointer-events-none z-0 opacity-40`}
      style={{ width: dim, height: dim }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <Shape type={type} color={color} />
      </Canvas>
    </div>
  );
}
