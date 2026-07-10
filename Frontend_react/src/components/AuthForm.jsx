import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";

const AuthForm = ({ mode }) => {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => ({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: true,
    acceptTerms: false,
  }));

  const title = useMemo(() => (isSignup ? "Create your account" : "Welcome back"), [isSignup]);
  const subtitle = useMemo(
    () =>
      isSignup
        ? "Set up your workspace and start managing products in seconds."
        : "Sign in to access your dashboard, products, and inventory tools.",
    [isSignup]
  );

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSubmitted(false);

    if (!formData.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isSignup && !formData.acceptTerms) {
      setError("Please accept the terms to continue.");
      return;
    }

    const submitAuth = async () => {
      setLoading(true);

      const result = isSignup
        ? await authService.signUp(formData.username.trim(), formData.password, formData.email.trim())
        : await authService.login(formData.username.trim(), formData.password);

      if (result.success) {
        setSubmitted(true);
        setError("");
        setFormData((current) => ({
          ...current,
          password: "",
          confirmPassword: "",
        }));
      } else {
        setError(result.message || (isSignup ? "Signup failed. Please try again." : "Login failed. Please try again."));
      }

      setLoading(false);
    };

    submitAuth();
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <span className="auth-orb auth-orb-one" />
        <span className="auth-orb auth-orb-two" />
      </div>

      <section className="auth-hero glass-card">
        <div className="auth-brand-pill">
          <span>Product Hub</span>
          <span className="auth-brand-dot" />
          <span>Inventory Control</span>
        </div>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="auth-stats">
          <div>
            <strong>01</strong>
            <span>Fast onboarding</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Dashboard access</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Frontend ready</span>
          </div>
        </div>

        <div className="auth-points">
          <div className="auth-point">
            <span className="auth-point-icon">🔒</span>
            <div>
              <strong>Secure access</strong>
              <p>Clean form flow with validation-friendly structure.</p>
            </div>
          </div>
          <div className="auth-point">
            <span className="auth-point-icon">⚡</span>
            <div>
              <strong>Quick setup</strong>
              <p>Switch between login and signup without leaving the app.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-panel glass-card">
        <div className="auth-panel-header">
          <div>
            <span className="auth-eyebrow">{isSignup ? "New here?" : "Existing user?"}</span>
            <h2>{isSignup ? "Sign up" : "Log in"}</h2>
          </div>
          <Link to={isSignup ? "/login" : "/signup"} className="auth-switch-link">
            {isSignup ? "Use login" : "Create account"}
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-username-input">Username</label>
              <input
                id="auth-username-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Choose a username"
                required
              />
            </div>
          )}

          {!isSignup && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-username-input">Username</label>
              <input
                id="auth-username-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          {/* <div className="form-group">
            <label className="form-label" htmlFor="auth-email-input">Email Address</label>
            <input
              id="auth-email-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="name@example.com"
              required
            />
          </div> */}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password-input">Password</label>
            <div className="password-input-wrap">
              <input
                id="auth-password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {isSignup && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-confirm-password-input">Confirm Password</label>
              <input
                id="auth-confirm-password-input"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Repeat your password"
                required
              />
            </div>
          )}

          <div className="auth-meta-row">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>{isSignup ? "Receive product updates" : "Remember me"}</span>
            </label>

            {!isSignup && (
              <Link to="/" className="auth-inline-link">Forgot password?</Link>
            )}
          </div>

          {isSignup && (
            <label className="auth-checkbox auth-terms">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <span>I agree to the terms and privacy policy.</span>
            </label>
          )}

          {error && (
            <div className="status-error auth-status">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {submitted && (
            <div className="status-success auth-status">
              <span>✅</span>
              <span>
                {isSignup
                  ? "Account details captured. Connect this form to your backend when ready."
                  : "Login details captured. Connect this form to your backend when ready."}
              </span>
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-social-grid">
          <button type="button" className="btn btn-secondary auth-social-btn">
            <span>G</span>
            <span>Google</span>
          </button>
          <button type="button" className="btn btn-secondary auth-social-btn">
            <span>f</span>
            <span>Facebook</span>
          </button>
        </div>

        <p className="auth-footer-text">
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"} className="auth-inline-link">
            {isSignup ? "Log in instead" : "Sign up now"}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default AuthForm;