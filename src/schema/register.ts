import * as Yup from "yup";

export const registerSchema: Yup.Schema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[A-Za-z\s]{3,30}$/,
      "Name must be 3-30 characters and contain only letters and spaces"
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must be 6-9 characters, start with a letter, and contain only letters and numbers"
    ),

  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),

  phone: Yup.string()
    .matches(
      /^(?:\+20|0)?1[0125]\d{8}$/,
      "Enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)"
    )
    .required("Phone number is required"),
});
