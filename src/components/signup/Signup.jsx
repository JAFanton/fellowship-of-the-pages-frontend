import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    axiosInstance
      .post("/auth/signup", formData)
      .then((response) => {
        setSuccess(true);
        setFormData({ name: "", email: "", password: "" }); // Clear form on success
        console.log("User created:", response.data);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred during signup.";
        setError(errorMessage);
      });
  };

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <button
          className="signup-close-button"
          onClick={() => navigate("/")}
          aria-label="Close Signup Modal"
        >
          &times;
        </button>
        <h2>Sign Up</h2>
        {error && <p className="signup-error">{error}</p>}
        {success && (
          <p className="signup-success">Signup successful! Please log in.</p>
        )}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;