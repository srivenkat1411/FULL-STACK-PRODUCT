import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = ({
  code = "404",
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist, was removed, or might be temporarily unavailable.",
  showActions = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-glow not-found-glow-1" />
      <div className="not-found-glow not-found-glow-2" />

      <div className="not-found-card glass-card">
        <div className="not-found-badge">
          <span className="not-found-badge-dot" />
          <span>Error {code}</span>
        </div>

        <div className="not-found-code-wrapper">
          <h1 className="not-found-code">{code}</h1>
          <div className="not-found-code-shadow">{code}</div>
        </div>

        <div className="not-found-content">
          <h2 className="not-found-title">{title}</h2>
          <p className="not-found-message">{message}</p>
        </div>

        {showActions && (
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary not-found-btn">
              <span>🏠</span>
              <span>Back to Dashboard</span>
            </Link>

            <Link to="/products" className="btn btn-secondary not-found-btn">
              <span>📦</span>
              <span>Browse Products</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary not-found-btn not-found-btn-back"
            >
              <span>←</span>
              <span>Go Back</span>
            </button>
          </div>
        )}

        <div className="not-found-footer-hint">
          <span>Need help? Check that the URL is spelled correctly or explore other tabs in the sidebar.</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
