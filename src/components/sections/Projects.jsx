import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, BarChart, Wrench } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { SectionGlow } from "@/components/ui/SectionGlow";

const projectIcons = { Bot, BarChart, Wrench };

export function Projects() {
  const [filter, setFilter] = useState("all");
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <SectionGlow color="#3D6B8C" position="left" size="lg" />
      <SectionGlow color="#7A8A94" position="right" size="md" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="section-heading"
        >
          <span className="section-label">/* projects */</span>
          <h2 className="section-title">Projects</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Real-world cybersecurity solutions and tools
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {projectCategories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-4 py-2 text-xs tracking-wider uppercase rounded-lg border transition-all duration-300",
                filter === cat.value
                  ? "bg-[#3D6B8C]/10 text-[#3D6B8C] border-[#3D6B8C]/30"
                  : "text-gray-500 border-white/5 hover:border-white/20 hover:text-white"
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  visible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.08 + i * 0.04 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-xl p-7 hover-lift glow-cyan transition-all duration-300 group h-full"
                style={{ borderLeft: `3px solid ${p.color}` }}
              >
                <div className="flex items-start gap-4 h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.color}15` }}
                  >
                    {(() => { const ProjIcon = projectIcons[p.icon]; return ProjIcon ? <ProjIcon size={24} style={{ color: p.color }} /> : null; })()}
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-md border uppercase tracking-wider"
                          style={{
                            borderColor: `${p.color}25`,
                            color: p.color,
                            background: `${p.color}08`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed mb-4 flex-1">
                      {p.desc}
                    </p>
                    <div className="space-y-1">
                      {p.features.map((f, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-xs text-gray-500"
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ background: p.color }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
