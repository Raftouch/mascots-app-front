type Option = {
  value: string;
  name: string;
};

interface SelectOptionProps {
  options: Option[];
  defaultValue: string;
}

export default function SelectOption({
  options,
  defaultValue,
}: SelectOptionProps) {
  return (
    <select>
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
