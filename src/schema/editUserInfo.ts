import * as Yup from "yup";

export const editUserInfoSchema = Yup.object({
  name: Yup.string()
    .required("new name is required")
    .matches(
      /^[A-Za-z\s]{3,30}$/,
      "Name must be 3-30 characters and contain only letters and spaces"
    ),
  email: Yup.string()
    .required("new email is required")
    .email("Enter a valid email address"),
  phone: Yup.string()
    .matches(
      /^(?:\+20|0)?1[0125]\d{8}$/,
      "Enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)"
    )
    .required("new phone number is required"),
});
