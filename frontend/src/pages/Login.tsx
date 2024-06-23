import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserDataLogin, UserLogin } from "../types/user";
import Input from "../components/Input";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(UserDataLogin),
  });
  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "User logged in", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = (data: UserLogin) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <h1 className="text-3xl font-bold">Login</h1>
      <Input
        label="Email"
        autoComplete="email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        autoComplete="current-password"
        {...register("password")}
        error={errors.password}
      />

      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-800 text-white py-3 px-6 rounded-xl hover:opacity-80 duration-300 font-bold md:self-start"
        >
          Login
        </button>

        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
