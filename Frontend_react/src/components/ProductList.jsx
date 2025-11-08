import React, { useEffect, useState } from "react";
import productService from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingProduct, setUpdatingProduct] = useState(null);

  const fetchProducts = async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      // Try API search-first. `searchProducts` will call getAll when search is falsy.
      const data = await productService.searchProducts(search);
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      // If API fails, keep current products (or clear).
      // Optionally: fallback to client-side filter if we have an initial list.
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityUpdate = async (product, newQuantity) => {
    if (newQuantity < 0) return; // Prevent negative quantities

    setUpdatingProduct(product.name);
    setError(null);

    try {
      // Call API to update quantity with full payload {id,name,quantity}
      await productService.updateProductQuantity(product, newQuantity);

      // Update local state optimistically
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id || p._id === product._id || p.name === product.name
            ? { ...p, quantity: newQuantity }
            : p
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(`Failed to update quantity for ${product.name}`);
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
      <h2>Product List</h2>

      <form onSubmit={handleSearchSubmit} style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear} style={{ marginLeft: 8 }}>
          Clear
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li
            key={p.id || p._id}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{p.name}</strong>
              {p.price && <span>  ${p.price}</span>}
              <div
                style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}
              >
                Quantity: {p.quantity || 0}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => handleQuantityUpdate(p, (p.quantity || 0) - 1)}
                disabled={updatingProduct === p.name || (p.quantity || 0) <= 0}
                style={{
                  padding: "4px 12px",
                  cursor: updatingProduct === p.name ? "wait" : "pointer",
                }}
              >
                −
              </button>
              <span style={{ minWidth: "30px", textAlign: "center" }}>
                {updatingProduct === p.name ? "..." : p.quantity || 0}
              </span>
              <button
                onClick={() => handleQuantityUpdate(p, (p.quantity || 0) + 1)}
                disabled={updatingProduct === p.name}
                style={{
                  padding: "4px 12px",
                  cursor: updatingProduct === p.name ? "wait" : "pointer",
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
