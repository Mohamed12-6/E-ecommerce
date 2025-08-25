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

    const { addProductToCart } = useContext(CartContext)

    const { addWishlist } = useContext(WishlistContext);

    async function addtoWishlist(id) {
        let { data } = await addWishlist(id);
        toast.loading('Adding Product To Cart');
        setTimeout(() => {
            if (data.status == 'success') {
                toast.dismiss()
                toast.success(data?.message);
            }
        }, 800)
    }

    async function addtoCart(productId) {
        let { data } = await addProductToCart(productId);
        // console.log(data);
        toast.loading('Adding Product To Cart');
    
        setTimeout(() => {
            toast.dismiss();
            data.status === 'success' && toast.success(data?.message);
            data.status !== 'success' && toast.error('Failed to add product.');
        }, 800);
    }


    // console.log(data?.data?.data)
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
        
                <section className="grid md:grid-cols-2 xl:grid-cols-6">
            {
                data?.data?.data?.map((product) =>
                    <div key={product.id} className=" relative group mx-2 md:col-span-4 group  lg:col-span-3 xl:col-span-1  overflow-hidden  hover:scale-[1.059] duration-300 rounded-lg shadow-lg p-3 my-2 border-gray-400">
                        <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                            <img loading='lazy' src={product.imageCover} className='w-full' alt="" />
                        </Link>
                        <div className='flex justify-between items-center'>

                            <h3 className='text-green-400 text-left px-2'>{product.category.name}</h3>

                            <Link>
                                <span
                                    onClick={() => {
                                        addtoWishlist(product.id);
                                    }}
                                    className="text-center transition-all duration-[0.4s] hover:text-green-400 cursor-pointer"
                                >
                                    <i className="fa-solid fa-heart text-2xl text-gray-600 hover:text-green-400"></i>
                                </span>
                            </Link>
                        </div>

                        <h4 className='text-left px-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>
                        <div className="flex justify-between">
                            <span className='p-2'>{product.price} EGP</span>
                            <span className='p-2'>{product.ratingsAverage} <i className='fa fa-star text-yellow-300' ></i></span>
                        </div>
                        <button onClick={() => addtoCart(product.id)} className='relative top-[150px] text-sm md:text-base hover:bg-green-400 hover:text-white group-hover:top-0 transition-all duration-[0.4s] w-full bg-transparent border-green-400 text-teal-700 mt-2'><i className="fa-solid fa-plus"></i> Add To Card</button>
                    </div>
                )
            }
        </section>

        </>

    )
}


