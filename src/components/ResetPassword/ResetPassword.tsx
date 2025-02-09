import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordSchema } from "../../schema/resetPassword";
import updateData from "../../utils/updateData";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <p className="mb-4 text-gray-600">
        Enter your new password for <strong>{email}</strong>.
      </p>

      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block font-medium">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter New Password"
            className="border p-2 w-full"
            {...getFieldProps("newPassword")}
          />
          {errors.newPassword && touched.newPassword && (
            <p className="text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
