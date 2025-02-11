import { FormikValues, useFormik } from "formik";
import { loginSchema } from "../../schema/login";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse } from "../../types";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import postData from "../../utils/postData";
import ErrorMsg from "../shared/ErrorMsg";
import toast from "@/lib/sonner";
import handleError from "@/utils/handleError";

export default function Login() {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("token");

  const [isLoading, setIsLoading] = useState(false);

  const { getFieldProps, handleSubmit, errors, touched, isSubmitting, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });

  async function handleLogin(values: FormikValues) {
    console.log("Login Data:", values);

    try {
      const res = await postData<LoginResponse>({
        url: "/auth/signin",
        data: values,
      });

      if (res && res.token) {
        setToken(res.token);
        navigate("/");
      } else {
        toast.error("No response received");
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  async function handleForgotPassword() {
    if (!values.email) {
      toast.error(
        "Please enter your email before requesting a password reset."
      );
      return;
    }

    setIsLoading(true);

    try {
      await postData({
        url: "/auth/forgotPasswords",
        data: { email: values.email },
      });

      navigate("/forgot-password", { state: { email: values.email } });
    } catch (error) {
      console.error("Forgot password request failed:", error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="max-w-2xl w-full mx-auto">
      <h1 className="font-extrabold uppercase">Sign In & Keep Shopping</h1>

      <form onSubmit={handleSubmit} className="space-y-8 mt-10">
        <div className="mb-3">
          <input
            type="email"
            id="email"
            placeholder="Email"
            aria-label="email"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm bg-custom-fadeOrange focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.email && touched.email
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("email")}
          />
          {errors.email && touched.email && <ErrorMsg message={errors.email} />}
        </div>

        <div className="mb-3">
          <input
            type="password"
            id="password"
            placeholder="Password"
            aria-label="password"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm bg-custom-fadeOrange focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.password && touched.password
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("password")}
          />
          {errors.password && touched.password && (
            <ErrorMsg message={errors.password} />
          )}
        </div>

        <button
          type="submit"
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-5 text-sm text-left">
          <p className="font-light w-fit">
            Don't have an account yet?{" "}
            <Link
              className="font-bold text-primary-default hover:underline"
              to="/register"
            >
              Sign up
            </Link>
          </p>

          <button
            type="button"
            className="text-blue-500 block text-center font-bold disabled:cursor-not-allowed"
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Forgot Password?"}
          </button>
        </div>
      </form>
    </section>
  );
}
