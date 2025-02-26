import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="not-found-link">
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;