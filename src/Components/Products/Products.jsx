import useAllProduct from '../../Hooks/useAllProduct'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useContext } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function Products() {

    const { data, isLoading } = useAllProduct()
    const { addProductToCart ,setCart} = useContext(CartContext)
    const { addWishlist } = useContext(WishlistContext);

    async function addtoWishlist(id) {
        let { data } = await addWishlist(id);
        toast.loading('Adding Product To Wishlist...');
        setTimeout(() => {
            if (data.status === 'success') {
                toast.dismiss();
                toast.success(data?.message);
            } else {
                toast.dismiss();
                toast.error('Failed to add to wishlist.');
            }
        }, 800)
    }

    async function addtoCart(productId) {
        let { data } = await addProductToCart(productId);
        toast.loading('Adding Product To Cart...');
        setTimeout(() => {
            toast.dismiss();
            if (data.status === 'success') {toast.success(data?.message) 
                setCart(data)}
            else toast.error('Failed to add product.');
        }, 800);
    }

 
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading color='green' />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 p-4">
                {data?.data?.data?.map((product) => (
                    <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-white">
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <img
                                loading='lazy'
                                src={product.imageCover}
                                alt={product.title}
                                className="w-full h-48 md:h-56 lg:h-60 object-cover"
                            />
                        </Link>

                        <div className='flex justify-between items-center mt-2 px-2'>
                            <h3 className='text-green-500 text-sm md:text-base'>{product.category.name}</h3>
                            <span
                                onClick={() => addtoWishlist(product.id)}
                                className="cursor-pointer transition-colors duration-300 text-gray-600 hover:text-green-500"
                            >
                                <i className="fa-solid fa-heart text-lg md:text-2xl"></i>
                            </span>
                        </div>

                        <h4 className='mt-1 px-2 text-sm md:text-base font-medium text-gray-800'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>

                        <div className="flex justify-between px-2 mt-1 mb-2 text-sm md:text-base">
                            <span className='font-semibold'>{product.price} EGP</span>
                            <span className='text-yellow-400'>{product.ratingsAverage} <i className='fa fa-star'></i></span>
                        </div>

                        <button
                            onClick={() => addtoCart(product.id)}
                            className='w-full bg-green-500 hover:bg-green-600 text-white py-2 md:py-2.5 text-sm md:text-base font-semibold rounded-b-lg transition-all duration-300'
                        >
                            <i className="fa-solid fa-plus mr-2"></i> Add To Cart
                        </button>
                    </div>
                ))}
            </section>
        </>
    )
}
