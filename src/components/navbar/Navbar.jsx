import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">MyLogo</h1>
        </Link>
      </div>
      <div className="button-container">
        <Link to="/signup" className="nav-button">
          Sign Up
        </Link>
        <Link to="/login" className="nav-button">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;