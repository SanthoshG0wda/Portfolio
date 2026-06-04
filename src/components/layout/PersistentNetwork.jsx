import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const SPREAD_X = 20;
const SPREAD_Y = 14;
const SPREAD_Z = 10;
const CONNECTION_DIST = 3.5;

function randomColor() {
  const shades = ["#8899AA", "#667788", "#99AABB", "#778899", "#AABBCC"];
  return shades[Math.floor(Math.random() * shades.length)];
}

function generateNodes() {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      pos: [
        (Math.random() - 0.5) * SPREAD_X,
        (Math.random() - 0.5) * SPREAD_Y,
        (Math.random() - 0.5) * SPREAD_Z,
      ],
      color: randomColor(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.6,
      drift: [(Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3],
    });
  }
  return nodes;
}

function generateConnections(nodes) {
  const conns = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].pos[0] - nodes[j].pos[0];
      const dy = nodes[i].pos[1] - nodes[j].pos[1];
      const dz = nodes[i].pos[2] - nodes[j].pos[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < CONNECTION_DIST && Math.random() < 0.4) {
        conns.push({ from: i, to: j, opacity: 0.03 + Math.random() * 0.05 });
      }
    }
  }
  return conns;
}

function ScatteredNodes({ nodes }) {
  const meshRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    nodes.forEach((node, i) => {
      const m = meshRefs.current[i];
      if (!m) return;
      const pulse = Math.sin(t * node.speed + node.phase) * 0.2 + 0.8;
      m.scale.setScalar(pulse);
      m.material.emissiveIntensity = 0.08 + Math.sin(t * node.speed * 1.2 + node.phase) * 0.1;
      m.position.x = node.pos[0] + Math.sin(t * 0.2 + node.phase) * node.drift[0];
      m.position.y = node.pos[1] + Math.cos(t * 0.15 + node.phase * 1.3) * node.drift[1];
      m.position.z = node.pos[2] + Math.sin(t * 0.1 + node.phase * 0.7) * node.drift[2];
    });
  });

  return (
    <group>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          position={node.pos}
          ref={(el) => { meshRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function ScatteredConnections({ nodes, connections }) {
  const positions = useMemo(() => {
    const arr = [];
    connections.forEach((conn) => {
      const from = nodes[conn.from].pos;
      const to = nodes[conn.to].pos;
      arr.push(...from, ...to);
    });
    return new Float32Array(arr);
  }, []);

  const opacities = useMemo(() => {
    const arr = [];
    connections.forEach((conn) => {
      arr.push(conn.opacity, conn.opacity);
    });
    return new Float32Array(arr);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={opacities.length}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#8899AA" transparent opacity={0.04} />
    </lineSegments>
  );
}

function ScatteredSignals({ nodes, connections }) {
  const ref = useRef(null);
  const signals = useRef([]);
  const maxSignals = 15;

  const posArray = useMemo(() => new Float32Array(maxSignals * 3), []);
  const defaultArray = useMemo(() => {
    const arr = new Float32Array(maxSignals * 3);
    for (let i = 0; i < maxSignals; i++) arr[i * 3 + 1] = -100;
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;

    if (signals.current.length < maxSignals && Math.random() < 0.06) {
      const ci = Math.floor(Math.random() * connections.length);
      const conn = connections[ci];
      const from = nodes[conn.from].pos;
      const to = nodes[conn.to].pos;
      signals.current.push({
        from: [...from],
        to: [...to],
        progress: 0,
        speed: 0.003 + Math.random() * 0.005,
      });
    }

    let idx = 0;
    for (let s = signals.current.length - 1; s >= 0; s--) {
      const sig = signals.current[s];
      sig.progress += sig.speed;
      if (sig.progress >= 1) { signals.current.splice(s, 1); continue; }
      pos[idx * 3] = sig.from[0] + (sig.to[0] - sig.from[0]) * sig.progress;
      pos[idx * 3 + 1] = sig.from[1] + (sig.to[1] - sig.from[1]) * sig.progress;
      pos[idx * 3 + 2] = sig.from[2] + (sig.to[2] - sig.from[2]) * sig.progress;
      idx++;
    }

    for (let i = idx; i < maxSignals; i++) {
      pos[i * 3] = defaultArray[i * 3];
      pos[i * 3 + 1] = defaultArray[i * 3 + 1];
      pos[i * 3 + 2] = defaultArray[i * 3 + 2];
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.setDrawRange(0, idx || 1);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxSignals}
          array={posArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#99AABB"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralScene() {
  const nodes = useMemo(() => generateNodes(), []);
  const connections = useMemo(() => generateConnections(nodes), []);

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <ScatteredConnections nodes={nodes} connections={connections} />
      <ScatteredNodes nodes={nodes} />
      <ScatteredSignals nodes={nodes} connections={connections} />
    </group>
  );
}

export function PersistentNetworkBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NeuralScene />
      </Canvas>
    </div>
  );
}
