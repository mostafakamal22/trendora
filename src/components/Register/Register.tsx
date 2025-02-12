import { FormikValues, useFormik } from "formik";
import { registerSchema } from "../../schema/register";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../../types";
import { twMerge } from "tailwind-merge";
import postData from "../../utils/postData";
import ErrorMsg from "../shared/ErrorMsg";
import toast from "@/lib/sonner";
import handleError from "@/utils/handleError";

export default function Register() {
  const navigate = useNavigate();

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleRegister,
  });

  async function handleRegister(values: FormikValues) {
    console.log("Register Data:", values);

    try {
      const res = await postData<LoginResponse>({
        url: "/auth/signup",
        data: values,
      });

      if (res && res?.token) {
        navigate("/login");
      } else {
        toast.error("No response received");
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  return (
    <section className="max-w-2xl w-full mx-auto">
      <h1 className="font-extrabold uppercase">Unlock Exclusive Trends</h1>

      <form onSubmit={handleSubmit} className="space-y-8 mt-10">
        <div className="mb-3">
          <input
            type="text"
            id="name"
            placeholder="Name"
            aria-label="name"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.name && touched.name
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("name")}
          />
          {errors.name && touched.name && <ErrorMsg message={errors.name} />}
        </div>

        <div className="mb-3">
          <input
            type="email"
            id="email"
            placeholder="Email"
            aria-label="email"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
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
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
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

        <div className="mb-3">
          <input
            type="password"
            id="repassword"
            placeholder="Confirm Password"
            aria-label="Confrim Password"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.rePassword && touched.rePassword
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("rePassword")}
          />
          {errors.rePassword && touched.rePassword && (
            <ErrorMsg message={errors.rePassword} />
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            id="phone"
            placeholder="Phone Number"
            aria-label="phone number"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.phone && touched.phone
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("phone")}
          />
          {errors.phone && touched.phone && <ErrorMsg message={errors.phone} />}
        </div>

        <button
          type="submit"
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full disabled:opacity-50"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </section>
  );
}
