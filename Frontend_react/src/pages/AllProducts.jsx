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
      <h2>All Products</h2>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by product name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px 12px",
            fontSize: "1em",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: "1em",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: "8px 16px",
            fontSize: "1em",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Products List */}
      <div style={{ marginTop: "20px" }}>
        {products.length === 0 && !loading ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No products found.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {products.map((p) => (
              <li
                key={p.id || p._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "16px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#0a0909ff",
                }}
              >
                <div>
                  <strong style={{ fontSize: "1.1em" }}>{p.name}</strong>
                  {p.price && (
                    <span style={{ color: "#28a745", marginLeft: "10px" }}>
                      {" "}
                      Price = ${p.price}
                    </span>
                  )}
                  <div
                    style={{
                      fontSize: "0.9em",
                      color: "#666",
                      marginTop: "6px",
                    }}
                  >
                    Quantity: <strong>{p.quantity || 0}</strong>
                  </div>
                </div>

                <button
                  onClick={() => openQuantityDialog(p)}
                  disabled={updatingProduct === p.name}
                  style={{
                    padding: "10px 20px",
                    fontSize: "0.95em",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: updatingProduct === p.name ? "wait" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {updatingProduct === p.name
                    ? "Updating..."
                    : "Update Quantity"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quantity Update Dialog */}
      {showDialog && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              minWidth: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Update Quantity</h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Product: <strong>{selectedProduct.name}</strong>
            </p>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Current Quantity: <strong>{selectedProduct.quantity || 0}</strong>
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                New Quantity:
              </label>
              <input
                type="number"
                min="0"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "1em",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
                autoFocus
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closeDialog}
                style={{
                  padding: "10px 20px",
                  fontSize: "1em",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleQuantityUpdate}
                style={{
                  padding: "10px 20px",
                  fontSize: "1em",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
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
