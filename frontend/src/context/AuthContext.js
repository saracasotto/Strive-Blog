import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log("Token:", token);
    console.log("UserId:", userId);  //CONTROLLO PER LETTURA TOKEN E ID

    setIsAuthenticated(!!token && !!userId);  //AGGIORNO STATO AUTENTICAZIONE
    console.log("isAuthenticated:", !!token && !!userId);  //CONTROLLO AUTENTICAZIONE UTENTE
  };

  useEffect(() => {
    checkAuthStatus();  //VERIFICO STATO
  }, []);

  const login = (token, userId) => {
    //SALVO TOKEN E ID IN LOCALSTORAGE
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    console.log("Login eseguito. Token e UserId salvati.");
    checkAuthStatus();  //AGGIORNO LO STATO DOPO LOGIN
  };

  const logout = () => {
    //RIMUOVO DA LOCALSTORAGE
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    console.log("Logout eseguito. Token e UserId rimossi.");
    checkAuthStatus();  //AGGIORNO STATO DOPO LOGOUT
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
