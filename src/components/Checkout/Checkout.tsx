import { FormikValues, useFormik } from "formik";
import { checkoutSchema } from "../../schema/checkout";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Checkout as CheckoutType } from "../../types";
import { twMerge } from "tailwind-merge";
import handleError from "../../utils/handleError";
import postData from "../../utils/postData";
import ErrorMsg from "../shared/ErrorMsg";

export default function Checkout() {
  const cartId = useParams()?.id;

  const BASE_URL = window.location.origin;

  const [token] = useLocalStorage("token");

  const {
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

    try {
      const res = await postData<CheckoutType>({
        url: `/orders/checkout-session/${cartId}?url=${BASE_URL}`,
        data: {
          shippingAddress: {
            ...values,
          },
        },
        token: token as string,
      });

      console.log(res);

      location.href = res?.session?.url;
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <section className="max-w-xl w-full mx-auto mt-5 md:mt-10">
      <h1 className="mb-5">Complete Your Purchase</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="mb-3">
          <input
            type="text"
            id="details"
            placeholder="details"
            aria-label="details"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm bg-custom-fadeOrange focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
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
            placeholder="phone"
            aria-label="phone"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm bg-custom-fadeOrange focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.phone && touched.phone
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("phone")}
          />
          {touched.phone && errors.phone && <ErrorMsg message={errors.phone} />}
        </div>

        <div className="mb-3">
          <input
            type="text"
            id="city"
            placeholder="city"
            aria-label="city"
            className={twMerge(
              "w-full px-3 py-2 border-transparent rounded-md border text-gray-800 shadow-sm bg-custom-fadeOrange focus:ring-2 focus:ring-primary-default focus:border-primary-default transition-all duration-300 ease-in-out disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              errors.city && touched.city
                ? "border-red-500 bg-custom-fadeOrange"
                : "border-gray-300"
            )}
            {...getFieldProps("city")}
          />
          {touched.city && errors.city && <ErrorMsg message={errors.city} />}
        </div>

        <button
          type="submit"
          className="btn w-full px-2 py-3 !bg-blue-600 !shadow-blue-600 font-playfair"
          disabled={!isValid || isSubmitting}
        >
          Go To Payment
        </button>
      </form>
    </section>
  );
}
