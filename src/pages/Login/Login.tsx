import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Login() {



  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#e9ffff]">
      <div className="w-4/5 md:w-1/3 xl:w-1/4 flex-col flex gap-3 p-4 rounded-xl shadow-md shadow-[#494949] bg-[#62a798]">
        <h3 className="text-center text-[#fff] text-xl font-bold 4">Login</h3>
        <form className="flex flex-col gap-3" >
          <Input
            placeholder="Email"
          />
          <Input
          type="password"
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
          <Link className="underline hover:text-[#c2c2c2]" to={'/register'}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
