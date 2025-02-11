import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordSchema } from "../../schema/resetPassword";
import { twMerge } from "tailwind-merge";
import updateData from "../../utils/updateData";
import ErrorMsg from "../shared/ErrorMsg";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [message, setMessage] = useState("");

  const { getFieldProps, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        newPassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: handleResetPassword,
    });

  async function handleResetPassword(values: FormikValues) {
    try {
      const res = await updateData({
        url: "/auth/resetPassword",
        data: { email, newPassword: values.newPassword },
      });

      if (res) {
        navigate("/login");
      } else {
        setMessage("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setMessage("An error occurred. Please try again.");
    }
  }

  if (!email) {
    navigate("/");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-3">
      <h2 className="mb-4">Reset Password</h2>
      <p className="mb-4">
        Enter your new password for <strong>{email}</strong>.
      </p>

      {message && <ErrorMsg message={message} />}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter New Password"
            aria-label="New Password"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.newPassword && touched.newPassword
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("newPassword")}
          />
          {errors.newPassword && touched.newPassword && (
            <ErrorMsg message={errors.newPassword} />
          )}
        </div>

        <button
          type="submit"
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full disabled:opacity-50 !bg-green-600 !shadow-green-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
