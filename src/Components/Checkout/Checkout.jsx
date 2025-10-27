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
  const navigate=useNavigate()
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
        toast.error("No cart items found");
        return;
      }

      setIsLoading(true);

      try {
        if (paymentMethod === "online") {
          const { data } = await checkout(cart.cartId, window.location.origin, values)


          if (data?.status === "success") {
            if (data.session?.url) {
              // فتح صفحة الدفع أونلاين (Stripe)
              window.location.href = data.session.url;
            } else {
window.location.href = "/allorders";
            }
          } else {
            toast.error("Failed to initiate online payment");
          }
        }
        
        
        else {
          const { data } = await payByCash(cart.cartId, values);
          if (data?.status === "success") {
            setCart(null);
            toast.success("Order placed successfully!");
            navigate("/allorders"); 
          }
        }
      } 
      
      catch (error) {
        console.error("Checkout error:", error);
        toast.error(error.response?.data?.message || "Checkout failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Helmet>
        <title>Checkout - E-Commerce</title>
        <meta
          name="description"
          content="Complete your order and choose your payment method"
        />
      </Helmet>

      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="details"
            placeholder="Details"
            onChange={formik.handleChange}
            value={formik.values.details}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <div className="flex justify-around my-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              Online Payment
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            {isLoading
              ? "Processing..."
              : `Confirm Order (${paymentMethod === "online" ? "Pay Now" : "Place Order"})`}
          </button>
        </form>
      </div>
    </div>
  );
}
