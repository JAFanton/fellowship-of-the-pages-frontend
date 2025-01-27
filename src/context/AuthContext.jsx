import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set initial auth state
  }, []);

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true); // Update auth state
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update auth state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logInUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;