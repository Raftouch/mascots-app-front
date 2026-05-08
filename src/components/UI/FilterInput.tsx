import type { ChangeEvent } from "react";

interface FilterInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterInput({
  label,
  type,
  value,
  onChange,
}: FilterInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
