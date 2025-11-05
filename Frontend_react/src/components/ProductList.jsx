import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  `https://kingston-firewire-feels-floor.trycloudflare.com/api/products/name/${name}`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      if (search) {
        // Treat the search as an ID and call the get-by-id endpoint
        const url = `${API_BASE}/${encodeURIComponent(search)}`;
        const response = await axios.get(url);
        // backend returns a single product object for GET /products/{id}
        setProducts(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      } else {
        const response = await axios.get(API_BASE);
        setProducts(response.data);
      }
    } catch (err) {
      // If product not found, show empty list with a helpful message
      if (err.response && err.response.status === 404) {
        setProducts([]);
        setError("Product not found");
      } else {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(query);
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
          placeholder="Search by id"
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

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
