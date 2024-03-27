/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// MODELS

// SERVICES
import { AxiosNode } from "../services/axios";
import { user } from "../models/user_model";
import { parseJwt } from "../services/utils";
import { AxiosResponse } from "axios";

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
      const jwt = localStorage.getItem("token");
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
      const user = await AxiosNode.post<user>("/auth/register", {
        name,
        lastname,
        email,
        password,
        passwordconfirm,
      }).catch((error:any) => {
        throw new Error(error.response.data.error);
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
      const axios_response_user = await AxiosNode.post<user>("/auth/login", { email, password });

      setIsAuthenticated(true);
      Authenticated(axios_response_user);
    } catch (error: any) {
      setIsAuthenticated(false);
      return toast.error(error.response.data.error);
    }
  }

  function Authenticated(response: AxiosResponse<user, any>) {
    try {
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        localStorage.setItem("access", token);
        AxiosNode.defaults.headers.common["Authorization"] =
          `${localStorage.getItem("token")}`;

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
