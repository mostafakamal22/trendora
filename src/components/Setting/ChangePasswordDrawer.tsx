import { useFormik } from "formik";
import { Drawer } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { BsPassFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { changePasswordSchema } from "@/schema/changePassword";
import updateData from "@/utils/updateData";
import useFormLoading from "@/hooks/useFormLoading";
import handleToastPromise from "@/utils/handleToastPromise";
import ErrorMsg from "../shared/ErrorMsg";

interface ChangePasswordDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordDrawer = ({
  isOpen,
  setIsOpen,
}: ChangePasswordDrawerProps) => {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [token] = useLocalStorage("token");

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: handlePasswordChange,
  });

  async function handlePasswordChange(values: {
    currentPassword: string;
    password: string;
    rePassword: string;
  }) {
    setIsFormLoading(true);

    handleToastPromise({
      promise: updateData({
        url: "/users/changeMyPassword",
        data: values,
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        setIsOpen(false);
      },
      successMsg:
        "Your password has been changed successfully. Please log in again.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="bottom">
      <Drawer.Header
        title="Change Your Password"
        titleIcon={() => <BsPassFill className="mr-2" size={20} />}
      />
      <Drawer.Items className="p-4">
        <form onSubmit={handleSubmit} className="space-y-8 mt-10">
          <div className="mb-3">
            <input
              type="password"
              id="currentPassword"
              placeholder="Current Password"
              aria-label="currentPassword"
              className={twMerge(
                "form-input",
                errors.currentPassword && touched.currentPassword
                  ? "border-red-500 bg-custom-fadeOrange"
                  : "border-gray-300"
              )}
              {...getFieldProps("currentPassword")}
            />
            {errors.currentPassword && touched.currentPassword && (
              <ErrorMsg message={errors.currentPassword} />
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              id="password"
              placeholder="New Password"
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

          <div className="mb-3">
            <input
              type="password"
              id="repassword"
              placeholder="Confirm Password"
              aria-label="Confrim Password"
              className={twMerge(
                "form-input",
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

          <button
            type="submit"
            className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full"
            disabled={!isValid || isSubmitting || isFormLoading}
          >
            {isSubmitting || isFormLoading ? "Changing..." : "Change"}
          </button>
        </form>
      </Drawer.Items>
    </Drawer>
  );
};

export default ChangePasswordDrawer;
