import { Drawer } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import { QueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { editUserInfoSchema } from "@/schema/editUserInfo";
import { FaUser } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useFormik } from "formik";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";
import updateData from "@/utils/updateData";
import ErrorMsg from "../shared/ErrorMsg";

interface EditUserInfoDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userData?: User;
  queryClient: QueryClient;
}

export default function EditUserInfoDrawer({
  isOpen,
  setIsOpen,
  userData,
  queryClient,
}: EditUserInfoDrawerProps) {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [token] = useLocalStorage("token");

  const {
    setErrors,
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    validationSchema: editUserInfoSchema,
    onSubmit: handleEdeditUserInfo,
  });

  async function handleEdeditUserInfo(values: Partial<User>) {
    if (values?.email?.toLowerCase() === userData?.email?.toLowerCase()) {
      return setErrors({ email: "Please provide new email" });
    }

    setIsFormLoading(true);

    handleToastPromise({
      promise: updateData({
        url: "/users/updateMe/",
        data: values,
        token: token as string,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setIsFormLoading(false);
        setIsOpen(false);
      },
      successMsg: "Your info has been Updated.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="bottom">
      <Drawer.Header
        title="Edit Info"
        titleIcon={() => <FaUser className="mr-2" size={20} />}
      />

      <Drawer.Items className="p-4">
        <form onSubmit={handleSubmit} className="space-y-8 mt-10">
          <div className="mb-3">
            <input
              type="text"
              id="name"
              placeholder="Name"
              aria-label="name"
              className={twMerge(
                "form-input",
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
                "form-input",
                errors.email && touched.email
                  ? "border-red-500 bg-custom-fadeOrange"
                  : "border-gray-300"
              )}
              {...getFieldProps("email")}
            />
            {errors.email && touched.email && (
              <ErrorMsg message={errors.email} />
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              id="phone"
              placeholder="Phone Number"
              aria-label="phone number"
              className={twMerge(
                "form-input",
                errors.phone && touched.phone
                  ? "border-red-500 bg-custom-fadeOrange"
                  : "border-gray-300"
              )}
              {...getFieldProps("phone")}
            />
            {errors.phone && touched.phone && (
              <ErrorMsg message={errors.phone} />
            )}
          </div>

          <button
            type="submit"
            className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full"
            disabled={!isValid || isSubmitting || isFormLoading}
          >
            {isSubmitting || isFormLoading ? "Loading..." : "Update Info"}
          </button>
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
