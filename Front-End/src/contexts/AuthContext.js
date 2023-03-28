import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context object that will hold the authentication state and functions.
const AuthContext = createContext();

// Create a component that will wrap the application and provide authentication functionality to its children.
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userVersion, setUserVersion] = useState(0);

  // On mount, check if there is a logged in user in local storage and update state if there is.
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(loggedInUser));
      
    }
  }, [userVersion]);

  // Define functions to handle user login and logout.
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

  // Return the provider component with the authentication state and functions passed as a value prop to the context object.
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout, userVersion }} 
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the authentication context in any child component.
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };