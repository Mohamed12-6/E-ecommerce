import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let navigate = useNavigate();

  let [apierror, setapierror] = useState("");
  let [isLoading, setisLoading] = useState(false);
  let { setuserLogin } = useContext(UserContext);

  function handleLogin(formvalues) {
    setisLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formvalues)
      .then((resp) => {
        if (resp?.data?.message === "success") {
          localStorage.setItem("ApiToken", resp.data.token);
          setuserLogin(resp.data.token);
          setisLoading(false);
          navigate("/home");
        }
      })
      .catch((err) => {
        setisLoading(false);
        setapierror(err?.response?.data?.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is Required"),
    password: yup
      .string()
      .required("Password is Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        "Password must contain lowercase, uppercase, digit, and symbol."
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Fresh Login</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-center text-green-600 mb-6 text-3xl font-bold">
            <i className="fa-solid fa-arrow-right-to-bracket mr-3 text-green-500"></i>
            Login
          </h1>

          {apierror && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {apierror}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2.5 flex justify-center items-center transition-all"
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don’t have an account?
              <Link
                to="/register"
                className="text-green-600 font-semibold ml-1 hover:underline"
              >
                Register Now
              </Link>
            </p>

            <Link
              to="/forgetPassword"
              className="text-blue-500 hover:text-blue-700 font-medium text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
