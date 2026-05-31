import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef(function Textarea({ className, label, error, id, ...props }, ref) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-400">
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={ref}
        className={cn(
          "w-full px-4 py-3 bg-cyber-dark/50 border rounded-lg text-white placeholder:text-gray-600 min-h-[120px] resize-y",
          "focus:outline-none focus:ring-2 focus:ring-[#3D6B8C]/50 focus:border-[#3D6B8C]/50",
          "transition-all duration-200",
          error ? "border-red-500/50" : "border-white/10 hover:border-white/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
});

export { Textarea };
