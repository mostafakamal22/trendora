import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../../schema/forgotPassword";
import { twMerge } from "tailwind-merge";
import postData from "../../utils/postData";
import ErrorMsg from "../shared/ErrorMsg";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";

export default function ForgotPassword() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: handleVerifyResetCode,
  });

  async function handleVerifyResetCode(values: FormikValues) {
    setIsFormLoading(true);

    handleToastPromise({
      promise: postData({
        url: "/auth/verifyResetCode",
        data: { resetCode: values.resetCode?.trim() },
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        navigate("/reset-password", { state: { email } });
      },
      successMsg: "Great, let's reset the password.",
      onError: (error) => {
        setIsFormLoading(false);
        console.error(error);
      },
    });
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
              "form-input",
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
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full !bg-blue-600 !shadow-blue-600"
          disabled={!isValid || isSubmitting || isFormLoading}
        >
          {isSubmitting || isFormLoading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
