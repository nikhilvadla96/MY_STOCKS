import React, { useState, useEffect } from 'react';
import apiCall from './CustomHooks/apiCall'; // Import apiCall for token verification
import { Url, Method } from './Constants/ApiConstants'; // Import API constants
import { useNavigate } from 'react-router-dom';

export const MyContext = React.createContext();

export const MyContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/error'); // For React Router v5
    // navigate('/login'); // For React Router v6
  };

  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          // Optionally verify the token by making an API call
          const response = await apiCall({
            url: Url.verifyToken, // Add a URL endpoint for token verification
            method: Method.GET,
            token: savedToken
          });

          console.log(response);
          
          if (response && response.data.valid) {
            setToken(savedToken);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('token');
          }
        } catch (error) {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      }
    };

    verifyToken();
  }, []);

  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken ,handleRedirect }}>
      {children}
    </MyContext.Provider>
  );
};
