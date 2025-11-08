import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Product Management System</h2>
      <p style={{ fontSize: "1.1em", color: "#666", marginTop: "20px" }}>
        Manage your products efficiently with our simple and intuitive
        interface.
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Link to="/products">
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1em",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            View All Products
          </button>
        </Link>

        <Link to="/add">
          <button
            style={{
              padding: "12px 24px",
              fontSize: "1em",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add New Product
          </button>
        </Link>
      </div>

      <div
        style={{
          marginTop: "60px",
          textAlign: "left",
          maxWidth: "600px",
          margin: "60px auto",
        }}
      >
        <h3>Features:</h3>
        <ul style={{ fontSize: "1em", lineHeight: "2em" }}>
          <li>📦 View all products in your inventory</li>
          <li>🔍 Search products by name</li>
          <li>➕ Add new products to your catalog</li>
          <li>📊 Update product quantities easily</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
