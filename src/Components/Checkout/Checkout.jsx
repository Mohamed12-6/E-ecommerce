import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { cart, setCart, checkout, payByCash } = useContext(CartContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!cart?.cartId) {
        toast.error("No cart items found!");
        return;
      }

      setIsLoading(true);

      try {
        if (paymentMethod === "online") {
          const { data } = await checkout(
            cart.cartId,
            window.location.origin,
            values
          );

          if (data?.status === "success") {
            toast.success("Redirecting to payment...");
            setTimeout(() => {
              if (data.session?.url) {
                window.location.href = data.session.url;
              } else {
                navigate("/allorders");
              }
            }, 1000);
          } else {
            toast.error("Failed to start online payment!");
          }
        } else {
          const { data } = await payByCash(cart.cartId, values);
          if (data?.status === "success") {
            setCart(null);
            toast.success("Order placed successfully!");
            setTimeout(() => navigate("/allorders"), 1500);
          }
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error(error.response?.data?.message || "Checkout failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <Helmet>
        <title>Checkout - E-Commerce</title>
        <meta
          name="description"
          content="Complete your order and choose your payment method"
        />
      </Helmet>

      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Checkout
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-5 transition-all"
        >
          {/* Details Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Address Details
            </label>
            <input
              type="text"
              name="details"
              placeholder="Ex: Apartment 3, Street 12"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className={`w-full border ${
                formik.touched.details && formik.errors.details
                  ? "border-red-400"
                  : "border-gray-300"
              } rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {formik.touched.details && formik.errors.details && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.details}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Ex: 01012345678"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={`w-full border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-400"
                  : "border-gray-300"
              } rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {formik.touched.phone && formik.errors.phone && (
              
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </p>
            )}
          </div>

          {/* City Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Ex: Cairo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={`w-full border ${
                formik.touched.city && formik.errors.city
                  ? "border-red-400"
                  : "border-gray-300"
              } rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
            )}
          </div>

          {/* Payment Methods */}
          <div className="flex justify-between items-center border-t border-b py-4">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="text-green-600 focus:ring-green-500"
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
                className="text-green-600 focus:ring-green-500"
              />
              Online Payment
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-md`}
          >
            {isLoading
              ? "Processing..."
              : paymentMethod === "online"
              ? "Pay Now"
              : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
