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
  return localStorage.getItem("isAuthenticated") === 'true';
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


export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get("/submit/fetch-userdata");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; 
  }
};

