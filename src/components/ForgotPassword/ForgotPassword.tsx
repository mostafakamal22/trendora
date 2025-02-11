import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../../schema/forgotPassword";
import { twMerge } from "tailwind-merge";
import postData from "../../utils/postData";
import ErrorMsg from "../shared/ErrorMsg";
import toast from "@/lib/sonner";
import handleError from "@/utils/handleError";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

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
        toast.error("Invalid reset code. Please try again.");
      }
    } catch (error) {
      console.error("Reset code verification failed:", error);
      handleError(error);
    }
  }

  if (!email) {
    navigate("/");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-3">
      <h2 className="mb-4">Verify Reset Code</h2>
      <p className="mb-4">
        We sent a reset code to <strong>{email}</strong>. Please enter it below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <input
            type="text"
            id="resetCode"
            placeholder="Enter Reset Code"
            aria-label="Reset Code"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.resetCode && touched.resetCode
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("resetCode")}
          />
          {errors.resetCode && touched.resetCode && (
            <ErrorMsg message={errors.resetCode} />
          )}
        </div>

        <button
          type="submit"
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full disabled:opacity-50 !bg-blue-600 !shadow-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
