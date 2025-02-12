import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../schema/resetPassword";
import { twMerge } from "tailwind-merge";
import updateData from "../../utils/updateData";
import ErrorMsg from "../shared/ErrorMsg";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";

export default function ResetPassword() {
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
      newPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: handleResetPassword,
  });

  async function handleResetPassword(values: FormikValues) {
    setIsFormLoading(true);

    handleToastPromise({
      promise: updateData({
        url: "/auth/resetPassword",
        data: { email, newPassword: values.newPassword },
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        navigate("/login");
      },
      successMsg: "Password reset successful, try signin now.",
      onError: (error) => {
        setIsFormLoading(false);
        console.error("Password reset error:", error);
      },
    });
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter New Password"
            aria-label="New Password"
            className={twMerge(
              "form-input",
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
          className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full !bg-green-600 !shadow-green-600"
          disabled={!isValid || isSubmitting || isFormLoading}
        >
          {isSubmitting || isFormLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
