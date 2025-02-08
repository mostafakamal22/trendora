import { FormikValues, useFormik } from "formik";
import { loginSchema } from "../../schema/login";
import postData from "../../utils/postData";

export default function Login() {
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
      const res = await postData({ url: "/auth/signin", data: values });

      if (res) {
        console.log(res.data);
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
