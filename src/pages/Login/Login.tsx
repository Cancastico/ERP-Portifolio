import React, { FormEvent, useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#e9ffff]">
      <div className="w-4/5 md:w-1/3 xl:w-1/4 flex-col flex gap-3 p-4 rounded-xl shadow-md shadow-[#494949] bg-[#62a798]">
        <h3 className="text-center text-[#fff] text-xl font-bold 4">Login</h3>
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <Button
            className="text-center text-[#62a798] bg-[#e4e4e4] hover:bg-[#afafaf] text-medium font-bold 4"
            type="submit"
          >
            Entrar
          </Button>
        </form>
        <p className="text-center text-[#fff]">
          Já tem uma conta?{" "}
          <a className="underline hover:text-[#c2c2c2]" href="/Register">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
