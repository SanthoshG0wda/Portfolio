import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = ["About", "Experience", "Skills", "Services", "Projects", /*"Achievements"*/, "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((id) => document.getElementById(id.toLowerCase()));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActive(navItems[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    setActive(id);
    window.location.hash = id.toLowerCase();
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass shadow-lg shadow-[#3D6B8C]/5 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="text-xl font-bold text-gradient tracking-wider"
          aria-label="Scroll to top"
        >
         
        </motion.button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative px-4 py-2 text-sm tracking-widest uppercase rounded-lg transition-all duration-300",
                active === item
                  ? "text-[#3D6B8C] bg-[#3D6B8C]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {item}
              {active === item && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#3D6B8C] to-[#7A8A94] rounded-full" />
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex md:hidden items-center gap-3">
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={20} className="text-[#3D6B8C]" />
            ) : (
              <Menu size={20} className="text-[#3D6B8C]" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-[#3D6B8C]/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(item)}
                  className={cn(
                    "text-left px-4 py-3 rounded-lg text-sm tracking-widest uppercase transition-all",
                    active === item
                      ? "text-[#3D6B8C] bg-[#3D6B8C]/10"
                      : "text-gray-400 hover:bg-white/5"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
