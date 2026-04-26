import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    console.log("LOGIN:", email, password);

    if (!email || !password) {
      throw new Error("Enter credentials");
    }

    const fakeUser = { email };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);

    return true;
  };

  const register = async (email, password) => {
    console.log("REGISTER:", email, password);

    if (!email || !password) {
      throw new Error("Enter credentials");
    }

    const newUser = { email };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);