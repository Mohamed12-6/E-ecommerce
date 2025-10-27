import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const { checkout, cart, payByCash, setCart } = useContext(CartContext);

  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .required('Shipping address is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number')
      .required('Phone number is required'),
    city: Yup.string().min(3, 'City name too short').required('City is required'),
  });

  const formik = useFormik({
    initialValues: { details: '', phone: '', city: '' },
    validationSchema,
    onSubmit: async (values) => {
      if (!cart?.cartId) {
        toast.error('No cart items found');
        return;
      }

      setIsLoading(true);

      try {
        if (paymentMethod === 'online') {
          const { data } = await checkout(
            cart.cartId,
            import.meta.env.BASE_URL + 'allorders',
            values
          );
          if (data?.status === 'success') {
            // إذا بوابة الدفع رجعت URL جاهز
            if (data.session?.url) {
              window.location.href = data.session.url;
            } else {
              window.location.href = import.meta.env.BASE_URL + 'allorders';
            }
          } else {
            toast.error('Failed to initiate online payment');
          }
        } else {
          const { data } = await payByCash(cart.cartId, values);
          if (data?.status === 'success') {
            setCart(null);
            toast.success('Order placed successfully!');
            // توجيه آمن لجميع البيئات
            window.location.href = import.meta.env.BASE_URL + 'allorders';
          }
        }
      } catch (error) {
        console.error('Checkout error:', error);
        toast.error(error.response?.data?.message || 'Checkout failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handlePaymentMethodChange = (method) => setPaymentMethod(method);

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 max-w-xl">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-green-600 mb-8">
          <i className="fas fa-credit-card mr-2"></i> Complete Your Order
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-200"
        >
          {/* Shipping Info */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="details"
                name="details"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className={`w-full px-3 py-2 text-sm sm:text-base border rounded-md resize-none focus:ring-2 focus:ring-green-400 focus:border-green-400 ${
                  formik.touched.details && formik.errors.details ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Building number, street, district"
              />
              {formik.touched.details && formik.errors.details && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.details}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={`w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 ${
                  formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="01XXXXXXXXX"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
              )}
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={`w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 ${
                  formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your city"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.city}</p>
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
            <div className="flex flex-col gap-4">
              {/* Online Payment */}
              <div
                className={`p-4 sm:p-5 border rounded-md cursor-pointer transition-all ${
                  paymentMethod === 'online' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300'
                }`}
                onClick={() => handlePaymentMethodChange('online')}
              >
                <div className="flex items-center">
                  <input type="radio" checked={paymentMethod === 'online'} onChange={() => {}} className="h-4 w-4 text-green-600 focus:ring-green-500" />
                  <label className="ml-3 text-sm sm:text-base font-medium text-gray-700">
                    Credit/Debit Card (Online Payment)
                  </label>
                </div>
                <p className="mt-1 ml-7 text-sm text-gray-500">
                  Pay securely with your credit or debit card.
                </p>
              </div>

              {/* Cash on Delivery */}
              <div
                className={`p-4 sm:p-5 border rounded-md cursor-pointer transition-all ${
                  paymentMethod === 'cash' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-300'
                }`}
                onClick={() => handlePaymentMethodChange('cash')}
              >
                <div className="flex items-center">
                  <input type="radio" checked={paymentMethod === 'cash'} onChange={() => {}} className="h-4 w-4 text-green-600 focus:ring-green-500" />
                  <label className="ml-3 text-sm sm:text-base font-medium text-gray-700">
                    Cash on Delivery
                  </label>
                </div>
                <p className="mt-1 ml-7 text-sm text-gray-500">Pay cash when you receive your order.</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
              </>
            ) : (
              `Complete Order (${paymentMethod === 'online' ? 'Pay Now' : 'Place Order'})`
            )}
          </button>
        </form>
      </div>
    </>
  );
}
