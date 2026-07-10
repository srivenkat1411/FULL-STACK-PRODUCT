import React, { useState } from "react";
import productService from "../services/productService";

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await productService.addProduct({
        name,
        price: parseFloat(price),
        quantity: quantity ? parseInt(quantity) : 0,
      });
      if (onProductAdded) onProductAdded(response);
      setName("");
      setPrice("");
      setQuantity("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card form-card">
      <div className="page-header">
        <h2>Add New Product</h2>
        <p className="page-subtitle">Fill in the details to add a product to your catalog</p>
      </div>

      {success && (
        <div className="status-success">
          <span>✅</span>
          <span>Product added successfully!</span>
        </div>
      )}

      {error && (
        <div className="status-error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="product-name-input">
            Product Name
          </label>
          <input
            id="product-name-input"
            type="text"
            placeholder="e.g., Wireless Headphones"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="product-price-input">
            Price ($)
          </label>
          <input
            id="product-price-input"
            type="number"
            placeholder="e.g., 29.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="product-quantity-input">
            Initial Quantity
          </label>
          <input
            id="product-quantity-input"
            type="number"
            placeholder="e.g., 100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input"
            min="0"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: "100%", marginTop: "8px" }}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Adding Product...
            </>
          ) : (
            <>
              <span>➕</span>
              Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
