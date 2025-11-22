import { ReactNode } from "react";

interface DataDisplayProps {
  label: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  variant?: "vertical" | "horizontal";
  className?: string;
}

export const DataDisplay = ({
  label,
  value,
  icon,
  variant = "vertical",
  className = "",
}: DataDisplayProps) => {
  if (variant === "horizontal") {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <span className="text-sm text-gray-600 flex items-center gap-2">
          {icon}
          {label}:
        </span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="text-sm text-gray-600 flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p className="text-base font-medium text-gray-900 mt-1">{value}</p>
    </div>
  );
};

export default DataDisplay;
