import { useState, useEffect } from "react";

export function useTypewriter(text, { speed = 30, startDelay = 500 } = {}) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIsComplete(false);
    setStarted(false);
    const startTimeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimeout);
  }, [text, startDelay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      index += 1;
      if (index <= text.length) {
        setDisplayed(text.substring(0, index));
      }
      if (index >= text.length) {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, isComplete };
}
