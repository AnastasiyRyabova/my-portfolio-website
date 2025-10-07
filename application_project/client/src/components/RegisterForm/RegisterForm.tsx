
import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "../Loader";

const CreateRegisterSchema = z.object({
  username: z.string().min(5, "Длинна имени должна быть не менее "),
  password: z.string().min(8, "Длинна пароля должна быть не менне 8 символов"),
  email: z.string().email("неправильный формат e-mail"),
});

type CreateRegisterType = z.infer<typeof CreateRegisterSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRegisterType>({
    resolver: zodResolver(CreateRegisterSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: registerUser,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["reqister"] });
      },
    },
    queryClient
  );

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({ username, password, email }) => {
        registerMutation.mutate({ username, password, email });
      })}
    >
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input type="text" {...register("username")} />
      </FormField>

      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="text" {...register("email")} />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      {registerMutation.isPending && (
        <span>
          <Loader />
        </span>
      )}

      {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <Button isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
