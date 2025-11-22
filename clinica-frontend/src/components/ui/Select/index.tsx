import type { ChangeEvent, FocusEvent } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
}

export const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
}: SelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
