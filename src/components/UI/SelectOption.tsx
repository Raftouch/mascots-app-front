type Option = {
  value: string;
  name: string;
};

interface SelectOptionProps {
  options: Option[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SelectOption({
  options,
  defaultValue,
  value,
  onChange,
}: SelectOptionProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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
