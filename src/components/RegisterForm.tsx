import { useState } from "react";
import { API_BASE_URL } from "../config/api";

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
    } catch (err) {
      console.error(err);
      setMessage("Server connection error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {message && <p>{message}</p>}

      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => (
            <li key={index}>{err.msg}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="password" value={form.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
