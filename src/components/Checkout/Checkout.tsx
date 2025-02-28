import { FormikValues, useFormik } from "formik";
import { checkoutSchema } from "../../schema/checkout";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Checkout as CheckoutType, User } from "../../types";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import postData from "../../utils/postData";
import ErrorMsg from "../shared/ErrorMsg";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";
import fetchData from "@/utils/fetchData";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";

export default function Checkout() {
  const cartId = useParams()?.id;

  const BASE_URL = window.location.origin;

  const [token] = useLocalStorage("token");
  const [userId] = useLocalStorage("userId");

  const { isFormLoading, setIsFormLoading } = useFormLoading();
  const [selectedAddress, setSelectedAddress] = useState<string | "new">("new");

  const {
    isLoading,
    isFetching,
    data: userData,
    error,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetchData<{ data: User }>({
        url: `/users/${userId}`,
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {
    setValues,
    resetForm,
    isSubmitting,
    isValid,
    handleSubmit,
    touched,
    errors,
    getFieldProps,
  } = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: handleCheckout,
  });

  async function handleCheckout(values: FormikValues) {
    console.log("Form submitted:", values);
    setIsFormLoading(true);

    handleToastPromise<CheckoutType>({
      promise: postData<CheckoutType>({
        url: `/orders/checkout-session/${cartId}?url=${BASE_URL}`,
        data: {
          shippingAddress: {
            ...values,
          },
        },
        token: token as string,
      }),
      onSuccess: (data) => {
        setIsFormLoading(false);

        location.href = data?.session?.url;
      },
      successMsg: "Redirecting to payment...",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const addressId = event.target.value;
    setSelectedAddress(addressId);

    if (addressId !== "new") {
      const selected = userAddresses.find((addr) => addr._id === addressId);
      if (selected) {
        setValues({
          details: selected.details,
          phone: selected.phone,
          city: selected.city,
        });
      }
    } else {
      resetForm();
    }
  }

  if (isLoading || isFetching) {
    return <MainSpinner size={40} className="h-[50vh]" />;
  }

  if (isError) {
    console.error(error);
    return <FetchDataError name="User data" />;
  }

  const userAddresses = userData?.data?.addresses || [];

  return (
    <section className="max-w-xl w-full mx-auto mt-5 md:mt-10">
      <h1 className="mb-5">Complete Your Purchase</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {userAddresses.length > 0 && (
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-500">
              Choose a Shipping Address
            </label>
            <select
              value={selectedAddress}
              onChange={handleAddressChange}
              className="form-input w-full"
            >
              <option value="new">Use a different address</option>
              {userAddresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.name} - {address.city}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedAddress === "new" && (
          <>
            {userAddresses.length === 0 && (
              <p className="text-sm mb-5">
                You don't have any saved addresses. Please enter an address to
                ship to.
                <br />
                Or add one from your profile{" "}
                <Link
                  to="/setting"
                  className="text-primary-default font-semibold"
                >
                  settings
                </Link>
                .
              </p>
            )}

            <div className="mb-3">
              <textarea
                id="details"
                placeholder="Shipping details"
                aria-label="details"
                className={twMerge(
                  "form-input",
                  errors.details && touched.details
                    ? "border-red-500 bg-custom-fadeOrange"
                    : "border-gray-300"
                )}
                {...getFieldProps("details")}
              />
              {touched.details && errors.details && (
                <ErrorMsg message={errors.details} />
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="phone"
                placeholder="Phone number"
                aria-label="phone"
                className={twMerge(
                  "form-input",
                  errors.phone && touched.phone
                    ? "border-red-500 bg-custom-fadeOrange"
                    : "border-gray-300"
                )}
                {...getFieldProps("phone")}
              />
              {touched.phone && errors.phone && (
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
              {touched.city && errors.city && (
                <ErrorMsg message={errors.city} />
              )}
            </div>
          </>
        )}
        <button
          type="submit"
          className="btn w-full px-2 py-3 !bg-blue-600 !shadow-blue-600 font-playfair"
          disabled={!isValid || isSubmitting || isFormLoading}
        >
          {isSubmitting || isFormLoading ? "Processing..." : "Go To Payment"}
        </button>
      </form>
    </section>
  );
}
