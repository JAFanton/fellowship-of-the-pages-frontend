import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">Fellowship of the Pages</h1>
        </Link>
      </div>
      <div className="button-container">
        <Link to="/about" className="nav-button">
          Rules
        </Link>
        <Link to="/login" className="nav-button">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;