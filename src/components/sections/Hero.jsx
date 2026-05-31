import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Cpu } from "lucide-react";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useTypewriter } from "@/hooks/useTypewriter";

const typingTexts = [
  "Machine Learning",
  "Deep Learning",
  "LLM Fine-tuning",
  "RAG Systems",
  "NLP",
  "Computer Vision",
];

const introText =
  "Hello, I'm Santhosh Gowda M — an AI/ML engineer and cybersecurity enthusiast with hands-on research and industry experience building LLM-driven applications. I specialise in Large Language Models, Retrieval-Augmented Generation, and Information Security. Welcome to my portfolio.";

export function Hero() {
  const typedText = useTypingAnimation({ texts: typingTexts, typeSpeed: 50 });
  const { displayed: typedIntro, isComplete } = useTypewriter(introText, {
    speed: 18,
    startDelay: 600,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url(/Gemini_Generated_Image_f1y4ygf1y4ygfGemini_Generated_Image_f2q8mrf2q8mrf2q81y4-clean.png)",
          backgroundPosition: "calc(100% + 200px) center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to right, #1A2332 0%, #1A2332 30%, #1A2332 40%, transparent 60%)",
        }}
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="w-full lg:w-[55%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 glass-strong rounded-full text-xs uppercase tracking-[0.2em] text-[#3D6B8C]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B1D2C8] animate-pulse-glow" />
            ML Engineer / LLM Enthusiast
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
          >
            <span className="text-white/90">Santhosh Gowda M</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 mb-4 leading-relaxed"
          >
            ML Engineer <span className="text-white/40">|</span> LLM Developer{" "}
            <span className="text-white/40">|</span> AI Researcher
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-sm md:text-base text-gray-400 leading-relaxed min-h-[4.5rem]">
              {typedIntro}
              {!isComplete && (
                <span className="w-0.5 h-4 bg-[#3D6B8C] animate-blink inline-block ml-0.5" />
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="inline-flex items-center gap-3 px-4 py-2 terminal-card mb-8"
          >
            <Cpu size={12} className="text-[#B1D2C8]" />
            <span className="text-[11px] text-gray-500 font-mono">$ ./skills.sh</span>
            <span className="text-sm text-[#3D6B8C] font-mono">{typedText}</span>
            <span className="w-0.5 h-4 bg-[#3D6B8C] animate-blink" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 flex-wrap mb-8"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#3D6B8C] to-[#7A8A94] text-white font-semibold rounded-lg hover-lift glow-cyan transition-all duration-300"
            >
              View Projects
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#3D6B8C]/40 text-[#3D6B8C] font-semibold rounded-lg hover:bg-[#3D6B8C]/10 hover:border-[#3D6B8C] transition-all duration-300"
            >
              <Mail size={16} />
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            {[
              { href: "https://github.com/G0wda", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/santhosh-gowda", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:santhoshgowda9542@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 text-gray-400 hover:text-[#3D6B8C] hover:border-[#3D6B8C]/40 hover:bg-[#3D6B8C]/5 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-[#3D6B8C]/50" />
        </div>
      </div>
    </section>
  );
}
