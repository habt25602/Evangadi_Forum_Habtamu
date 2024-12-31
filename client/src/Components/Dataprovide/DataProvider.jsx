import React, { createContext, useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Start with null or an initial state
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    setUserData(null);
    navigate("/login");
  };

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("/users/check"); // Use interceptor for authorization
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleLogout(); // Call logout if there's an error
      }
    }
  };

  // Check user status on initial render
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

