import { FC } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "wouter";

import { register as registerService } from "../services/auth.service.ts";
import Button from "../components/Button.tsx";

type Inputs = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
};

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [_location, navigate] = useLocation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await registerService(data);
    navigate("/login");
  };

  return (
    <div className="flex justify-center w-full pt-0 px-2">
      <div className="flex flex-col w-full border-0 border-[#E5E5E7] rounded-2xl py-12 px-2 shadow-none md:border">
        <h1 className="text-center text-black text-5xl font-bold mb-10">
          Register here
        </h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="text-lg font-extralight ml-0.5" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="email"
              id="email"
              {...register("email", { required: true })}
            ></input>
            {errors.username && <div>Este campo es requerido</div>}
          </div>

          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="text"
              id="username"
              {...register("username", { required: true })}
            ></input>
            {errors.username && <div>Este campo es requerido</div>}
          </div>

          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="first_name"
            >
              First name
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="text"
              id="first_name"
              {...register("first_name", { required: false })}
            ></input>
          </div>

          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="first_name"
            >
              Last name
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="text"
              id="last_name"
              {...register("last_name", { required: false })}
            ></input>
          </div>

          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="password1"
            >
              Password
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="password"
              id="password1"
              {...register("password1", { required: true })}
            ></input>
          </div>

          <div>
            <label
              className="text-lg font-extralight ml-0.5"
              htmlFor="password2"
            >
              Repeat password
            </label>
            <input
              className="w-full border border-[#E5E5E7] rounded-lg p-2 mb-4 mt-1"
              type="password"
              id="password2"
              {...register("password2", { required: true })}
            ></input>
          </div>
          <Button type="submit">Register</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
