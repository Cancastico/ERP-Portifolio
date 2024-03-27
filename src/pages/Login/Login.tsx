import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const {login} = useAuthContext();
  const loginSchema = z.object({
    email: z.string().min(1,'Digite um Email').email('Digite um Email Válido'),
    senha: z.string().min(8,'Digite uma senha válida'),
  });

  type loginData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin = async (login_data:loginData)=>{
    await login(login_data.email,login_data.senha);
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#35383c]  md:items-start">
      <div className="w-4/5 md:w-1/3 xl:w-1/4 flex-col flex gap-3 p-4 rounded-xl md:h-screen md:rounded-none shadow-md md:justify-center md:gap-5 shadow-[#272727] bg-[#344955]">
        <h3 className="text-center text-[#fff] text-xl font-bold 4">Login</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleLogin)}>
          <Input placeholder="Email" {...register("email")} errorMessage={errors.email ? errors.email.message : ""} />
          <Input type="password" placeholder="Senha" {...register('senha')} errorMessage={errors.senha ? errors.senha.message : ""}/>
          <Button
            className="text-center text-[#35383c] bg-[#e4e4e4] hover:bg-[#afafaf] text-medium font-bold 4"
            type="submit"
          >
            Entrar
          </Button>
        </form>
        <p className="text-center text-[#fff]">
          Já tem uma conta?{" "}
          <Link className="underline hover:text-[#c2c2c2]" to={"/register"}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
