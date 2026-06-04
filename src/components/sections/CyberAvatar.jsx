import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const layerSizes = [5, 8, 7, 4];
const layerSpacing = 1.8;
const nodeSpacing = 0.55;

function Neuron({ position, color, index }) {
  const meshRef = useRef(null);
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pulse = Math.sin(t * 1.2 + phase.current) * 0.15 + 0.85;
    meshRef.current.scale.setScalar(pulse);
    meshRef.current.material.emissiveIntensity = 0.15 + Math.sin(t * 1.5 + phase.current) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Signal({ from, to, progress, color }) {
  const x = from[0] + (to[0] - from[0]) * progress;
  const y = from[1] + (to[1] - from[1]) * progress;
  const z = from[2] + (to[2] - from[2]) * progress;

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function NeuralNetwork() {
  const groupRef = useRef(null);
  const signalRef = useRef(null);
  const signals = useRef([]);

  const colors = ["#3D6B8C", "#7A8A94", "#B1D2C8", "#F59E0B"];

  const { positions, connections } = useMemo(() => {
    const pos = [];
    const totalWidth = (layerSizes.length - 1) * layerSpacing;
    const startX = -totalWidth / 2;

    layerSizes.forEach((count, l) => {
      const layer = [];
      const totalHeight = (count - 1) * nodeSpacing;
      const startY = -totalHeight / 2;
      const zOffset = (l - (layerSizes.length - 1) / 2) * 0.3;
      for (let n = 0; n < count; n++) {
        layer.push([
          startX + l * layerSpacing,
          startY + n * nodeSpacing,
          zOffset,
        ]);
      }
      pos.push(layer);
    });

    const conn = [];
    for (let l = 0; l < layerSizes.length - 1; l++) {
      for (let i = 0; i < layerSizes[l]; i++) {
        const neighbors = layerSizes[l + 1];
        const count = Math.min(neighbors, 3 + Math.floor(Math.random() * 2));
        const chosen = new Set();
        while (chosen.size < count) {
          chosen.add(Math.floor(Math.random() * neighbors));
        }
        chosen.forEach((j) => {
          conn.push({ fromLayer: l, fromNode: i, toNode: j });
        });
      }
    }
    return { positions: pos, connections: conn };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.15) * 0.08;
    }

    if (Math.random() < 0.03 && signals.current.length < 15) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const from = positions[conn.fromLayer][conn.fromNode];
      const to = positions[conn.fromLayer + 1][conn.toNode];
      const color = colors[conn.fromLayer % colors.length];
      signals.current.push({
        from,
        to,
        progress: 0,
        speed: 0.006 + Math.random() * 0.004,
        color,
      });
    }

    for (let i = signals.current.length - 1; i >= 0; i--) {
      signals.current[i].progress += signals.current[i].speed;
      if (signals.current[i].progress >= 1) {
        signals.current.splice(i, 1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => {
        const from = positions[conn.fromLayer][conn.fromNode];
        const to = positions[conn.fromLayer + 1][conn.toNode];
        return (
          <line key={`conn-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...from, ...to])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#3D6B8C"
              transparent
              opacity={0.08}
            />
          </line>
        );
      })}

      {layerSizes.map((count, l) =>
        Array.from({ length: count }).map((_, n) => (
          <Neuron
            key={`n-${l}-${n}`}
            position={positions[l][n]}
            color={colors[l % colors.length]}
            index={n}
          />
        ))
      )}

      {signals.current.map((sig, i) => (
        <Signal
          key={`sig-${i}`}
          from={sig.from}
          to={sig.to}
          progress={sig.progress}
          color={sig.color}
        />
      ))}
    </group>
  );
}

function MatrixRain() {
  const ref = useRef(null);
  const columns = 30;
  const drops = useRef(
    Array.from({ length: columns }, () => ({
      y: Math.random() * 20,
      speed: 0.3 + Math.random() * 0.5,
      chars: Array.from({ length: 8 }, () =>
        String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
      ),
    }))
  );

  useFrame((state) => {
    if (!ref.current) return;
    const positions = [];
    const t = state.clock.elapsedTime;

    drops.current.forEach((drop, i) => {
      drop.y += drop.speed * 0.02;
      if (drop.y > 12) drop.y = -4;
      const x = (i / columns) * 14 - 7;
      drop.chars.forEach((char, j) => {
        const y = drop.y - j * 0.3;
        const alpha = 0.4 - j * 0.05;
        if (alpha > 0) {
          positions.push(x, y, 0, alpha);
        }
      });
    });

    const geo = ref.current.geometry;
    const count = positions.length / 4;
    if (geo.attributes.position) {
      geo.attributes.position.array.set(positions);
      geo.attributes.position.count = count;
      geo.attributes.position.needsUpdate = true;
    }
    if (geo.attributes.alpha) {
      geo.attributes.alpha.array.set(
        positions.filter((_, i) => i % 4 === 3)
      );
      geo.attributes.alpha.needsUpdate = true;
    }
  });

  const posArray = new Float32Array(1000 * 4);
  const alphaArray = new Float32Array(1000);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={0}
          array={posArray}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-alpha"
          count={0}
          array={alphaArray}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#3D6B8C"
        transparent
        opacity={0.15}
        sizeAttenuation
      />
    </points>
  );
}

function DataParticles() {
  const ref = useRef(null);
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7A8A94"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#3D6B8C" />
      <directionalLight position={[-3, 2, -3]} intensity={0.2} color="#7A8A94" />

      <NeuralNetwork />
      <DataParticles />
      <MatrixRain />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          color="#3D6B8C"
          transparent
          opacity={0.03}
          wireframe
        />
      </mesh>
    </>
  );
}
