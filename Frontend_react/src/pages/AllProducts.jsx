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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="flex gap-3">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div>
        {products.length === 0 && !loading ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-4 text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id || p._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {p.name}
                      </h3>
                      {p.price && (
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-green-600">
                            ${p.price}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock</span>
                      <span className={`text-lg font-semibold ${
                        (p.quantity || 0) > 10 ? "text-green-600" :
                        (p.quantity || 0) > 0 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {p.quantity || 0} units
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openQuantityDialog(p)}
                    disabled={updatingProduct === p.name}
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {updatingProduct === p.name
                      ? "Updating..."
                      : "Update Quantity"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quantity Update Dialog */}
      {showDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Update Quantity
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Product</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedProduct.name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Quantity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedProduct.quantity || 0} units
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeDialog}
                className="flex-1 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleQuantityUpdate}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
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
