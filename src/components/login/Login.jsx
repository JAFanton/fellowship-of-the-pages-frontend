import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", { email, password });

      // Save the JWT token in localStorage
      localStorage.setItem("authToken", response.data.authToken);

      // Navigate to the homepage after successful login
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Invalid email or password. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button
          className="login-close-button"
          onClick={() => navigate("/")}
          aria-label="Close Login Modal"
        >
          &times;
        </button>
        <h2>Log In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
