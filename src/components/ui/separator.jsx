import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Separator = forwardRef(function Separator({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "h-px bg-gradient-to-r from-transparent via-white/10 to-transparent",
        className
      )}
      {...props}
    />
  );
});

export { Separator };
