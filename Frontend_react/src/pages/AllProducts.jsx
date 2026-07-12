import React, { useEffect, useState } from "react";
import productService from "../services/productService";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingProduct, setUpdatingProduct] = useState(null);

  // Dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  const fetchProducts = async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.searchProducts(search);
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const openQuantityDialog = (product) => {
    setSelectedProduct(product);
    setNewQuantity(product.quantity || 0);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedProduct(null);
    setNewQuantity("");
  };

  const handleQuantityUpdate = async () => {
    if (!selectedProduct || newQuantity === "" || newQuantity < 0) {
      alert("Please enter a valid quantity (0 or greater)");
      return;
    }

    setUpdatingProduct(selectedProduct.name);
    setError(null);

    try {
      await productService.updateProductQuantity(
        selectedProduct,
        parseInt(newQuantity)
      );

      // Update local state (match by id/_id or name fallback)
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ||
          p._id === selectedProduct._id ||
          p.name === selectedProduct.name
            ? { ...p, quantity: parseInt(newQuantity) }
            : p
        )
      );

      closeDialog();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(`Failed to update quantity for ${selectedProduct.name}`);
    } finally {
      setUpdatingProduct(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    fetchProducts();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h2>All Products</h2>
        <p className="page-subtitle">Browse and manage your product inventory</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="product-search-input"
            type="text"
            placeholder="Search by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-ghost btn-sm"
        >
          Clear
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="products-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card skeleton skeleton-card" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="status-error">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && !loading && !error && (
        <div className="status-empty">
          <span className="empty-icon">📭</span>
          <p>No products found. Try a different search or add a new product.</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id || p._id} className="glass-card product-card">
              <div className="product-card-header">
                <span className="product-name">{p.name}</span>
                {p.price && (
                  <span className="product-price">
                    ${p.price}
                  </span>
                )}
              </div>

              <div className="product-meta">
                <div className="product-quantity">
                  <span>📦</span>
                  <span>Qty:</span>
                  <span className="qty-value">{p.quantity || 0}</span>
                </div>
              </div>

              <div className="product-card-actions">
                <button
                  id={`update-qty-${p.id || p._id}`}
                  onClick={() => openQuantityDialog(p)}
                  disabled={updatingProduct === p.name}
                  className="btn btn-warning btn-sm"
                  style={{ width: "100%" }}
                >
                  {updatingProduct === p.name ? (
                    <>
                      <span className="spinner"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <span>📊</span>
                      Update Quantity
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Update Dialog */}
      {showDialog && selectedProduct && (
        <div className="modal-overlay" onClick={closeDialog}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Update Quantity</h3>
            <p className="modal-description">
              Adjust the stock level for this product
            </p>

            <div className="modal-info-row">
              <span className="modal-info-label">Product</span>
              <span className="modal-info-value">{selectedProduct.name}</span>
            </div>

            <div className="modal-info-row">
              <span className="modal-info-label">Current Quantity</span>
              <span className="modal-info-value">{selectedProduct.quantity || 0}</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new-quantity-input">
                New Quantity
              </label>
              <input
                id="new-quantity-input"
                type="number"
                min="0"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="form-input"
                autoFocus
              />
            </div>

            <div className="modal-actions">
              <button onClick={closeDialog} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleQuantityUpdate} className="btn btn-success">
                <span>✓</span>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
