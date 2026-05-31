import { Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
          <Shield size={12} />
          <span>Secured with cybersecurity passion</span>
        </div>
        <p className="text-gray-600 text-[11px] font-mono flex items-center gap-1">
          Built with <Heart size={10} className="text-[#B1D2C8]" /> by{" "}
          <span className="text-gradient font-bold">Santhosh Gowda</span> &copy;{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
