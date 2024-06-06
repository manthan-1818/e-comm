import axiosInstance from "./axios";

export const get_session_user = () => {
  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    return null;
  }
  try {
    return JSON.parse(userJSON);
  } catch (error) {
    console.error("Error parsing user JSON:", error);
    return null;
  }
};

export const set_session_user = (setValue) => {
  return localStorage.setItem("user", JSON.stringify(setValue));
};

export const remove_session_user = () => {
  return localStorage.removeItem("user");
};

// is login
export const get_is_authenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const set_is_authenticated = (setValue) => {
  return localStorage.setItem("isAuthenticated", setValue);
};

export const remove_is_authenticated = () => {
  return localStorage.removeItem("isAuthenticated");
};

// token
export const get_token = () => {
  return localStorage.getItem("token");
};

export const set_token = (setValue) => {
  return localStorage.setItem("token", setValue);
};

export const remove_token = () => {
  return localStorage.removeItem("token");
};

//user data
export const fetchUserData = async () => {
  const response = await axiosInstance.get("/submit/fetch-userdata");
  return response.data;
};
export const updateUserData = async (id, data) => {
  const response = await axiosInstance.patch(
    `/submit/update-userdata?id=${id}`,
    data
  );
  return response.data;
};
export const deleteUserData = async (id) => {
  const response = await axiosInstance.delete(
    `/submit/delete-userdata?_id=${id}`
  );
  return response.data;
};



//product
export const fetchProductData = async (page) => {
  const response = await axiosInstance.get(
    `/product/fetch-productdata?page=${page}&limit=8`
  );
  return response.data;
};
export const fetchProduct = async (id) => {
  const response = await axiosInstance.get(`/product/fetch-product/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await axiosInstance.get(
    `/product/fetch-productdata-by-category?category=${category}`
  );
  return response.data;
};

export const fetchCategoryProducts = async (category) => {
  const response = await axiosInstance.get(`/product/fetch-category-product`);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(
    `/product/delete-product?id=${productId}`
  );
  return response.data;
};
