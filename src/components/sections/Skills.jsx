import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code, Database, Terminal, FileCode, Cpu, Brain, Bot, Search, Eye, Network,
  GitBranch, Box, Server, BarChart, LineChart, Globe, Workflow, BookOpen,
  Layers, Sliders, Container, Settings,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { useInView } from "@/hooks/useInView";
import { SectionGlow } from "@/components/ui/SectionGlow";

const skillIcons = {
  Python: Code, JavaScript: FileCode, SQL: Database, Bash: Terminal,
  "C++": FileCode, Rust: Box,
  PyTorch: Brain, TensorFlow: Brain, "Scikit-learn": Cpu, "Hugging Face": Bot,
  LangChain: Link, LlamaIndex: Database, JAX: Cpu, ONNX: Box,
  "Supervised & Unsupervised Learning": Layers, "NLP & LLMs": Bot,
  "RAG & Vector Search": Search, "Model Fine-tuning": Sliders,
  "Transformer Architectures": Network, "Computer Vision": Eye,
  "Model Quantization": Cpu, "Experiment Tracking": BarChart,
  Docker: Container, "Git & GitHub": GitBranch, "VS Code": Code, Linux: Terminal,
  MLflow: LineChart, "Weights & Biases": BarChart, FastAPI: Server, Postman: Globe,
};

const categoryIcons = {
  Code, Brain, BookOpen, Settings,
};

function SkillTile({ name, color }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const Icon = skillIcons[name];

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateY(((x / rect.width) - 0.5) * 20);
    setRotateX((0.5 - (y / rect.height)) * 20);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 600, transformStyle: "preserve-3d" }}
      animate={{ rotateX, rotateY }}
      whileHover={{ scale: 1.12, z: 30 }}
      whileTap={{ scale: 0.95, z: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative px-3 py-2 rounded-lg border bg-white/[0.03] border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/20 cursor-default flex items-center gap-2"
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{ translateZ: 6 }}
      >
        {Icon && <Icon size={14} style={{ color }} />}
      </motion.div>
      <span className="text-xs text-gray-300 whitespace-nowrap">{name}</span>
    </motion.div>
  );
}

function Link(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link" {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function Skills() {
  const { ref, visible } = useInView({ rootMargin: "0px 0px 400px 0px" });

  return (
    <section id="skills" ref={ref} className="section-padding relative">
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
          <span className="section-label">/* skills */</span>
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Technical arsenal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.06 }}
              whileHover={{ scale: 1.02, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl p-6 hover-lift glow-cyan transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                {(() => { const CatIcon = categoryIcons[cat.icon]; return CatIcon ? <CatIcon size={24} style={{ color: cat.color }} /> : null; })()}
                <h3 className="text-base font-bold" style={{ color: cat.color }}>
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillTile key={skill} name={skill} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
