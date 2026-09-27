import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

const AppContent = () => {
  const [update, setUpdate] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleProductAdded = () => {
    setUpdate(!update); // trigger re-fetch in AllProducts
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // If user is not logged in: only login and signup pages are shown; all other routes redirect to /login
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // If user is logged in: full secure dashboard is accessible
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>Product Hub</h1>
          <div className="brand-subtitle">Management Dashboard</div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span className="link-icon">🏠</span>
            <span className="link-label">Home</span>
            <span className="active-indicator"></span>
          </NavLink>

          <NavLink to="/products" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span className="link-icon">📦</span>
            <span className="link-label">All Products</span>
            <span className="active-indicator"></span>
          </NavLink>

          <NavLink to="/add" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span className="link-icon">➕</span>
            <span className="link-label">Add Product</span>
            <span className="active-indicator"></span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          {user?.username ? `Logged in as @${user.username}` : "© 2026 Product Hub"}
        </div>
      </aside>

      <main className="main-content">
        <header className="app-topbar">
          <div className="topbar-status">
            <span className="status-indicator-dot"></span>
            <span className="status-text">
              {user?.username ? `Welcome, ${user.username}` : "Product Hub Live"}
            </span>
          </div>

          <div className="topbar-actions">
            <button
              id="topbar-logout-btn"
              onClick={handleLogout}
              className="btn-logout"
              title="Log out and secure session"
            >
              <span className="btn-logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="main-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts key={update} />} />
            <Route path="/add" element={<AddProductPage onProductAdded={handleProductAdded} />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
