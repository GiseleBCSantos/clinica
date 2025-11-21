import { ReactNode, CSSProperties } from "react";
import { useParallax } from "../../../hooks/useParallax";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: ParallaxSectionProps) {
  const offset = useParallax(speed);

  const style: CSSProperties = {
    transform: `translateY(${offset}px)`,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
