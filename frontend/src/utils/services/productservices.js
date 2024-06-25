// services/productservices.js

import axiosInstance from "../services/axios";

export const fetchProduct = async (id) => {
  const response = await axiosInstance.get(`/product/fetch-product/${id}`);
  return response.data;
};

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/product/get-products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategoryProducts = async () => {
  const response = await axiosInstance.get(`/product/fetch-category-product`);
  return response.data;
};

export const fetchProductBrand = async (brandName) => {
  const response = await axiosInstance.get(`/product/fetch-brand-product?brandName=${brandName}`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(
      `/product/fetch-product-by-category`,
      {
        params: { category },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};
export const addProduct = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/product/add-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      "/product/update-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(
      `/product/delete-product?id=${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const search = async (query) => {
  try {
    const response = await axiosInstance.post(`/product/search`, { query });
    console.log("jfhlhjfsfsf", response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};