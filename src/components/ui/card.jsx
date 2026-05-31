import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Card = forwardRef(function Card({ className, ...props }, ref) {
  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass rounded-xl hover-lift glow-cyan transition-all duration-300 group",
        className
      )}
      {...props}
    />
  );
});

const CardHeader = forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-6 pb-0", className)} {...props} />;
});

const CardContent = forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-6", className)} {...props} />;
});

const CardFooter = forwardRef(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});

export { Card, CardHeader, CardContent, CardFooter };
