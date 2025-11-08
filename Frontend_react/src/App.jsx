import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import AddProductPage from "./pages/AddProductPage";

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleProductAdded = () => {
    setUpdate(!update); // trigger re-fetch in AllProducts
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Product Management</h1>

        {/* Navigation */}
        <nav
          style={{
            marginBottom: "20px",
            borderBottom: "2px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <Link
            to="/"
            style={{
              marginRight: "15px",
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{
              marginRight: "15px",
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            All Products
          </Link>
          <Link to="/add" style={{ textDecoration: "none", color: "#007bff" }}>
            Add Product
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts key={update} />} />
          <Route
            path="/add"
            element={<AddProductPage onProductAdded={handleProductAdded} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
