import React, { FormEvent, useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleLogin = (_event: FormEvent<HTMLFormElement>) => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log(
      `Username: ${username}, Lastname: ${lastname}, Email: ${email}, Password: ${password}, Password Confirm: ${passwordConfirm}`,
    );
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#e9ffff]">
      <div className="w-4/5 md:w-1/3 xl:w-1/4 flex-col flex gap-3 p-4 rounded-xl shadow-md shadow-[#494949] bg-[#62a798]">
        <h3 className="text-center text-[#fff] text-xl font-bold 4">
          Cadastro
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <div className="flex flex-col gap-3 md:flex-row md:gap-3 md:justify-between md:items-center md:w-full md:mx-auto md:text-center md:text-[#62a798] md:font-bold md:font-medium md:4">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nome"
            />
            <Input
              value={username}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Sobrenome"
            />
          </div>

          <Input
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <Input
            value={password}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirme a senha"
          />
          <Button
            className="text-center text-[#62a798] bg-[#e4e4e4] hover:bg-[#afafaf] text-medium font-bold 4"
            type="submit"
          >
            Cadastrar-se
          </Button>
        </form>
        <p className="text-center text-[#fff]">
          Já tem uma conta?{" "}
          <a className="underline hover:text-[#c2c2c2]" href="/">
            Entre
          </a>
        </p>
      </div>
    </div>
  );
}
