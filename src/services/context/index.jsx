import React, {createContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { api } from '../api';

export const AuthContext = createContext({});


export const AuthProvider = ({children}) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autenticated, setAutenticated] = useState(false);
  const timeToExpireToken = 3600 * 1000;

  useEffect(() => {

    checkToken();
    
    const recoveredUser = localStorage.getItem('user');
    if(recoveredUser){
      setUser(JSON.parse(recoveredUser));
      setAutenticated(true);
    }
    setLoading(false);
  }, []);

  const checkToken = async () => {

    const lastAcess = localStorage.getItem('lastAcess');

    if(new Date().getTime() - lastAcess >  timeToExpireToken){
      handleLogout();
    }

    
  }

  const handleLogin = async (email, password) => {

    const userAuth = {
      email,
      password
    }

    const {data, status} = await api.post('/login', userAuth);
    const {token} = data;

    if(status === 200){

      setAutenticated(true);
      setUser({email, password});

      localStorage.setItem('user', JSON.stringify(userAuth));
      localStorage.setItem('token', data.token);
      localStorage.setItem('lastAcess', new Date().getTime());
      

      api.defaults.headers.Authorization = `Bearer ${token}`;

      navigate('/')
    }

  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('lastAcess');

    setUser(null);
    setAutenticated(false);

    api.defaults.headers.Authorization = null;

    navigate('/login')
  }

 

  return(
    <AuthContext.Provider value={{autenticated, user, handleLogin, handleLogout, loading, }}>
      {children}
    </AuthContext.Provider>
  )
}