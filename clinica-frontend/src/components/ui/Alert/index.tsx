import { ReactNode, HTMLAttributes } from "react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
  icon?: ReactNode;
  title?: string;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  children,
  variant = "info",
  icon,
  title,
  onClose,
  className = "",
  ...props
}: AlertProps) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div
      className={`border rounded-lg p-4 ${variants[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="flex-1">
            {title && <h4 className="font-semibold mb-1">{title}</h4>}
            <div className="text-sm">{children}</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Fechar alerta"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
