import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>✨</span>
          <span>Product Management Made Simple</span>
        </div>

        <h1 className="hero-title">
          Manage Your <span className="gradient-text">Product Catalog</span> with Ease
        </h1>

        <p className="hero-description">
          A streamlined dashboard to organize your inventory, track quantities,
          and keep your product catalog always up to date.
        </p>

        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            <span>📦</span>
            View All Products
          </Link>
          <Link to="/add" className="btn btn-secondary">
            <span>➕</span>
            Add New Product
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="glass-card feature-card">
          <span className="feature-icon">📦</span>
          <h3>Inventory Overview</h3>
          <p>View all products in your catalog at a glance with a beautiful card-based layout.</p>
        </div>

        <div className="glass-card feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Smart Search</h3>
          <p>Quickly find any product by name with instant, real-time search results.</p>
        </div>

        <div className="glass-card feature-card">
          <span className="feature-icon">➕</span>
          <h3>Quick Add</h3>
          <p>Add new products to your catalog in seconds with our streamlined form.</p>
        </div>

        <div className="glass-card feature-card">
          <span className="feature-icon">📊</span>
          <h3>Quantity Tracking</h3>
          <p>Update and monitor product quantities easily to keep your inventory accurate.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
