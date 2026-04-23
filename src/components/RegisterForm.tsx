import { useState } from "react";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import FormInput from "./UI/FormInput";

type ValidationError = {
  msg: string;
};

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setErrors([]);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setMessage(data.message);
        }
        return;
      }

      setMessage(data.message);
      setForm({ name: "", email: "", password: "" });

      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
      navigate("/login", {
        state: { successMessage: "Account created successfully" },
      });
    } catch (err) {
      console.error(err);
      setMessage("Server connection error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

      {message && (
        <p className="mb-4 px-3 py-2 rounded-md text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          {message}
        </p>
      )}

      {errors.length > 0 && (
        <div className="mb-4 px-3 py-2 rounded-md bg-red-50 border border-red-200">
          <ul>
            {errors.map((err, index) => (
              <li key={index} className="text-sm text-red-600 font-medium">
                • {err.msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        <FormInput
          id="email"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
