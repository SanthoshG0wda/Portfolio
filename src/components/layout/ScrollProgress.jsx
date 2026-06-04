import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-[#3D6B8C] via-[#7A8A94] to-[#B1D2C8] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
