import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NETWORK_LAYERS = [7, 8, 8, 5];
const LAYER_SPACING = 260;
const NODE_SPACING = 110;
const NODE_RADIUS = 10;

function getOffscreenPosition(w, h) {
  const side = Math.floor(Math.random() * 8);
  const m = 600;
  switch (side) {
    case 0: return { x: -m - Math.random() * 400, y: Math.random() * h };
    case 1: return { x: w + m + Math.random() * 400, y: Math.random() * h };
    case 2: return { x: Math.random() * w, y: -m - Math.random() * 400 };
    case 3: return { x: Math.random() * w, y: h + m + Math.random() * 400 };
    case 4: return { x: -m - Math.random() * 400, y: -m - Math.random() * 400 };
    case 5: return { x: w + m + Math.random() * 400, y: -m - Math.random() * 400 };
    case 6: return { x: -m - Math.random() * 400, y: h + m + Math.random() * 400 };
    default: return { x: w + m + Math.random() * 400, y: h + m + Math.random() * 400 };
  }
}

function getNetworkPositions(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const allNodes = [];
  const totalW = (NETWORK_LAYERS.length - 1) * LAYER_SPACING;
  const startX = cx - totalW / 2;

  NETWORK_LAYERS.forEach((count, l) => {
    const totalH = (count - 1) * NODE_SPACING;
    const startY = cy - totalH / 2;
    for (let n = 0; n < count; n++) {
      const x = startX + l * LAYER_SPACING;
      const y = startY + n * NODE_SPACING;
      allNodes.push({
        x,
        y,
        offscreen: getOffscreenPosition(width, height),
        layer: l,
        index: n,
      });
    }
  });
  return allNodes;
}

function getConnections(allNodes) {
  const conns = [];
  const byLayer = {};
  allNodes.forEach((n) => {
    if (!byLayer[n.layer]) byLayer[n.layer] = [];
    byLayer[n.layer].push(n);
  });
  for (let l = 0; l < NETWORK_LAYERS.length - 1; l++) {
    const fromLayer = byLayer[l] || [];
    const toLayer = byLayer[l + 1] || [];
    fromLayer.forEach((from) => {
      const count = 2 + Math.floor(Math.random() * 2);
      const chosen = new Set();
      while (chosen.size < Math.min(count, toLayer.length)) {
        chosen.add(Math.floor(Math.random() * toLayer.length));
      }
      chosen.forEach((j) => {
        conns.push({ from, to: toLayer[j], layer: l });
      });
    });
  }
  return conns;
}

const nodeSpring = { type: "spring", stiffness: 70, damping: 16, mass: 0.9 };

const HEX_PAIRS = "53 61 6E 74 68 6F 73 68 20 47 6F 77 64 61 20 4D".split(" ");

const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
}));

function TypingText({ text, className }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle"
          style={{ background: "#3D6B8C", boxShadow: "0 0 6px rgba(61,107,140,.8)" }}
        />
      )}
    </span>
  );
}

function NeuralNetworkSVG({ allNodes = [], connections = [], phase, networkReady, dataPhase = 0 }) {
  const COLOR_ACCENT = "#3D6B8C";
  const COLOR_HIGHLIGHT = "#B1D2C8";

  const xs = allNodes.map(n => n.x);
  const ys = allNodes.map(n => n.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = Math.max((maxX - minX) * 0.4, (maxY - minY) * 0.2);
  const vx = minX - pad;
  const vy = minY - pad;
  const vw = maxX - minX + pad * 2;
  const vh = maxY - minY + pad * 2;
  const midY = (minY + maxY) / 2;

  const layerCenters = useMemo(() => {
    const byLayer = {};
    allNodes.forEach(n => {
      if (!byLayer[n.layer]) byLayer[n.layer] = [];
      byLayer[n.layer].push(n);
    });
    return Object.keys(byLayer).sort((a, b) => a - b).map(l => {
      const nodes = byLayer[l];
      return { x: nodes[0].x, y: nodes.reduce((s, n) => s + n.y, 0) / nodes.length };
    });
  }, [allNodes]);

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      animate={
        networkReady
          ? { scale: [1, 1.03, 1], opacity: [1, 0.7, 1], transition: { duration: 0.8, ease: "easeInOut" } }
          : {}
      }
      style={{ filter: "drop-shadow(0 0 20px rgba(61,107,140,.3))" }}
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLOR_HIGHLIGHT} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLOR_HIGHLIGHT} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={COLOR_ACCENT} floodOpacity="0.7" />
        </filter>
        <filter id="lineGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={COLOR_HIGHLIGHT} floodOpacity="0.4" />
        </filter>
        <radialGradient id="packetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLOR_HIGHLIGHT} stopOpacity="0.8" />
          <stop offset="50%" stopColor={COLOR_HIGHLIGHT} stopOpacity="0.2" />
          <stop offset="100%" stopColor={COLOR_HIGHLIGHT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="packetCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor={COLOR_HIGHLIGHT} stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {connections.map((conn, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={conn.from.x}
          y1={conn.from.y}
          x2={conn.to.x}
          y2={conn.to.y}
          stroke={COLOR_HIGHLIGHT}
          strokeWidth={0.5}
          strokeOpacity={0.4}
          filter="url(#lineGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            phase >= 2
              ? { pathLength: 1, opacity: 1, transition: { delay: 0.6 + conn.layer * 0.2, duration: 0.5, ease: "easeInOut" } }
              : {}
          }
        />
      ))}

      {phase >= 3 &&
        connections.map((conn, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r={2}
            fill={COLOR_HIGHLIGHT}
            style={{ filter: "drop-shadow(0 0 6px rgba(177,210,200,.8))" }}
            animate={{
              cx: [conn.from.x, (conn.from.x + conn.to.x) / 2, conn.to.x],
              cy: [conn.from.y, (conn.from.y + conn.to.y) / 2, conn.to.y],
              opacity: [0, 1, 0],
              scale: [0.3, 1.2, 0.3],
            }}
            transition={{
              duration: 0.5,
              delay: 4 + conn.layer * 0.06,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {allNodes.map((node) => {
        const delay = 0.5 + node.layer * 0.12 + node.index * 0.03;
        return (
          <motion.g
            key={`node-${node.layer}-${node.index}`}
            initial={{ x: node.offscreen.x, y: node.offscreen.y, opacity: 0, scale: 0 }}
            animate={
              phase >= 1
                ? { x: node.x, y: node.y, opacity: 1, scale: 1, transition: { ...nodeSpring, delay, duration: 1 } }
                : {}
            }
          >
            <circle cx={0} cy={0} r={NODE_RADIUS * 3} fill="url(#nodeGlow)" />
            <circle cx={0} cy={0} r={NODE_RADIUS} fill={COLOR_ACCENT} filter="url(#glow)" />
            <circle cx={0} cy={0} r={NODE_RADIUS * 0.5} fill="#fff" opacity={0.6} />
            <motion.circle
              cx={0} cy={0}
              r={NODE_RADIUS * 2}
              fill="none"
              stroke={COLOR_HIGHLIGHT}
              strokeWidth={0.3}
              strokeOpacity={0.3}
              animate={{ r: [NODE_RADIUS * 2, NODE_RADIUS * 3, NODE_RADIUS * 2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>
        );
      })}

      {dataPhase >= 1 && layerCenters.length > 0 && (
        <g>
          <motion.g
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <text x={layerCenters[0].x - 20} y={midY - 36} fill={COLOR_HIGHLIGHT} fontSize="10" fontFamily="monospace" textAnchor="end" opacity="0.55" letterSpacing="3" style={{ textShadow: `0 0 12px ${COLOR_ACCENT}88` }}>
              INPUT VECTOR
            </text>
          </motion.g>

          {dataPhase >= 2 && HEX_PAIRS.map((pair, i) => {
            const entryX = layerCenters[0].x - 80;
            const exitX = layerCenters[layerCenters.length - 1].x + 80;
            const layerXs = layerCenters.map(lc => lc.x);
            const flowPath = [entryX, ...layerXs, exitX];
            const flowTimes = flowPath.map((_, idx, arr) => idx / (arr.length - 1));
            const firstLayerNodes = allNodes.filter(n => n.layer === 0);
            const nodeY = firstLayerNodes.length ? firstLayerNodes[i % firstLayerNodes.length].y : midY;
            return (
              <motion.text
                key={`flow-${i}`}
                y={nodeY}
                fontSize="22"
                fontFamily="monospace"
                fill={COLOR_HIGHLIGHT}
                textAnchor="middle"
                fontWeight="bold"
                style={{ textShadow: `0 0 25px ${COLOR_ACCENT}dd, 0 0 50px ${COLOR_ACCENT}88, 0 0 80px ${COLOR_ACCENT}44` }}
                initial={{ x: entryX - 40, opacity: 0, scale: 0.3 }}
                animate={{ x: flowPath, opacity: [0, ...layerXs.map(() => 1), 0], scale: [0.3, ...layerXs.map(() => 1.5), 0.3] }}
                transition={{ duration: 1.4, delay: i * 0.06, ease: "easeInOut", times: flowTimes }}
              >
                {pair}
              </motion.text>
            );
          })}

          {dataPhase >= 6 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <text x={layerCenters[layerCenters.length - 1].x + 60} y={midY} fill={COLOR_HIGHLIGHT} fontSize="7" fontFamily="monospace" textAnchor="start" opacity="0.35" letterSpacing="2">
                RESULT
              </text>
            </motion.g>
          )}
        </g>
      )}
    </motion.svg>
  );
}

export function NeuralLoader({ progress, loading, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [networkReady, setNetworkReady] = useState(false);
  const [size, setSize] = useState({ width: typeof window !== "undefined" ? window.innerWidth : 1920, height: typeof window !== "undefined" ? window.innerHeight : 1080 });
  const [show, setShow] = useState(true);

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const allNodes = useMemo(() => getNetworkPositions(size.width, size.height), [size]);
  const connections = useMemo(() => getConnections(allNodes), [allNodes]);

  useEffect(() => {
    if (!show) return;
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => { setNetworkReady(true); setPhase(4); }, 2000),
      setTimeout(() => {
        setPhase(5);
        setTimeout(() => { setShow(false); onComplete?.(); }, 500);
      }, 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [show]);

  const [dataPhase, setDataPhase] = useState(0);

  useEffect(() => {
    if (!networkReady) return;
    const timers = [
      setTimeout(() => setDataPhase(1), 400),
      setTimeout(() => setDataPhase(2), 700),
      setTimeout(() => setDataPhase(3), 1000),
      setTimeout(() => setDataPhase(4), 1300),
      setTimeout(() => setDataPhase(5), 1600),
      setTimeout(() => setDataPhase(6), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [networkReady]);

  useEffect(() => {
    if (loading === false && phase >= 4) {
      const t1 = setTimeout(() => setPhase(5), 200);
      const t2 = setTimeout(() => { setShow(false); onComplete?.(); }, 1100);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [loading, phase]);

  const statusText = useMemo(() => {
    if (phase === 0) return "INITIALIZING NEURAL NETWORK";
    if (phase <= 2) return "ASSEMBLING NEURAL NETWORK";
    if (phase === 3) return "ACTIVATING SYNAPSES";
    if (phase === 4) return "NEURAL NETWORK READY";
    return "LAUNCHING...";
  }, [phase]);

  const COLOR_ACCENT = "#3D6B8C";
  const COLOR_HIGHLIGHT = "#B1D2C8";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at center, #1A2332 0%, #141B27 60%, #0D1117 100%)",
          }}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: COLOR_ACCENT,
                left: `${p.x}%`,
                top: `${p.y}%`,
                boxShadow: `0 0 4px ${COLOR_ACCENT}99`,
              }}
              animate={{ opacity: [0, 0.5, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <NeuralNetworkSVG
            allNodes={allNodes}
            connections={connections}
            phase={phase}
            networkReady={networkReady}
            dataPhase={dataPhase}
          />

          {dataPhase >= 6 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.9 }}
                className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-wider"
                style={{
                  color: COLOR_HIGHLIGHT,
                  textShadow: `0 0 30px ${COLOR_ACCENT}cc, 0 0 60px ${COLOR_ACCENT}66, 0 0 100px ${COLOR_ACCENT}33`,
                }}
              >
                Santhosh Gowda M
              </motion.p>
            </motion.div>
          )}

          <motion.div
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {phase < 4 && (
              <p
                className="text-xs font-mono tracking-[0.4em] mb-2"
                style={{ color: COLOR_HIGHLIGHT, opacity: 0.6 }}
              >
                <TypingText text={statusText} />
              </p>
            )}

            <AnimatePresence mode="wait">
              {phase === 4 && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p
                    className="text-sm font-mono tracking-[0.4em]"
                    style={{
                      color: COLOR_HIGHLIGHT,
                      textShadow: `0 0 20px ${COLOR_ACCENT}99, 0 0 60px ${COLOR_ACCENT}44`,
                    }}
                  >
                    {dataPhase === 0
                      ? "NEURAL NETWORK READY"
                      : dataPhase >= 6
                        ? "VECTOR DECODED SUCCESSFULLY"
                        : "PROCESSING INPUT VECTOR"}
                  </p>
                  {dataPhase >= 1 && dataPhase < 6 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] font-mono tracking-[0.3em] mt-2"
                      style={{ color: COLOR_HIGHLIGHT, opacity: 0.4 }}
                    >
                      <TypingText text={`DECODING... ${Math.floor((dataPhase - 1) / 5 * 100)}%`} />
                    </motion.p>
                  )}
                  {dataPhase >= 6 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[11px] font-mono tracking-[0.3em] mt-2"
                      style={{ color: COLOR_ACCENT, opacity: 0.5 }}
                    >
                      DECODED SUCCESSFULLY
                    </motion.p>
                  )}
                </motion.div>
              )}
              {phase === 5 && (
                <motion.p
                  key="launch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-mono tracking-[0.4em]"
                  style={{ color: COLOR_HIGHLIGHT, opacity: 0.4 }}
                >
                  LAUNCHING...
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-1.5">
              <div className="w-32 h-[1px]" style={{
                background: `linear-gradient(90deg, transparent, ${COLOR_HIGHLIGHT}${networkReady ? "44" : "66"}, transparent)`,
              }} />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: COLOR_HIGHLIGHT,
                  boxShadow: networkReady
                    ? `0 0 12px ${COLOR_ACCENT}cc`
                    : `0 0 6px ${COLOR_ACCENT}66`,
                }}
              />
              <div className="w-32 h-[1px]" style={{
                background: `linear-gradient(90deg, transparent, ${COLOR_HIGHLIGHT}${networkReady ? "44" : "66"}, transparent)`,
              }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
