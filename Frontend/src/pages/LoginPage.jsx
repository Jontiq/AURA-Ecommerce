import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api";
import "../styles/AuthPages.css";

function LoginPage() {
  const navigate = useNavigate();
  const { authed, login } = useAuth();

  useEffect(() => {
    if (authed) {
      navigate("/account");
    }
  }, [authed]);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); //Fel från backend, t.ex. "Invalid credentials"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = true; // nu username istället för email efter ändringen i backend
    if (!form.password.trim()) newErrors.password = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      //Anropar backend via api.js
      const data = await loginUser(form.username, form.password);

      //Sparar token + sätter authed: true via contexten
      login(data);

      //Skickar användaren till startsidan
      navigate("/account");
    } catch (err) {
      // Backend svarade med ett fel, t.ex. fel lösenord
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Welcome back</h1>
        <p className="auth__subtitle">
          Sign in to your account to view your placed orders and save your favorite perfumes
        </p>

        <form className="auth__form" onSubmit={handleSubmit}>
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
            <label className="auth__label">Password</label>
            <input
              className={`auth__input ${errors.password ? "auth__input--error" : ""}`}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Visar felmeddelande från backend om inloggning misslyckas */}
          {serverError && <p className="auth__error">{serverError}</p>}

          <button type="submit" className="auth__btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth__switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth__link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
