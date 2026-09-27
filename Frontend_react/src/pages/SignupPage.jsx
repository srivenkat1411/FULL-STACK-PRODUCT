import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate("/");
  };

  return (
    <div className="auth-shell">
      <div className="auth-shell-topbar">
        <Link to="/login" className="auth-shell-home-link">← Already have an account? Log in</Link>
      </div>
      <AuthForm mode="signup" onSuccess={handleSignupSuccess} />
    </div>
  );
};

export default SignupPage;