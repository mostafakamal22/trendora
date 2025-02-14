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
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";

export default function Login() {
  const navigate = useNavigate();

  const [, setToken] = useLocalStorage("token");
  const [, setUser] = useLocalStorage("user");

  const [isLoading, setIsLoading] = useState(false);

  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    isValid,
    values,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin(values: FormikValues) {
    console.log("Login Data:", values);

    setIsFormLoading(true);

    handleToastPromise<LoginResponse>({
      promise: postData<LoginResponse>({
        url: "/auth/signin",
        data: values,
      }),
      onSuccess: (data) => {
        setIsFormLoading(false);

        setToken(data.token);
        setUser(data?.user);

        navigate("/");
      },
      successMsg: "Welcome back!",
      onError: (error) => {
        setIsFormLoading(false);
        console.error(error);
      },
    });
  }

  async function handleForgotPassword() {
    if (!values.email) {
      toast.error(
        "Please enter your email before requesting a password reset."
      );
      return;
    }

    setIsLoading(true);

    handleToastPromise({
      promise: postData({
        url: "/auth/forgotPasswords",
        data: { email: values.email },
      }),
      onSuccess: () => {
        setIsLoading(false);
        navigate("/forgot-password", { state: { email: values.email } });
      },
      successMsg: "Check your email inbox.",
      onError: (error) => {
        setIsLoading(false);
        console.error(error);
      },
    });

    // try {
    //   await postData({
    //     url: "/auth/forgotPasswords",
    //     data: { email: values.email },
    //   });

    //   navigate("/forgot-password", { state: { email: values.email } });
    // } catch (error) {
    //   console.error("Forgot password request failed:", error);
    //   handleError(error);
    // } finally {
    //   setIsLoading(false);
    // }
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
              "form-input",
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
              "form-input",
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
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full"
          disabled={!isValid || isSubmitting || isFormLoading}
        >
          {isSubmitting || isFormLoading ? "Loading..." : "Sign In"}
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
