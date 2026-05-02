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
    <select value={value} onChange={(e) => onChange(e.target.value as T)}>
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
