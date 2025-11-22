import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "header" | "content" | "title";
  className?: string;
}

export const Card = ({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) => {
  const variants = {
    default: "bg-white rounded-lg shadow-sm border border-gray-200",
    header: "px-6 py-4 border-b border-gray-200",
    content: "px-6 py-4",
    title: "text-lg font-semibold text-gray-900",
  };

  const Component = variant === "title" ? "h3" : "div";

  return (
    <Component className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Card;
