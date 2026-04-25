import React, { createContext, useContext } from "react";

const AuthContext = createContext();
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const login = async (email, password) => {
    if (email && password) {
      return true;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

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