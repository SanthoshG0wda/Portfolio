import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Badge = forwardRef(function Badge({ className, variant = "default", ...props }, ref) {
  const styles = {
    default: "bg-[#3D6B8C]/10 text-[#3D6B8C] border-[#3D6B8C]/20",
    success: "bg-[#B1D2C8]/10 text-[#B1D2C8] border-[#B1D2C8]/20",
    warning: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    info: "bg-[#7A8A94]/10 text-[#7A8A94] border-[#7A8A94]/20",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border",
        styles[variant],
        className
      )}
      {...props}
    />
  );
});

export { Badge };
