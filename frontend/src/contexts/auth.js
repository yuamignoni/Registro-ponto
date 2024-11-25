import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const loadStorageData = () => {
      const token = localStorage.getItem("token");

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o JWT para extrair a role
        setUser({ token, role: payload.role });
        setSigned(true);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (credentials) => {
    const response = await api.post("/login", credentials);
    const token = response.data.token;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ token, role: payload.role });
    setSigned(true);
    localStorage.setItem("token", token);
  };

  const signOut = () => {
    setUser(null);
    setSigned(false);
    localStorage.removeItem("token");
  };

  return (
      <AuthContext.Provider value={{ signed, user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;
