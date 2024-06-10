import axiosInstance from "../services/axios";

export const getProducts = async () => {
  const response = await axiosInstance.get("/product/get-products");
  return response.data;
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

export const updateProduct = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `/product/update-product`,
      data,
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

export const addProduct = async (data) => {
  try {
    const response = await axiosInstance.post("/product/add-product", data, {
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
