import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || null);
  const apiKey = '3015b6bd-992e-486b-9c2b-d2e34ebb70c9';  

  const login = (token) => {
    setJwt(token);
    localStorage.setItem('jwt', token);  
  };

  const logout = () => {
    setJwt(null);
    localStorage.removeItem('jwt');
  };

  return (
    <AuthContext.Provider value={{ jwt, apiKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};