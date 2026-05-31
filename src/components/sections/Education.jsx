import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { educationList } from "@/data/education";
import { useInView } from "@/hooks/useInView";
import { SectionGlow } from "@/components/ui/SectionGlow";

export function Education() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  return (
    <section id="education" ref={ref} className="section-padding relative">
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
          <span className="section-label">/* education */</span>
          <h2 className="section-title">Education</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {educationList.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.08 }}
              whileHover={{ scale: 1.02, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl p-6 hover-lift glow-cyan transition-all duration-300 group"
              style={{ borderTop: `3px solid ${edu.color}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-md"
                  style={{ background: `${edu.color}15`, color: edu.color }}
                >
                  {edu.year}
                </span>
                <GraduationCap size={16} style={{ color: edu.color }} />
              </div>
              <h3 className="text-white font-bold text-sm mb-1 leading-relaxed">
                {edu.degree}
              </h3>
              <p className="text-gray-500 text-xs mb-2">{edu.school}</p>
              {edu.specialization && (
                <p className="text-[11px] text-gray-600 mb-3 font-mono">
                  Specialization: {edu.specialization}
                </p>
              )}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <Award size={14} style={{ color: edu.color }} />
                <span className="text-sm font-semibold" style={{ color: edu.color }}>
                  {edu.cgpa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
