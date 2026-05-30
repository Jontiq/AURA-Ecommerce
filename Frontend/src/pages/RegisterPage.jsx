import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api";
import "../styles/AuthPages.css";


function RegisterPage() {
  const navigate = useNavigate();
  const { authed, login } = useAuth();

  useEffect(() => {
    if (authed) {
      navigate("/account");
    }
  }, [authed]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = true;
    if (!form.lastName.trim()) newErrors.lastName = true;
    if (!form.username.trim()) newErrors.username = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.password.trim()) newErrors.password = true;
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = true;
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      // Skickar allt utom confirmPassword till backend
      const { confirmPassword, ...formData } = form;
      const data = await registerUser(formData);

      // Loggar in direkt efter registrering
      login(data);
      navigate("/account");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Create Account</h1>
        <p className="auth__subtitle">
          Join us to view your orders and save your favourite perfumes
        </p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__row">
            <div className="auth__field">
              <label className="auth__label">First Name</label>
              <input
                className={`auth__input ${errors.firstName ? "auth__input--error" : ""}`}
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="auth__field">
              <label className="auth__label">Last Name</label>
              <input
                className={`auth__input ${errors.lastName ? "auth__input--error" : ""}`}
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Nytt fält – username */}
          <div className="auth__field">
            <label className="auth__label">Username</label>
            <input
              className={`auth__input ${errors.username ? "auth__input--error" : ""}`}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

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

          <div className="auth__field">
            <label className="auth__label">Confirm Password</label>
            <input
              className={`auth__input ${errors.confirmPassword ? "auth__input--error" : ""}`}
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {serverError && <p className="auth__error">{serverError}</p>}

          <button type="submit" className="auth__btn" disabled={loading}>
            {loading ? "Creating account and logging in..." : "Create Account & Log in"}
          </button>
        </form>

        <p className="auth__switch">
          Already have an account?{" "}
          <Link to="/login" className="auth__switch-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
