import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock } from "lucide-react";
import { certifications } from "@/data/certifications";
import { useInView } from "@/hooks/useInView";
import { Badge } from "@/components/ui/badge";
import { SectionGlow } from "@/components/ui/SectionGlow";

const statusIcons = {
  Ongoing: Clock,
  Completed: CheckCircle,
};

export function Certifications() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  return (
    <section id="certifications" ref={ref} className="section-padding relative">
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
          <span className="section-label">/* certifications */</span>
          <h2 className="section-title">Certifications</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Industry-recognized credentials and professional development
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {certifications.map((c, i) => {
            const StatusIcon = statusIcons[c.status];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-xl p-5 hover-lift glow-cyan transition-all duration-300 flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}15` }}
                >
                  <Shield size={20} style={{ color: c.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base font-medium leading-relaxed mb-1">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={c.status === "Completed" ? "success" : "warning"}>
                      <StatusIcon size={10} className="mr-1 inline" />
                      {c.status}
                    </Badge>
                    <span className="text-xs text-gray-600 font-mono">
                      {c.provider}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
