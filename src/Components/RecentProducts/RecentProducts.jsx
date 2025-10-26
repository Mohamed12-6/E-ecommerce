import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {

    const { addProductToCart, setCart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(null)

    function getAllProduct() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['AllProducts'],
        queryFn: getAllProduct,
    });

    async function AddToCart(productID) {
        setLoading(true)
        setCurrentProductId(productID)
        let res = await addProductToCart(productID)
        if (res.data.status === "success") {
            setLoading(false)
            setCart(res.data)
            toast.success(res.data.message, { duration: 4000 })
        } else {
            setLoading(false)
            toast.error(res.data.message, { duration: 4000 })
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching products.</div>;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 p-4'>
            {data?.data?.data.map((product) => (
                <div key={product.id} className='relative group overflow-hidden rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-white'>
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        <img className="w-full h-48 md:h-56 lg:h-60 object-cover" src={product.imageCover} alt={product.title} />
                    </Link>
                    <div className="p-3">
                        <div className="flex justify-between items-center mb-1">
                            <h2 className="text-green-500 text-sm md:text-base">{product.category.name}</h2>
                        </div>
                        <p className='text-gray-800 text-sm md:text-base font-medium mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                        <div className="flex justify-between items-center text-sm md:text-base mb-2">
                            <span className='font-semibold'>{product.price} EGP</span>
                            <span className='text-yellow-400'>{product.ratingsAverage} <i className='fa fa-star'></i></span>
                        </div>
                        <button 
                            onClick={() => AddToCart(product.id)}
                            className='w-full bg-green-500 hover:bg-green-600 text-white py-2 md:py-2.5 text-sm md:text-base font-semibold rounded transition-all duration-300 flex justify-center items-center'
                        >
                            {currentProductId === product.id && loading ? <i className="fa fa-spinner fa-spin mr-2"></i> : null}
                            {currentProductId === product.id && loading ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
