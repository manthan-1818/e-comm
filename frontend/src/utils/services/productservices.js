// services/productservices.js

import axiosInstance from "../services/axios";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/product/get-products');
    console.log("producr", response.data[0].productImage);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axiosInstance.post("/product/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (formData) => {
  try {
    const response = await axiosInstance.patch("/product/update-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/product/delete-product?id=${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
