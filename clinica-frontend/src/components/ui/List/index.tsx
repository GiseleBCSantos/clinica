import React, { ReactNode } from "react";

type Variant = "unordered" | "ordered" | "item";

export function List(
  props: {
    variant?: "unordered";
    className?: string;
    children: ReactNode;
  } & React.HTMLAttributes<HTMLUListElement>
): JSX.Element;

export function List(
  props: {
    variant: "ordered";
    className?: string;
    children: ReactNode;
  } & React.HTMLAttributes<HTMLOListElement>
): JSX.Element;

export function List(
  props: {
    variant: "item";
    className?: string;
    children: ReactNode;
  } & React.HTMLAttributes<HTMLLIElement>
): JSX.Element;

export function List({
  variant = "unordered",
  className = "",
  children,
  ...props
}: any) {
  const variants = {
    unordered: "space-y-2",
    ordered: "space-y-2 list-decimal list-inside",
    item: "text-sm text-gray-700",
  };

  if (variant === "ordered") {
    return (
      <ol className={`${variants.ordered} ${className}`} {...props}>
        {children}
      </ol>
    );
  }

  if (variant === "item") {
    return (
      <li className={`${variants.item} ${className}`} {...props}>
        {children}
      </li>
    );
  }

  return (
    <ul className={`${variants.unordered} ${className}`} {...props}>
      {children}
    </ul>
  );
}

export default List;
