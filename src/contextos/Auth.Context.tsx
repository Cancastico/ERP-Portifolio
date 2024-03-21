/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext } from "react";


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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState<user|null>(null);
  // const [error, setError] = useState(false);

  const login = (email: string, password: string) => {

  };
  const register = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => {

  };
  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
