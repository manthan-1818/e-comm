import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["refresh-token"] = refreshToken;
    }

    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("Response Interceptor:", response);

    if (response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
    }
    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response && error.response.status === 419) {
      // Handle 419 error by refreshing the token
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const refreshResponse = await axios.get(
          `${process.env.REACT_APP_BASEURL}/refresh/refreshtoken`,
          {
            headers: { "refresh-token": refreshToken },
          }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        console.log("new token", newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);

        if (
          refreshError.response.status === 401 &&
          refreshError.response.data.message === "Refresh token has expired"
        ) {
        //   store.dispatch(logout());
        }
        return Promise.reject(error);
      }
    }
    const errorMessage = error.response.data.message;
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;