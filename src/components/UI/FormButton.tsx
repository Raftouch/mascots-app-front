interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer"
    >
      {children}
    </button>
  );
}
