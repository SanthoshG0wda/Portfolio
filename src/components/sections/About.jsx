import { motion } from "framer-motion";
import { Brain, Cpu, Layers, Database } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { SectionGlow } from "@/components/ui/SectionGlow";

const highlights = [
  { label: "Projects", value: "4+", icon: "\u26A1", desc: "ML & LLM solutions" },
  { label: "Certifications", value: "4+", icon: "\uD83C\uDFC5", desc: "Industry-recognized credentials" },
  { label: "Hackathons", value: "3+", icon: "\uD83E\uDDE0", desc: "AI/ML competitions" },
  { label: "Languages", value: "6", icon: "\uD83D\uDCBB", desc: "Programming & scripting" },
];

const focusAreas = [
  { icon: Brain, label: "Deep Learning", color: "#3D6B8C" },
  { icon: Cpu, label: "LLM Fine-tuning", color: "#7A8A94" },
  { icon: Layers, label: "RAG Systems", color: "#B1D2C8" },
  { icon: Database, label: "MLOps", color: "#F59E0B" },
];

export function About() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  return (
    <section id="about" ref={ref} className="section-padding relative">
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
          <span className="section-label">/* about */</span>
          <h2 className="section-title">About Me</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Aspiring ML Engineer passionate about building intelligent systems with LLMs and deep learning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs border border-[#3D6B8C]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B1D2C8] animate-pulse-glow shrink-0" />
              <span className="text-gray-400">
                Open to{" "}
                <span className="text-[#3D6B8C] font-semibold">
                  Entry-Level ML / LLM Engineer
                </span>{" "}
                roles
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Aspiring ML Engineer with hands-on experience in fine-tuning large language models,
              building RAG pipelines, and deploying production-grade machine learning systems.
              Passionate about combining{" "}
              <span className="text-[#3D6B8C]">deep learning</span> and{" "}
              <span className="text-[#7A8A94]">natural language processing</span> to build
              intelligent applications that solve real-world problems.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              Currently pursuing B.E in Computer Science Engineering{" "}
              <span className="text-white/60">(AI & Machine Learning)</span> at
              Alva&apos;s Institute of Engineering and Technology. Actively contributing to
              open-source ML projects and participating in AI hackathons.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {focusAreas.map((area) => (
                <motion.div
                  key={area.label}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 border border-white/5 rounded-lg cursor-default"
                >
                  <area.icon size={14} style={{ color: area.color }} />
                  <span className="text-[11px] text-gray-400">{area.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 15 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-xl p-5 text-center hover-lift glow-cyan transition-all duration-300 cursor-default"
              >
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="text-2xl font-bold text-gradient mb-1">{h.value}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wider">
                  {h.label}
                </div>
                <div className="text-[9px] text-gray-600 mt-1">{h.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
