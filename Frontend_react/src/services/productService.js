// src/services/productService.js
import apiClient from "./apiClient";

const productService = {
  getAllProducts: async () => {
    const response = await apiClient.get("/api/products");
    return response.data;
  },

  // Search products by name. Returns an array (possibly empty).
  // Uses a query param so it's easy to change server endpoint later.
  searchProducts: async (name) => {
    if (!name) return productService.getAllProducts();
    const response = await apiClient.get(
      `/api/products/name/${name}`
    );
    // Expecting either an array or single object
    return Array.isArray(response.data) ? response.data : [response.data];
  },

  addProduct: async (productData) => {
    const response = await apiClient.post("/api/products", productData);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },

  updateProduct: async (name, updatedData) => {
    const response = await apiClient.patch(`/api/products/${name}`, updatedData);
    return response.data;
  },

  // Update product quantity.
  // Backend expects JSON: { id, name, quantity }
  // We'll send PUT to /api/products/:id when id exists, otherwise fall back to name.
  updateProductQuantity: async (product, quantity) => {
    const Name = product?.name ?? "";
    const payload = {
      id: product?.id ?? 0,
      name: product?.name ?? "",
      quantity: quantity,
    };
    const response = await apiClient.patch(
      `/api/products/${Name}/quantity-update`,
      payload
    );
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/api/products/${id}`);
    return response.data;
  },
};

export default productService;
