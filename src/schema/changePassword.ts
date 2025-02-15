import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Password is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must be 6-9 characters, start with a letter, and contain only letters and numbers"
    ),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});
