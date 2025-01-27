import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [hideSignup, setHideSignup] = useState(false);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
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
