import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
    const { getCart, removeCart, updateCart, cart, setCart } = useContext(CartContext);
    const [cartProduct, setCartProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getToCart() {
        setLoading(true);
        let res = await getCart();
        // console.log(res);
        setCartProduct(res.data.data);
        setLoading(false);
    }

    async function deleteCart(productId) {

        let resp = await removeCart(productId);
        // console.log(resp.data.data);
        setCartProduct(resp.data.data);

    }

    async function updateToCart(productId, count) {
        if (count < 1) {
            removeCart(productId)
        }
        let resp = await updateCart(productId, count);
        // console.log(resp.data.data);
        setCartProduct(resp.data.data);
    }
    useEffect(() => {
        getToCart();
    }, []);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <RingLoader color='green' />
            </div>
        );
    }


    return (
        <>
            <Helmet>
                <title>Fresh Cart</title>
            </Helmet>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProduct?.products?.map((product) => (
                            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => updateToCart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Decrease Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <span>{product.count}</span>
                                        </div>
                                        <button onClick={() => updateToCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Increase Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.price} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <span onClick={() => deleteCart(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500">Remove</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Link to={'/checkout'}>
                    <div className='flex justify-center items-center my-3'>
                        <button className='bg-green-500 text-lg hover:bg-green-700 transition-all duration-300 text-white rounded-lg py-2 my-2 px-4 '>Checkout Now</button>
                    </div>
                </Link>
            </div>
        </>
    );
}