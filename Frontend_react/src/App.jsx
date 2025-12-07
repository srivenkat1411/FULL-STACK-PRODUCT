import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import AddProductPage from "./pages/AddProductPage";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-white text-xl font-bold">ShopHub</span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/products")
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-700"
              }`}
            >
              Products
            </Link>
            <Link
              to="/add"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/add")
                  ? "bg-white text-indigo-600"
                  : "text-white hover:bg-indigo-700"
              }`}
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleProductAdded = () => {
    setUpdate(!update); // trigger re-fetch in AllProducts
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts key={update} />} />
            <Route
              path="/add"
              element={<AddProductPage onProductAdded={handleProductAdded} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
