/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import { user } from "../models/user_model";
import { toast } from "react-toastify";

interface AuthContextType {
  login: (email: string, password: string) => void;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("O provedor não foi autenticado");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<user|null>(null);
  const [error, setError] = useState(false);

  const login = (email: string, password: string) => {

  };
  const register = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => {
    if(name.length < 3){
      toast.warn("O nome deve conter pelo menos 3 caracteres");
    }
    if(password !== passwordConfirm){
      toast.warn("As senhas não conferem");
    }
    if(password.length < 6){
      toast.warn("A senha deve conter pelo menos 6 caracteres");
    }
    if(email.length < 3){
      toast.warn("O email deve conter pelo menos 3 caracteres");
    }
  };
  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
