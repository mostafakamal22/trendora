import { FormikValues, useFormik } from "formik";
import { checkoutSchema } from "../../schema/checkout";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Checkout as CheckoutType } from "../../types";
import handleError from "../../utils/handleError";
import postData from "../../utils/postData";

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
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="details" className="block text-gray-700">
            Details
          </label>
          <input
            type="text"
            id="details"
            className="form-control mb-3"
            {...getFieldProps("details")}
          />
          {touched.details && errors.details && (
            <div className="text-red-500 text-sm">{errors.details}</div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="form-control mb-3"
            {...getFieldProps("phone")}
          />
          {touched.phone && errors.phone && (
            <div className="text-red-500 text-sm">{errors.phone}</div>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            className="form-control mb-3"
            {...getFieldProps("city")}
          />
          {touched.city && errors.city && (
            <div className="text-red-500 text-sm">{errors.city}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-outline-info w-100 my-5"
          disabled={!isValid || isSubmitting}
        >
          Pay now
        </button>
      </form>
    </div>
  );
}
