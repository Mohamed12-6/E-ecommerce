import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default function Checkout() {
  const { cart, setCart, checkout, payByCash } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // null, 'cash', 'online'

  const validationSchema = Yup.object({
    details: Yup.string().min(10, 'Address must be at least 10 chars').required('Details required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone').required('Phone required'),
    city: Yup.string().min(3, 'City too short').required('City required'),
  });

  const formik = useFormik({
    initialValues: { details: '', phone: '', city: '' },
    validationSchema,
    onSubmit: async (values) => {
      if (!paymentMethod) {
        toast.error('Please select a payment method');
        return;
      }

      setIsLoading(true);
      const toastId = toast.loading('Processing...');
      try {
        if (paymentMethod === 'cash') {
          const { data } = await payByCash(cart.cartId, values);
          if (data?.status === 'success') {
            setCart(null);
            toast.success('Order placed successfully!');
            navigate('/allorders');
          }
        } else if (paymentMethod === 'online') {
          const { data } = await checkout(cart.cartId, `${window.location.origin}/allorders`, values);
          if (data?.status === 'success' && data?.session?.url) {
            toast.success('Redirecting to payment...');
            setTimeout(() => {
              window.location.href = data.session.url;
            }, 1500);
          } else {
            navigate('/allorders'); // fallback
          }
        }
      } catch (err) {
        console.error(err);
        toast.error('Checkout failed');
      } finally {
        toast.dismiss(toastId);
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Helmet>
        <title>Checkout - E-Commerce</title>
      </Helmet>

      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Details */}
          <input
            type="text"
            name="details"
            placeholder="Building, street, district"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.details && formik.errors.details && (
            <p className="text-red-600 text-sm">{formik.errors.details}</p>
          )}

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="01XXXXXXXXX"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-600 text-sm">{formik.errors.phone}</p>
          )}

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-600 text-sm">{formik.errors.city}</p>
          )}

          {/* Payment Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              onClick={() => setPaymentMethod('cash')}
              className={`flex-1 py-2 rounded-md text-white ${
                paymentMethod === 'cash' ? 'bg-green-600' : 'bg-gray-500'
              }`}
            >
              Pay Now
            </button>
            <button
              type="submit"
              onClick={() => setPaymentMethod('online')}
              className={`flex-1 py-2 rounded-md text-white ${
                paymentMethod === 'online' ? 'bg-green-600' : 'bg-gray-500'
              }`}
            >
              Pay Online
            </button>
          </div>

          {isLoading && <p className="text-center text-gray-500 mt-2">Processing...</p>}
        </form>
      </div>
    </div>
  );
}
