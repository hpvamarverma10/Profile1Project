import { useEffect, useRef, RefObject } from "react";

type RevealDirection = "bottom" | "left" | "right";

export function useScrollReveal<T extends HTMLElement>(
  direction: RevealDirection = "bottom",
  delay: number = 0
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkReveal = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight / 1.15) {
        setTimeout(() => {
          element.classList.add("revealed");
        }, delay * 1000);
      } else {
        element.classList.remove("revealed");
      }
    };

    // Check on mount
    checkReveal();

    // Check on scroll
    window.addEventListener("scroll", checkReveal);
    
    return () => {
      window.removeEventListener("scroll", checkReveal);
    };
  }, [delay]);

  return ref;
}
