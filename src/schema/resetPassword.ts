import * as Yup from "yup";

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must be 6-9 characters, start with a letter, and contain only letters and numbers"
    )
    .required("Password is required"),
});
