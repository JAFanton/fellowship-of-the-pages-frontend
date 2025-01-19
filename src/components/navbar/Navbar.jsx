import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [hideSignup, setHideSignup] = useState(false);

  useEffect(() => {
    // Check if two users already exist
    const checkUserCount = async () => {
      try {
        const response = await axios.get("/api/auth/user-count");
        setHideSignup(response.data.userCount >= 2);
      } catch (err) {
        console.error("Error checking user count:", err);
      }
    };

    checkUserCount();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
      <Link to="/" className="navbar-title">
    Fellowship of the Pages
  </Link>
      </div>
      <div className="button-container">
        <Link to="/about" className="nav-button">
          Rules
        </Link>
        <Link to="/login" className="nav-button">
          Log In
        </Link>
        {!hideSignup && (
          <Link to="/signup" className="nav-button">
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
