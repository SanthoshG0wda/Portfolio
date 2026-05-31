import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Image, Stars } from "@react-three/drei";
import * as THREE from "three";

const IMAGE_PATH = "/Gemini_Generated_Image_f2q8mrf2q8mrf2q8.png";

function FloatingImage() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
      <Image
        ref={meshRef}
        url={IMAGE_PATH}
        transparent
        opacity={1}
        scale={[3.5, 3.5, 1]}
        position={[0.5, 0.2, -0.5]}
      />
    </Float>
  );
}

function GlowRing() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <ringGeometry args={[1.8, 2.2, 64]} />
      <meshBasicMaterial color="#3D6B8C" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ParticleField() {
  return <Stars radius={60} depth={40} count={800} factor={3} saturation={0} fade speed={0.8} />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={0.5} />
      <FloatingImage />
      <GlowRing />
      <ParticleField />
    </>
  );
}

export function Hero3DImage() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
