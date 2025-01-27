import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logInUser } = useContext(AuthContext); 

  const handleLogin = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    axiosInstance
      .post("/auth/login", requestBody)
      .then((response) => {
        logInUser(response.data.authToken); 
        navigate("/"); 
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "Invalid email or password.";
        setError(errorDescription);
      });
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
