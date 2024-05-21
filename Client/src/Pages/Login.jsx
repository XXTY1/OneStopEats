import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Input from "../Components/Input";
import Button from "../Components/Button";
// import { EMAIL } from "../../constants/patterns";
export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const submit = async ({ email, password }) => {
    const res = await login(email, password);
    console.log(res);
    
  };

  return (
    <>
      <div className="flex h-[90vh] flex-col lg:flex-row">
        <div className="mt-4 flex items-center justify-center  rounded-xl lg:w-1/2 lg:p-8">
          <h3 className="rounded-2xl bg-blue-600 p-2 text-5xl font-extrabold tracking-tight text-white  shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
            Login
          </h3>
        </div>
        <div className=" m-4 flex h-screen items-center justify-center rounded-2xl bg-slate-100 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] lg:w-1/2">
          <div className="w-11/12">
            <form
              onSubmit={handleSubmit(submit)}
              noValidate
              className="mt-2 space-y-4"
            >
              <Input
                type="email"
                label="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[^@]+@[^@]+\.[^@]+$/,
                })}
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none  focus:ring-indigo-500 sm:text-sm"
                error={errors.email}
              />

              <Input
                type="password"
                label="Password"
                {...register("password", {
                  required: true,
                })}
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none  focus:ring-indigo-500 sm:text-sm"
                error={errors.password}
              />

              <Button type="submit" text="Login" />

              <div className="register">
                New user? &nbsp;
                <Link
                  to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`}
                >
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
