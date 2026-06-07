import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

const commands = [
  {
    cmd: "python train.py --model llama --epochs 3",
    output: "Epoch 1/3: loss=1.234  acc=0.872\nEpoch 2/3: loss=0.876  acc=0.914\nEpoch 3/3: loss=0.654  acc=0.943\nModel saved to ./checkpoints/",
  },
  { cmd: "nvidia-smi", output: "GPU: RTX 4060\nMemory: 8.0/12.0 GB\nCUDA Version: 12.4" },
  {
    cmd: "curl -X POST localhost:8000/generate -d '{\"prompt\":\"Hello\"}'",
    output: '{"response":"Hello! How can I help you today?","tokens":8,"latency":"142ms"}',
  },
  {
    cmd: "pip list | grep torch",
    output: "torch              2.5.1\ntorchvision        0.20.1\ntransformers       4.47.0\ntokenizers         0.21.0",
  },
];

export function TerminalWidget() {
  const [open, setOpen] = useState(false);
  const [currentCmd, setCurrentCmd] = useState("");
  const [output, setOutput] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (!open) return;
    setCurrentCmd("");
    setOutput("");
    setPhase("typing");

    const cmd = commands[cmdIndex % commands.length];
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCurrentCmd(cmd.cmd.slice(0, i));
      if (i >= cmd.cmd.length) {
        clearInterval(timer);
        setTimeout(() => {
          setOutput(cmd.output);
          setPhase("done");
        }, 300);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [cmdIndex, open]);

  const nextCmd = () => {
    setCmdIndex((prev) => (prev + 1) % commands.length);
    setPhase("idle");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-50 w-12 h-12 rounded-xl glass flex items-center justify-center border border-[#3D6B8C]/20 text-[#3D6B8C] hover:border-[#3D6B8C]/40 hover:shadow-lg transition-all duration-300"
        aria-label="Open terminal"
      >
        <Terminal size={18} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 sm:left-8 right-4 sm:right-auto z-50 w-auto sm:w-[380px] terminal-card overflow-hidden shadow-2xl shadow-[#3D6B8C]/5"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-[#3D6B8C]" />
                <span className="text-[10px] text-gray-500 font-mono">
                  terminal &mdash; ./ml-engineer.sh
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B1D2C8]" />
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  <X size={12} />
                </motion.button>
              </div>
            </div>
            <div className="p-4 font-mono text-xs min-h-[140px]">
              <p className="text-gray-500 mb-2">
                <span className="text-gray-600">{">"}</span> Welcome to Santhosh&apos;s
                ML terminal
              </p>
              <p className="text-gray-500 mb-3">
                <span className="text-gray-600">{">"}</span> Run ML commands to explore
              </p>
              <div className="flex items-start gap-1.5 text-[#3D6B8C] mb-1">
                <span className="text-gray-500 shrink-0">$</span>
                <span>{currentCmd}</span>
                {phase === "typing" && (
                  <span className="w-1.5 h-3.5 bg-[#3D6B8C] animate-blink shrink-0" />
                )}
              </div>
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-400 whitespace-pre-line mb-2 font-mono text-[11px] leading-relaxed"
                >
                  {output}
                </motion.div>
              )}
              {phase === "done" && (
                <motion.button
                  onClick={nextCmd}
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 text-[10px] text-gray-600 hover:text-[#3D6B8C] transition-colors font-mono"
                >
                  {">"} Press to run next command...
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
