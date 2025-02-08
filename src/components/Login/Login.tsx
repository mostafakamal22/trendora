import { FormikValues, useFormik } from "formik";
import { loginSchema } from "../../schema/login";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import postData from "../../utils/postData";
import { LoginResponse } from "../../types";

export default function Login() {
  const navigate = useNavigate();

  const [, setToken] = useLocalStorage("token");

  const { getFieldProps, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
    });

  async function handleLogin(values: FormikValues) {
    console.log("Login Data:", values);

    try {
      const res = await postData<LoginResponse>({
        url: "/auth/signin",
        data: values,
      });

      if (res && res.token) {
        setToken(res.token);

        navigate("/");
      } else {
        console.error("No response received");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Login Now</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow-md rounded-md"
      >
        <div className="mb-3">
          <label htmlFor="email"> Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border p-2 w-full"
            {...getFieldProps("email")}
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password"> Password:</label>

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border p-2 w-full"
            {...getFieldProps("password")}
          />
          {errors.password && touched.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white p-2 w-full rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
