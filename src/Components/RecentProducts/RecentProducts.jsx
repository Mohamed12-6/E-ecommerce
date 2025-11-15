import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState, useCallback } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {

    const { addProductToCart, setCart } = useContext(CartContext);
    const [currentProductId, setCurrentProductId] = useState(null);

    // ثابتة - مش بتتعمل كل ريندر
    const getAllProduct = useCallback(() => {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['AllProducts'],
        queryFn: getAllProduct,
        staleTime: 1000 * 60 * 5,
        retry: 1,

        // ⬇️⬅️ سحب الداتا بشكل أنضف وأخف
        select: (res) => res.data.data,
    });

    // زرار Add To Cart بلوودر لكل زرار لوحده
    async function AddToCart(productID) {
        setCurrentProductId(productID);

        try {
            const res = await addProductToCart(productID);

            if (res?.data?.status === "success") {
                setCart(res.data);
                toast.success(res.data.message);
            } else {
                toast.error(res?.data?.message || "Failed to add product");
            }

        } catch (error) {
            toast.error("Error adding to cart");
            return error
        } finally {
            setCurrentProductId(null);
        }
    }

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching products.</div>;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 p-4'>
            {data?.map((product) => (
                <div key={product.id}
                    className='relative group overflow-hidden rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-white'>

                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        <img
                            className="w-full h-48 md:h-56 lg:h-60 object-cover"
                            src={product.imageCover}
                            alt={product.title}
                        />
                    </Link>

                    <div className="p-3">
                        <h2 className="text-green-500 text-sm md:text-base">{product.category.name}</h2>

                        <p className='text-gray-800 text-sm md:text-base font-medium mb-1'>
                            {product.title.split(" ").slice(0, 2).join(" ")}
                        </p>

                        <div className="flex justify-between items-center text-sm md:text-base mb-2">
                            <span className='font-semibold'>{product.price} EGP</span>
                            <span className='text-yellow-400'>
                                {product.ratingsAverage} <i className='fa fa-star'></i>
                            </span>
                        </div>

                        <button
                            onClick={() => AddToCart(product.id)}
                            disabled={currentProductId === product.id}
                            className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded flex justify-center items-center'>

                            {currentProductId === product.id ? (
                                <>
                                    <i className="fa fa-spinner fa-spin mr-2"></i>
                                    Adding...
                                </>
                            ) : "Add to Cart"}
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
}
