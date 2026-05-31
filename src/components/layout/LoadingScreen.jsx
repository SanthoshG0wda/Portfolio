import { useEffect } from "react";
import { NeuralLoader } from "./NeuralLoader";

export function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return <NeuralLoader onComplete={() => { document.body.style.overflow = ""; }} />;
}
