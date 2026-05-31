import { useState, useEffect, useCallback } from "react";

export function useTypingAnimation({ texts, typeSpeed = 60, deleteSpeed = 30, pauseDuration = 2000 }) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = texts[textIndex];
    if (isDeleting) {
      setDisplayed(current.substring(0, displayed.length - 1));
    } else {
      setDisplayed(current.substring(0, displayed.length + 1));
    }
  }, [texts, textIndex, isDeleting, displayed]);

  useEffect(() => {
    const current = texts[textIndex];

    if (!isDeleting && displayed === current) {
      const timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, textIndex, texts, tick, typeSpeed, deleteSpeed, pauseDuration]);

  return displayed;
}
