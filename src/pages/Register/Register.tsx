import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const registerSchema = z.object({
    name: z.string().min(3, { message: "Nome é obrigatório" }),
    lastname: z.string().min(3, { message: "Sobrenome é obrigatório" }),
    email: z
      .string()
      .min(1, { message: "Email Obrigatorio" })
      .email("Email inválido"),
    password: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    passwordconfirm: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  console.log(errors);
  type RegisterData = z.infer<typeof registerSchema>;

  const handleRegister = (data: RegisterData) => {
    console.log(data);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#e9ffff]">
      <div className="w-4/5 md:w-1/3 xl:w-1/4 flex-col flex gap-3 p-4 rounded-xl shadow-md shadow-[#494949] bg-[#62a798]">
        <h3 className="text-center text-[#fff] text-xl font-bold 4">
          Cadastro
        </h3>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div
            className="flex flex-col gap-3 md:flex-row md:items-center 
            md:w-full md:text-[#62a798] md:font-medium "
          >
            <Input
              errorMessage={errors.name ? errors.name.message : ""}
              placeholder="Nome"
              {...register("name")}
            />

            <Input
              errorMessage={errors.lastname ? errors.lastname.message : ""}
              placeholder="Sobrenome"
              {...register("lastname")}
            />
          </div>

          <Input
            errorMessage={errors.email ? errors.email.message : ""}
            placeholder="Email"
            {...register("email")}
          />

          <Input
            errorMessage={errors.password ? errors.password.message : ""}
            type="password"
            placeholder="Senha"
            {...register("password")}
          />

          <Input
            errorMessage={errors.lastname ? errors.lastname.message : ""}
            type="password"
            placeholder="Confirme a senha"
            {...register("passwordconfirm")}
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
