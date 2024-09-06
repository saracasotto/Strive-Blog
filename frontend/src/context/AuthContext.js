import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Funzione per verificare l'autenticazione
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log("Token:", token);
    console.log("UserId:", userId);  // Log per verificare se viene correttamente letto

    setIsAuthenticated(!!token && !!userId);  // Aggiorna lo stato di autenticazione
    console.log("isAuthenticated:", !!token && !!userId);  // Verifica se l'utente è autenticato
  };

  useEffect(() => {
    checkAuthStatus();  // Verifica lo stato all'inizio
  }, []);

  const login = (token, userId) => {
    // Salva il token e l'ID dell'utente nel localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    console.log("Login eseguito. Token e UserId salvati.");
    checkAuthStatus();  // Aggiorna lo stato di autenticazione dopo il login
  };

  const logout = () => {
    // Rimuovi il token e l'ID utente dal localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    console.log("Logout eseguito. Token e UserId rimossi.");
    checkAuthStatus();  // Aggiorna lo stato di autenticazione dopo il logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
