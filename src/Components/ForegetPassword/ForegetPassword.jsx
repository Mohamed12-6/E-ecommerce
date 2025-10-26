import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [apierror, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Yup Validation Schema
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setApiError(data.message);

      setTimeout(() => {
        setIsLoading(false);
        if (data?.statusMsg === "success") navigate("/resetcode");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setApiError("Something went wrong, please try again.");
      console.error(err);
    }
  }

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <section className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          {/* Title */}
          <h1 className="text-center text-green-600 mb-6 text-2xl md:text-3xl font-bold">
            <i className="fa-regular fa-circle-user mr-3"></i>
            Forget Password
          </h1>

          {/* API Message */}
          {apierror && (
            <div
              className={`p-3 mb-5 text-sm rounded-md ${
                apierror.includes("success")
                  ? "text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-400"
                  : "text-red-600 bg-red-100 dark:bg-red-800 dark:text-red-400"
              }`}
            >
              {apierror}
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                id="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder=" "
                className={`block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none peer ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-green-600"
                } dark:text-white dark:border-gray-600 dark:focus:border-green-400`}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600"
              >
                Enter your email address:
              </label>
            </div>

            {/* Validation Error */}
            {formik.errors.email && formik.touched.email && (
              <div className="p-2 mb-4 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-800 dark:text-red-300">
                {formik.errors.email}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-2 rounded-md text-white font-medium text-sm transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin mr-2"></i> Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
