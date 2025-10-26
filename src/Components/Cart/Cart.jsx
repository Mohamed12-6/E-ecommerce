import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const { getCart, removeCart, updateCart } = useContext(CartContext);
  const [cartProduct, setCartProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getToCart() {
    setLoading(true);
    let res = await getCart();
    setCartProduct(res.data.data);
    setLoading(false);
  }

  async function deleteCart(productId) {
    let resp = await removeCart(productId);
    setCartProduct(resp.data.data);
  }

  async function updateToCart(productId, count) {
    if (count < 1) {
      removeCart(productId);
      return;
    }
    let resp = await updateCart(productId, count);
    setCartProduct(resp.data.data);
  }

  useEffect(() => {
    getToCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="green" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart</title>
      </Helmet>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2 sm:p-0">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse md:table">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden md:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-3">Image</th>
              <th scope="col" className="px-4 py-3">Product</th>
              <th scope="col" className="px-4 py-3">Qty</th>
              <th scope="col" className="px-4 py-3">Price</th>
              <th scope="col" className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {cartProduct?.products?.map((product) => (
              <tr
                key={product.product.id}
                className="block md:table-row mb-4 md:mb-0 border border-gray-200 md:border-none rounded-md md:rounded-none bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="block md:table-cell p-4 text-center md:text-left">
                  <img
                    src={product.product.imageCover}
                    alt="Product"
                    className="inline-block w-16 md:w-32 max-w-full max-h-full rounded"
                  />
                </td>
                <td className="block md:table-cell px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="block md:table-cell px-4 py-3">
                  <div className="flex justify-center md:justify-start items-center space-x-2">
                    <button
                      onClick={() => updateToCart(product.product.id, product.count - 1)}
                      className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                      aria-label="Decrease Quantity"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="18" y1="12" x2="6" y2="12" />
                      </svg>
                    </button>
                    <span className="text-center w-6">{product.count}</span>
                    <button
                      onClick={() => updateToCart(product.product.id, product.count + 1)}
                      className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                      aria-label="Increase Quantity"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="12" y1="6" x2="12" y2="18" />
                        <line x1="18" y1="12" x2="6" y2="12" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="block md:table-cell px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  {(product.count * product.price)} EGP
                </td>
                <td className="block md:table-cell px-4 py-3 text-center md:text-left">
                  <span
                    onClick={() => deleteCart(product.product.id)}
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline inline-block"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to={'/checkout'}>
          <div className="flex justify-center items-center my-3">
            <button className="bg-green-500 text-lg hover:bg-green-700 transition-all duration-300 text-white rounded-lg py-2 my-2 px-4">
              Checkout Now
            </button>
          </div>
        </Link>
      </div>
    </>
  );
}
