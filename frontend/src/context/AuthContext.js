import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Controlla se il token è presente nel localStorage quando l'app viene caricata
    const token = localStorage.getItem('token');
    console.log("Token trovato all'avvio:", token);
    setIsAuthenticated(!!token);  // Se il token è presente, imposta isAuthenticated su true
  }, []);

  const login = (token) => {
    // Salva il token nel localStorage e aggiorna lo stato di autenticazione
    localStorage.setItem('token', token);
    setIsAuthenticated(true);  // Aggiorna lo stato immediatamente
    console.log("Login eseguito, token salvato:", token);
  };

  const logout = () => {
    // Rimuovi il token dal localStorage e aggiorna lo stato di autenticazione
    localStorage.removeItem('token');
    setIsAuthenticated(false);  // Aggiorna lo stato immediatamente
    console.log("Logout eseguito, token rimosso");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
