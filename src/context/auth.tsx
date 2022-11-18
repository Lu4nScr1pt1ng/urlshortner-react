import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import BackEnd from '../services/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextI {
  token: string | null;
  username: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  verifyToken: () => void;
}

const authContextDefaults: AuthContextI = {
  token: null,
  username: null,
  login: () => null,
  logout: () => null,
  verifyToken: () => null,
};

export const AuthContext = createContext<AuthContextI>(authContextDefaults);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    const userToken = localStorage.getItem('user');
    if(userToken){
        return userToken;
    }
    return null
  });


  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = () => {
    if(token){
        axios.get( BackEnd + "/v1/user/verify", {headers: { Authorization: `Bearer ${token}` }}).then((res) => {
            setUsername(res.data.name);
        }).catch(() => {
            localStorage.removeItem("user");
            setUsername(null);
            setToken(null);
        })
    }
  }

  const login = async (email: string, password: string) => {
     await axios
      .post(
         BackEnd + '/v1/user/login',
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log("autenticado");
        localStorage.setItem("user", res.data.token);
        setToken(res.data.token);
        setUsername(res.data.user.name);
      });
    //   .catch((e) => {
    //     setToken(null);
    //     setUsername(null);
    //     console.log('ocorreu um erro ao efetuar o login' + e);
    //     localStorage.removeItem("user");
    //   });
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  return <AuthContext.Provider value={{ token, username, login, logout, verifyToken }}>{children}</AuthContext.Provider>;
};
