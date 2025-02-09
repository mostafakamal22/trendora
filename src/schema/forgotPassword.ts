import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object().shape({
  resetCode: Yup.string().required("Reset Code is required"),
});
