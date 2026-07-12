import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleProductAdded = () => {
    setUpdate(!update); // trigger re-fetch in AllProducts
  };

  const AppShell = () => {
    const location = useLocation();
    const isAuthRoute = ["/login", "/signup", "/auth"].includes(location.pathname);

    if (isAuthRoute) {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }

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

            <NavLink to="/login" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="link-icon">🔐</span>
              <span className="link-label">Login</span>
              <span className="active-indicator"></span>
            </NavLink>

            <NavLink to="/signup" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <span className="link-icon">✨</span>
              <span className="link-label">Sign Up</span>
              <span className="active-indicator"></span>
            </NavLink>
          </nav>

          <div className="sidebar-footer">© 2026 Product Hub</div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts key={update} />} />
            <Route path="/add" element={<AddProductPage onProductAdded={handleProductAdded} />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    );
  };

  return (
    <Router>
      <AppShell />
    </Router>
  );
};

export default App;
