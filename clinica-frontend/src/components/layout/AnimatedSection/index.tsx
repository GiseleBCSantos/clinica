import { ReactNode, useRef } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  animationType = "fade",
  delay = 0,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(ref, { threshold: 0.1 });

  const animationClasses = {
    fade: isVisible
      ? "opacity-100 transition-opacity duration-1000"
      : "opacity-0",
    "slide-up": isVisible
      ? "opacity-100 translate-y-0 transition-all duration-1000"
      : "opacity-0 translate-y-20",
    "slide-left": isVisible
      ? "opacity-100 translate-x-0 transition-all duration-1000"
      : "opacity-0 translate-x-20",
    "slide-right": isVisible
      ? "opacity-100 translate-x-0 transition-all duration-1000"
      : "opacity-0 -translate-x-20",
    scale: isVisible
      ? "opacity-100 scale-100 transition-all duration-1000"
      : "opacity-0 scale-95",
  };

  return (
    <div
      ref={ref}
      className={`${className} ${animationClasses[animationType]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
