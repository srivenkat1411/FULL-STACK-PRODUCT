import React, { createContext, useContext, useState } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(token);

  const login = async (username, password) => {
    const res = await authService.login(username, password);
    if (res.success) {
      const storedToken = res.token || localStorage.getItem("token");
      setToken(storedToken);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    }
    return res;
  };

  const signUp = async (username, password, email) => {
    const res = await authService.signUp(username, password, email);
    if (res.success) {
      const storedToken = res.token || localStorage.getItem("token");
      setToken(storedToken);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    }
    return res;
  };

  const logout = async () => {
    try {
      await authService.logOut();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
