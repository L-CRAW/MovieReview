import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userVersion, setUserVersion] = useState(0);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(loggedInUser));
      
    }
  }, [userVersion]);

  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setUserVersion((prevVersion) => prevVersion + 1);
    localStorage.setItem('user', JSON.stringify(user));
    
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserVersion((prevVersion) => prevVersion + 1);
    localStorage.removeItem('user');
    
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout, userVersion }} 
    >
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };