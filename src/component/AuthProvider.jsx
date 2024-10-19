import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = Cookies.get('x-token');
    console.log('runnning')
    if (token) {
      console.log('if token')
      axios.get(`${url}/getme`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          console.log(response)
          setUser(response.data); 
        })
        .catch(() => {
          Cookies.remove('x-token'); 
        });
    }
  }, [url]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
