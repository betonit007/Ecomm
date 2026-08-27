import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { Link, useNavigate } from "react-router";
import Header from "../../components/Header";
import "./LoginRegisterPage.css";

const initialForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

function LoginRegisterPage() {
  const { login, register, isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const switchMode = () => {
    setIsRegistering((currentMode) => !currentMode);
    setForm(initialForm);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      isRegistering ? await register(form) : await login(form);
      navigate("/");
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "We could not complete your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Header />
      <main className="auth-page">
        <section className="auth-panel">
          <p className="auth-eyebrow">Welcome to the shop</p>
          <h1>{isRegistering ? "Create your account" : "Sign in"}</h1>
          <p className="auth-intro">
            {isRegistering
              ? "Save your details for a faster checkout."
              : "Sign in to view your orders and check out faster."}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="auth-name-fields">
                <label>
                  First name
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                    required
                  />
                </label>
                <label>
                  Last name
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={updateField}
                    required
                  />
                </label>
              </div>
            )}

            {isRegistering && (
              <label>
                Username
                <input
                  name="username"
                  value={form.username}
                  onChange={updateField}
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={updateField}
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
                required
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button
              className="button-primary auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait..."
                : isRegistering
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            {isRegistering ? "Already have an account?" : "New to the shop?"}{" "}
            <button
              className="link-primary auth-switch-button"
              onClick={switchMode}
            >
              {isRegistering ? "Sign in" : "Create an account"}
            </button>
          </p>
          <Link className="auth-home-link" to="/">
            Continue shopping
          </Link>
        </section>
      </main>
    </>
  );
}

export default LoginRegisterPage;
