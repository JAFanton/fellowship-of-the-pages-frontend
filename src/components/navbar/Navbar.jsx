import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [hideSignup, setHideSignup] = useState(false);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserCount = async () => {
      axiosInstance
        .get("/auth/users")
        .then((response) => {
          console.log("Full API response:", response); // Debugging
          console.log("Users array:", response.data); // Debugging
          console.log(
            "User count:",
            Array.isArray(response.data) ? response.data.length : "Not an array"
          ); // Extra check
          setHideSignup(
            Array.isArray(response.data) && response.data.length >= 2
          );
        })
        .catch((err) => console.error("Error checking user count:", err));
    };

    checkUserCount();
  }, [isLoggedIn]); // Re-run when login status changes

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

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
        {isLoggedIn ? (
          <button onClick={handleLogout} className="nav-button logout-button">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="nav-button">
            Log In
          </Link>
        )}
        {!hideSignup && !isLoggedIn && (
          <Link to="/signup" className="nav-button">
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
