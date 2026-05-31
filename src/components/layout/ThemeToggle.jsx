import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#3D6B8C]/40 hover:bg-[#3D6B8C]/5 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-[#3D6B8C]" />
      ) : (
        <Moon size={16} className="text-[#7A8A94]" />
      )}
    </motion.button>
  );
}
