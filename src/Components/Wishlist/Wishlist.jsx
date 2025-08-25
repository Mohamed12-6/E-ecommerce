import { useContext, useEffect } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function WishList() {
    const { getWishList, wishlistItems, setWishlistItems, addWishlist ,deleteFromWish } = useContext(WishlistContext);

    async function displayWish() {
        let { data } = await getWishList();
        // console.log(data?.data);
        setWishlistItems(data.data);
    }

    async function addtoWishlist(id) {
        let { data } = await addWishlist(id);
        // console.log(data.data);
        if (data.message === "success") {
            toast.success(data?.message);
        }
    }

    async function deletewislist(id) {
        toast.loading('Removing Product From WishList');

        let { data } = await deleteFromWish(id);
        // console.log(data.data);
        if (data?.message === "success") {
            toast.dismiss();
            toast.success(data?.message)
        }    
    }
    useEffect(() => {
        displayWish();
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto w-[90%] m-auto shadow-md sm:rounded-lg ">
                <h1 className='mb-7 text-green-400 col-span-12 text-center'>My WishList</h1>
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((product) => (
                        <div key={product.id} className="flex flex-wrap items-center p-3 justify-between">
                            <div className="w-[100%] lg:w-[55%] flex flex-nowrap items-center">
                                <div className="w-[35%] md:w-[15%] lg:w-[20%]">
                                    <img src={product.imageCover} alt={product.title} className='' />
                                </div>
                                <p className='pl-14 font-medium'>{product.title}</p>
                            </div>
                            <div className="flex w-[100%] lg:w-[40%] justify-between items-center">
                                <p className='font-medium'>{product.price} EGP</p>
                                <button onClick={() => addtoWishlist(product.id)} className="hover:bg-green-400 w-[40%] lg:w-[35%] text-sm hover:text-white transition-all duration-[0.4s] bg-transparent border-green-400 text-teal-700 mt-2">
                                    <i className="fa-solid fa-plus"></i> Add To Cart
                                </button>
                                <button onClick={()=>deletewislist(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
                        <span className="loader text-4xl" />
                    </div>
                )}
            </div>
        </>
    );
}