import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal = ({
  open,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
  }[size];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div
        className={`relative bg-white rounded-lg shadow-xl w-full p-6 md:p-8 z-10 ${sizeClass}`}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              {title}
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </Button>
          </div>
        )}

        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
