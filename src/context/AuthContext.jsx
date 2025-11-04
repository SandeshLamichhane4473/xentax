import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Custom hook to use context
export const useAuth = () => useContext(AuthContext);

// 1 hour in milliseconds
const EXPIRATION_TIME = 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load from localStorage if exists
    const saved = localStorage.getItem("userInfo");
    const expiry = localStorage.getItem("userInfoExpiry");

    if (saved && expiry) {
      const now = new Date().getTime();
      if (now < Number(expiry)) {
        return JSON.parse(saved);
      } else {
        // expired
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userInfoExpiry");
        return null;
      }
    }

    return null;
  });

  const login = (userData) => {
    setUser(userData);

    // Save user info in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userData));

    // Set expiration time 1 hour from now
    const expiryTime = new Date().getTime() + EXPIRATION_TIME;
    localStorage.setItem("userInfoExpiry", expiryTime);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfoExpiry");
    localStorage.removeItem("authToken"); // optional JWT
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
