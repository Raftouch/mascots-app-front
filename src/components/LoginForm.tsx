import { useState } from "react";
import { API_BASE_URL } from "../config/api";
import { useLocation } from "react-router-dom";
import FormInput from "./UI/FormInput";
import FormButton from "./UI/FormButton";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.message || "Login failed");
        return;
      }

      setIsError(false);
      setMessage(data.message);

      console.log("Logged in user:", data.user);

      setForm({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage("Server connection error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

      {successMessage && (
        <p className="mb-4 px-3 py-2 rounded-md text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          {successMessage}
        </p>
      )}

      {message && (
        <p
          className={`mb-4 px-3 py-2 rounded-md text-sm font-medium border ${isError ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}
        >
          {message}
        </p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <FormButton>Login</FormButton>
      </form>
    </div>
  );
}
