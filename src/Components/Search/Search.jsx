import { useContext } from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import useAllProduct from '../../Hooks/useAllProduct';

export default function Search() {
  const { search } = useContext(UserContext);
  const { addToWishList, wish, deleteFromWish } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  async function addWish(id) {
    let { data } = await addToWishList(id);
    toast.loading('Adding Product To WishList');
    setTimeout(() => {
      if (data?.status === 'success') {
        toast.dismiss();
        toast.success(data?.message);
      }
    }, 800)
  }

  async function deleteWish(id) {
    let { data } = await deleteFromWish(id);
    toast.loading('Removing Product From WishList');
    setTimeout(() => {
      if (data?.status === 'success') {
        toast.dismiss();
        toast.success(data?.message)
      }
    }, 800)
  }

  async function addCart(id) {
    let { data } = await addToCart(id);
    toast.loading('Adding Product To Cart');
    setTimeout(() => {
      if (data.status === 'success') {
        toast.dismiss()
        toast.success(data?.message);
      }
    }, 800)
  }

  const { data, isLoading } = useAllProduct();
  const filter = data?.data?.data?.filter(product => product?.title?.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader text-4xl" />
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-4 py-8 mx-auto max-w-[1400px]">
      {filter && filter.length > 0 ? filter.map((product) => (
        <div key={product.id} className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:scale-[1.05] transition-transform duration-300">
          <Link to={`/productDetailes/${product.id}/${product.category.name}`}>
            <img loading="lazy" src={product.imageCover} className="w-full h-48 object-cover" alt={product.title} />
          </Link>

          {/* Wishlist Button */}
          {(wish?.data || []).some(p => p.id === product.id) ?
            <button onClick={() => deleteWish(product.id)} className='absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-green-100 transition'>
              <i className="fa-solid fa-heart text-green-500"></i>
            </button>
            :
            <button onClick={() => addWish(product.id)} className='absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-green-100 transition'>
              <i className="fa-regular fa-heart text-green-500"></i>
            </button>
          }

          <div className="p-4 flex flex-col justify-between h-[200px] sm:h-[250px] md:h-[280px]">
            <div>
              <h3 className='text-green-500 font-medium'>{product.category.name}</h3>
              <h4 className='text-gray-800 mt-1'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className='font-semibold'>{product.price} EGP</span>
              <span className='flex items-center gap-1 text-yellow-400'>
                {product.ratingsAverage} <i className='fa fa-star'></i>
              </span>
            </div>

            <button onClick={() => addCart(product.id)} className='mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition'>
              <i className="fa-solid fa-plus mr-1"></i> Add To Cart
            </button>
          </div>
        </div>
      )) : (
        <div className='col-span-12 text-center'>
          <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>No Product Found with this Name.</h1>
          <img src="error-B1_ZqxX0.svg" alt="No Product" className="mx-auto max-w-xs" />
        </div>
      )}
    </section>
  )
}
