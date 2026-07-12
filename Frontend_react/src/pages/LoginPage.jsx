import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="auth-shell">
      <div className="auth-shell-topbar">
        <Link to="/" className="auth-shell-home-link">← Back to dashboard</Link>
      </div>
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;