// src/services/productService.js
import apiClient from "./apiClient";

const productService = {
  getAllProducts: async () => {
    const response = await apiClient.get("/api/products");
    return response.data;
  },

  addProduct: async (productData) => {
    const response = await apiClient.post("/api/products", productData);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/api/products/id/{id}${id}`);
    return response.data;
  },

 updateProduct: async (name, updatedData) => {
    const response = await apiClient.put(`/products/${name}`, updatedData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService;
