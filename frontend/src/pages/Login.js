import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginSuccess, loginFailure } from "../redux/slice/authSlice";
import { set_token } from "../utils/services";
import "../css/Login.css";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [verificationSent, setVerificationSent] = useState(false);

  const handleLogin = async (data) => {
    try {
      const response = await axiosInstance.post("/submit/login", data);

      const { success, message, accessToken, refreshToken, user } =
        response.data;
      console.log("Response data:", response.data);
      if (success) {
        set_token(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(loginSuccess({ user, accessToken }));
         console.log("User role:", user.role);
        navigate("/");
      } else {
        console.error("Login failed:", message);
        dispatch(loginFailure(message));
      }
    } catch (error) {
      console.error("Error:", error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              {errors.email && <p className="error">Email is required</p>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
              {errors.password && <p className="error">Password is required</p>}
            </div>
            <div className="btn-group">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
          <p class="mt-2">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
