import React, { createContext, useContext, useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// MODELS

// SERVICES
import { AxiosNode } from "../services/axios";
import { user } from "../models/user_model";
import { parseJwt } from "../services/utils";

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>;
  register: (
    name: string,
    lastname: string,
    email: string,
    password: string,
    passwordconfirm: string,
  ) => Promise<void>;
  user: user | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [_isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<user | undefined>(undefined);

  useEffect(() => {
    if (user === null) {
      const jwt = localStorage.getItem("refresh_token");
      if (jwt) {
        const jwtAlt: user = parseJwt(jwt);
        setUser(jwtAlt);
      }
    }
  }, [user]);

  async function register(
    name: string,
    lastname: string,
    email: string,
    password: string,
    passwordconfirm: string,
  ): Promise<void> {
    try {
      if (password != passwordconfirm) {
        toast.error("As senhas não conferem");
        return;
      }
      const user = await AxiosNode.post<user>("/register", {
        name,
        lastname,
        email,
        password,
        passwordconfirm,
      });

      Authenticated(user);
    } catch (error: any) {
      setIsAuthenticated(false);
      toast.error(String(error.response.data.error));
      console.error("Erro ao registrar usuário", error);
    }
  }

  async function login(email: string, password: string) {
    try {
      const user = await AxiosNode.post<user>("/login", { email, password });

      setIsAuthenticated(true);
      Authenticated(user);
    } catch (error: any) {
      setIsAuthenticated(false);
      return toast.error(error.response.data.error);
    }
  }

  function Authenticated(response: AxiosResponse<user, any>) {
    try {
      if (response.status === 200 || response.status === 201) {
        const refresh_token = response.data.token;

        localStorage.setItem("refresh_token", refresh_token);
        AxiosNode.defaults.headers.common["Authorization"] =
          `${localStorage.getItem("refresh_token")}`;

        setUser(response.data);

        navigate("/dashboard");
        window.location.reload();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        toast.error("Acesso Negado");
        throw new Error("Acesso Negado");
      }
    } catch (err) {
      setIsAuthenticated(false);
      toast.error("Erro ao Autenticar");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("O provedor não foi autenticado");
  }
  return context;
};
