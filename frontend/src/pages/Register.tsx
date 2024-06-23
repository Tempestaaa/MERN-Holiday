import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { UserDataRegister, UserRegister } from "../types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(UserDataRegister),
  });
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = (data: UserRegister) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <h1 className="text-3xl font-bold">Create An Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First name"
          autoComplete="given-name"
          {...register("firstName")}
          error={errors.firstName}
        />
        <Input
          label="Last name"
          autoComplete="family-name"
          {...register("lastName")}
          error={errors.lastName}
        />
      </div>
      <Input
        label="Email"
        autoComplete="email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        autoComplete="new-password"
        {...register("password")}
        error={errors.password}
      />
      <Input
        type="password"
        label="Confirm password"
        autoComplete="new-password"
        {...register("confirm")}
        error={errors.confirm}
      />
      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-800 text-white py-3 px-6 rounded-xl hover:opacity-80 duration-300 font-bold md:self-start"
        >
          Create Account
        </button>

        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
