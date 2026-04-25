import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = null; // dummy user

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 THIS WAS MISSING
export const useAuth = () => {
  return useContext(AuthContext);
};