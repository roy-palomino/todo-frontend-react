import { FC } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "wouter";

import { login } from "../services/auth.service.ts";
import Button from "../components/Button.tsx";

type Inputs = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [_location, navigate] = useLocation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { access } = await login(data);
    localStorage.setItem("access", access);
    navigate("/");
  };

  return (
    <div className="flex justify-center w-full pt-8 px-2 max-w-4xl mx-auto md:mt-16">
      <div className="flex flex-col w-full border-0 border-[#E5E5E7] rounded-2xl py-12 px-2 shadow-none md:border md:p-28">
        <h1 className="text-center text-black text-5xl font-bold mb-16">
          Login here
        </h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              autoFocus={true}
              type="text"
              id="username"
              {...register("username", { required: true })}
            ></input>
            {errors.username && <div>Este campo es requerido</div>}
          </div>
          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="password"
              id="password"
              {...register("password", { required: true })}
            ></input>
            {errors.password && <div>Este campo es requerido</div>}
          </div>
          <Button type="submit">Login</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/register")}
          >
            I don't have an account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
