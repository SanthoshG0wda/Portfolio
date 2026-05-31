import { motion } from "framer-motion";
import { Trophy, Zap, Target } from "lucide-react";
import { achievements } from "@/data/certifications";
import { useInView } from "@/hooks/useInView";
import { SectionGlow } from "@/components/ui/SectionGlow";

const iconMap = [Trophy, Zap, Target];

export function Achievements() {
  const { ref, visible } = useInView();

  return (
    <section id="achievements" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />
      <SectionGlow color="#3D6B8C" position="left" size="lg" />
      <SectionGlow color="#7A8A94" position="right" size="md" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          <span className="section-label">/* achievements */</span>
          <h2 className="section-title">Achievements</h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((a, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-xl p-6 hover-lift glow-cyan transition-all duration-300 group text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3D6B8C]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-[#3D6B8C]" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 leading-relaxed">
                  {a.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                {a.details && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {a.details.map((d, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-2 py-0.5 rounded border border-[#3D6B8C]/15 text-[#3D6B8C]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
