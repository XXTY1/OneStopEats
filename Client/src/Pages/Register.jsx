// Import necessary hooks and components
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Header from "../Components/Header.jsx";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

// RegisterPage component
export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  // Redirect if user is already logged in
  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  // Form handling with react-hook-form
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const submit = async (data) => {
    await auth.register(data);

  };

  // JSX for the form
  return (
    <>
      <div className="flex h-[90vh] flex-col lg:flex-row">
        <div className="mt-4 flex items-center justify-center  rounded-xl lg:w-1/2 lg:p-8">
          <h3 className="rounded-2xl bg-blue-600 p-2 text-5xl font-extrabold tracking-tight text-teal-500 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] lg:text-white">
            Register
          </h3>
        </div>

        <div className=" m-4 flex h-[85vh] items-center justify-center rounded-2xl bg-slate-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:w-1/2">
          <div className="w-11/12 ">
            <form
              onSubmit={handleSubmit(submit)}
              noValidate
              className="mt-2 space-y-4"
            >
              <Input
                type="text"
                label="Name"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none  focus:ring-indigo-500 sm:text-sm"
                {...register("name", {
                  required: true,
                  minLength: 5,
                })}
                error={errors.name}
              />

              <Input
                type="email"
                label="Email"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("email", {
                  required: true,
                  pattern: /^[^@]+@[^@]+\.[^@]+$/,
                })}
                error={errors.email}
              />

              <Input
                type="password"
                label="Password"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
                error={errors.password}
              />

              <Input
                type="password"
                label="Confirm Password"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value !== getValues("password")
                      ? "Passwords Do Not Match"
                      : true,
                })}
                error={errors.confirmPassword}
              />

              <Input
                type="text"
                label="Address"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("address", {
                  required: true,
                  minLength: 10,
                })}
                error={errors.address}
              />

              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                text="Register"
              />

              <div className="text-center text-sm">
                Already a user?
                <Link
                  to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
