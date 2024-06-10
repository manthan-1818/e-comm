import React, { useState, useEffect } from "react";
import "../css/Signup.css";
import axiosInstance from "../utils/services/axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = async () => {
    try {
      const formData = {
        name: name,
        email: email,
        role: "User",
        password: password,
      };
      const response = await axiosInstance.post("/submit/signup", formData);

      if (response.status === 200) {
        console.log("Signup successful");
        setVerificationSent(true);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    document.body.classList.add("signup-page");
    return () => {
      document.body.classList.remove("signup-page");
    };
  }, []);

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      {verificationSent && <p>Verification sent! Please check your email.</p>}

      <p class="mt-2">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
