import { useRef } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { useInView } from "@/hooks/useInView";
import { Cpu } from "lucide-react";
import { SectionGlow } from "@/components/ui/SectionGlow";

function TimelineFlow() {
  const dotRef = useRef(null);

  return (
    <motion.div
      ref={dotRef}
      className="absolute left-[17px] top-0 bottom-0 w-px overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D6B8C] via-[#7A8A94] via-[#B1D2C8] to-transparent" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-[#3D6B8C] to-transparent blur-sm"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export function Experience() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  return (
    <section id="experience" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <SectionGlow color="#3D6B8C" position="left" size="lg" />
      <SectionGlow color="#7A8A94" position="right" size="md" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="section-heading"
        >
          <span className="section-label">/* experience */</span>
          <h2 className="section-title">Experience</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Professional journey in ML engineering and AI research
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <TimelineFlow />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.1 }}
                className="relative pl-14"
              >
                <div
                  className="absolute left-[9.5px] top-1 w-[15px] h-[15px] rounded-full border-2 bg-[#1A2332] z-10 flex items-center justify-center"
                  style={{ borderColor: exp.color }}
                >
                  <div
                    className="w-full h-full rounded-full animate-pulse-glow"
                    style={{ background: exp.color }}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass rounded-xl p-6 hover-lift glow-cyan transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">
                      {exp.period}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1"
                      style={{ background: `${exp.color}18`, color: exp.color }}
                    >
                      <Cpu size={10} />
                      {exp.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-sm mb-3" style={{ color: exp.color }}>
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="text-gray-400 text-sm flex gap-2">
                        <span className="mt-0.5 shrink-0" style={{ color: exp.color }}>
                          ▸
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
