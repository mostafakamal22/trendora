import * as Yup from "yup";

export const checkoutSchema = Yup.object({
  details: Yup.string().required("Shipping details are required"),
  phone: Yup.string()
    .matches(
      /^(?:\+20|0)?1[0125]\d{8}$/,
      "Enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)"
    )
    .required("Phone number is required"),
  city: Yup.string().required("City is required"),
});
