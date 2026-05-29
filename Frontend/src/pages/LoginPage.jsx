import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = true;
    if (!form.password.trim()) newErrors.password = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Kopplas till AuthContext och backend senare
    console.log("Login:", form);
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Welcome back</h1>
        <p className="auth__subtitle">
          Sign in to your account to view your placed orders
        </p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__field">
            <label className="auth__label">Email</label>
            <input
              className={`auth__input ${errors.email ? "auth__input--error" : ""}`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth__field">
            <label className="auth__label">Password</label>
            <input
              className={`auth__input ${errors.password ? "auth__input--error" : ""}`}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth__btn">
            Sign in
          </button>
        </form>

        <p className="auth__switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth__switch-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
