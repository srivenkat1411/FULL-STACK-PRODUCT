import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return (
    <div className="auth-shell">
      <div className="auth-shell-topbar">
        <Link to="/signup" className="auth-shell-home-link">Need an account? Sign up →</Link>
      </div>
      <AuthForm mode="login" onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;