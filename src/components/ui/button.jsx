import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D6B8C] disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-gradient-to-r from-[#3D6B8C] to-[#7A8A94] text-white hover-lift glow-cyan":
            variant === "primary",
          "border border-[#3D6B8C]/40 text-[#3D6B8C] hover:bg-[#3D6B8C]/10 hover:border-[#3D6B8C]":
            variant === "outline",
          "text-gray-400 hover:text-white hover:bg-white/5": variant === "ghost",
          "border border-white/10 text-white/80 hover:bg-white/5 hover:border-white/20":
            variant === "secondary",
        },
        {
          "px-5 py-2 text-xs": size === "sm",
          "px-7 py-3 text-sm": size === "md",
          "px-8 py-3.5 text-base": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
});

export { Button };
