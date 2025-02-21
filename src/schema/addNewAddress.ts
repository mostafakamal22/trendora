import * as Yup from "yup";

export const addNewAddressSchema = Yup.object({
  name: Yup.string().required("Address name is required"),
  details: Yup.string().required("Address details are required"),
  phone: Yup.string()
    .matches(
      /^(?:\+20|0)?1[0125]\d{8}$/,
      "Enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)"
    )
    .required("Phone number is required"),
  city: Yup.string().required("City is required"),
});
