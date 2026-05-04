type Option<T> = {
  value: T;
  name: string;
};

interface SelectOptionProps<T> {
  options: Option<T>[];
  defaultValue: string;
  value: T;
  onChange: (value: T) => void;
}

export default function SelectOption<T extends string>({
  options,
  defaultValue,
  value,
  onChange,
}: SelectOptionProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    >
      <option value="" disabled>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
