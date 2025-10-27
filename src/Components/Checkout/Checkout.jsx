import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { cart, setCart,checkout,payByCash } = useContext(CartContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Details are required'),
      phone: Yup.string().required('Phone is required'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        if (paymentMethod === 'online') {
          const { data } = await checkout(
            cart.cartId,
            import.meta.env.BASE_URL + 'allorders',
            values
          );

          if (data?.status === 'success') {
            if (data.session?.url) {
              window.location.href = data.session.url;
            } else {
              navigate('/allorders'); // ✅ بدل window.location.href
            }
          } else {
            toast.error('Failed to initiate online payment');
          }
        } else {
          const { data } = await payByCash(cart.cartId, values);
          if (data?.status === 'success') {
            setCart(null);
            toast.success('Order placed successfully!');
            navigate('/allorders'); // ✅ هنا كمان
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

  return (
    <div className="checkout">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="details"
          placeholder="Details"
          onChange={formik.handleChange}
          value={formik.values.details}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={formik.handleChange}
          value={formik.values.city}
        />

        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
            />
            Online Payment
          </label>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Confirm Order'}
        </button>
      </form>
    </div>
  );
}
