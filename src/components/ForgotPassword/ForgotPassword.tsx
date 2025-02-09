import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPasswordSchema } from "../../schema/forgotPassword";
import postData from "../../utils/postData";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [message, setMessage] = useState("");

  const { getFieldProps, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        resetCode: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: handleVerifyResetCode,
    });

  async function handleVerifyResetCode(values: FormikValues) {
    try {
      const res = await postData({
        url: "/auth/verifyResetCode",
        data: { resetCode: values.resetCode?.trim() },
      });

      if (res) {
        navigate("/reset-password", { state: { email } });
      } else {
        setMessage("Invalid reset code. Please try again.");
      }
    } catch (error) {
      console.error("Reset code verification failed:", error);
      setMessage("An error occurred. Please try again.");
    }
  }

  if (!email) {
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Verify Reset Code</h2>
      <p className="mb-4 text-gray-600">
        We sent a reset code to <strong>{email}</strong>. Please enter it below.
      </p>

      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resetCode" className="block font-medium">
            Reset Code:
          </label>
          <input
            type="text"
            id="resetCode"
            placeholder="Enter Reset Code"
            className="border p-2 w-full"
            {...getFieldProps("resetCode")}
          />
          {errors.resetCode && touched.resetCode && (
            <p className="text-red-500">{errors.resetCode}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
