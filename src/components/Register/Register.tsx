import { useFormik } from "formik";
import { registerSchema } from "../../schema/register";

export default function Register() {
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Register Data:", values);
    },
  });

  return (
    <div>
      <h1>Regsiter Now</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow-md rounded-md"
      >
        <div className="mb-3">
          <label htmlFor="name"> Name:</label>

          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-2 w-full"
            {...getFieldProps("name")}
          />
          {errors.name && touched.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </div>

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

        <div className="mb-3">
          <label htmlFor="repassword"> Confrim Password:</label>

          <input
            type="password"
            id="repassword"
            placeholder="Confirm Password"
            className="border p-2 w-full"
            {...getFieldProps("rePassword")}
          />
          {errors.rePassword && touched.rePassword && (
            <p className="text-red-500">{errors.rePassword}</p>
          )}
        </div>

        <input
          type="text"
          id="phone"
          placeholder="Phone Number"
          className="border p-2 w-full"
          {...getFieldProps("phone")}
        />
        {errors.phone && touched.phone && (
          <p className="text-red-500">{errors.phone}</p>
        )}

        <button
          type="submit"
          className="bg-orange-500 text-white p-2 w-full rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}
