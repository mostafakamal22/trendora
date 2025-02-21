import { Drawer } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "@/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { addNewAddressSchema } from "@/schema/addNewAddress";
import { FaAddressCard } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useFormik } from "formik";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";
import ErrorMsg from "../shared/ErrorMsg";
import postData from "@/utils/postData";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddNewAddressDrawer({ isOpen, setIsOpen }: Props) {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [token] = useLocalStorage("token");

  const queryClient = useQueryClient();

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
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: addNewAddressSchema,
    onSubmit: handleAddNewAddress,
  });

  async function handleAddNewAddress(values: Omit<Address, "_id">) {
    setIsFormLoading(true);

    handleToastPromise({
      promise: postData({
        url: "/addresses",
        data: values,
        token: token as string,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setIsFormLoading(false);
        setIsOpen(false);
      },
      successMsg: "New address has been added successfully.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="bottom">
      <Drawer.Header
        title="Add New Address"
        titleIcon={() => <FaAddressCard className="mr-2" size={20} />}
      />

      <Drawer.Items className="p-4">
        <form onSubmit={handleSubmit} className="space-y-8 mt-10">
          <div className="mb-3">
            <input
              type="text"
              id="name"
              placeholder="Address name"
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
            <textarea
              id="details"
              placeholder="Address details"
              aria-label="details"
              className={twMerge(
                "form-input",
                errors.details && touched.details
                  ? "border-red-500 bg-custom-fadeOrange"
                  : "border-gray-300"
              )}
              {...getFieldProps("details")}
            />
            {errors.details && touched.details && (
              <ErrorMsg message={errors.details} />
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

          <div className="mb-3">
            <input
              type="text"
              id="city"
              placeholder="City"
              aria-label="city"
              className={twMerge(
                "form-input",
                errors.city && touched.city
                  ? "border-red-500 bg-custom-fadeOrange"
                  : "border-gray-300"
              )}
              {...getFieldProps("city")}
            />
            {errors.city && touched.city && <ErrorMsg message={errors.city} />}
          </div>

          <button
            type="submit"
            className="btn text-base font-bold uppercase font-playfair px-2 py-3 w-full"
            disabled={!isValid || isSubmitting || isFormLoading}
          >
            {isSubmitting || isFormLoading ? "Adding..." : "Add"}
          </button>
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
