import  { useContext} from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import useAllProduct from '../../Hooks/useAllProduct';
export default function Search() {
  let { search } = useContext(UserContext);
  const { addToWishList, wish, deleteFromWish } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  async function addWish(id) {
    let { data } = await addToWishList(id);

    toast.loading('Adding Product To WishList');
    setTimeout(() => {
      if (data?.status == 'success') {
        toast.dismiss();
        toast.success(data?.message);
      }
    }, 800)
  }
  async function deleteWish(id) {
    let { data } = await deleteFromWish(id);
    toast.loading('Removing Product From WishList');
    setTimeout(() => {
      if (data?.status == 'success') {
        toast.dismiss();
        toast.success(data?.message)
      }
    }, 800)
  }

  async function addCart(id) {
    let { data } = await addToCart(id);
    toast.loading('Adding Product To Cart');
    setTimeout(() => {
      if (data.status == 'success') {
        toast.dismiss()
        toast.success(data?.message);
      }
    }, 800)
  }
  let { data, isLoading } = useAllProduct();
  let filter = data?.data?.data?.filter((product) => (product?.title?.toLowerCase()).includes(search.toLowerCase()));

  if (isLoading) {
    return <div className="flex justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white items-center">
      <span className="loader text-4xl" />

    </div>
  }
  return (
    <>
      <section className="grid grid-cols-12 justify-center gap-5 w-[90%] m-auto">
        {
          filter.length > 0?
          filter?.map((product) =>
            <div key={product.id} className="relative group col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  overflow-hidden  hover:scale-[1.059] duration-300 rounded-lg shadow-lg p-3 my-2 border-gray-400">
              <Link to={`/productDetailes/${product.id}/${product.category.name}`}>
                <img loading='lazy' src={product.imageCover} className='w-full' alt="" />
              </Link>
              {(wish?.data != "") ? wish?.data?.map((products) => (products.id == product.id) ?
                <button onClick={() => deleteWish(product.id)} className='z-10 absolute group-hover:right-6  transition-all duration-[.4s] top-6 -right-10 p-0 bg-transparent'><i className="fa-solid fa-heart text-2xl  text-green-400" /> </button>
                :
                <button onClick={() => addWish(product.id)} className='absolute group-hover:right-6  transition-all duration-[.4s] top-6 -right-10 p-0 bg-transparent'><i className="fa-regular fa-heart text-2xl  text-green-400" />  </button>
              )
                :
                <button onClick={() => addWish(product.id)} className='absolute group-hover:right-6  transition-all duration-[.4s] top-6 -right-10 p-0 bg-transparent'><i className="fa-regular fa-heart text-2xl  text-green-400" />  </button>
              }
              <h3 className='text-green-400 text-left px-2'  >{product.category.name}</h3>
              <h4 className='text-left px-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>
              <div className="flex justify-between">
                <span className='p-2'>{product.price} EGP</span>
                <span className='p-2'>{product.ratingsAverage} <i className='fa fa-star text-yellow-300' ></i></span>
              </div>
              <button onClick={() => addCart(product.id)} className='relative top-[150px] text-sm md:text-base hover:bg-green-400 hover:text-white group-hover:top-0 transition-all duration-[0.4s] w-full bg-transparent border-green-400 text-teal-700 mt-2'><i className="fa-solid fa-plus"></i> Add To Card</button>
            </div>
          )
          :
          <div className='col-span-12 '>
            <h1 className='text-4xl'>No Product Found with this Name .</h1>
            <div className="flex justify-center">
            <img src="error-B1_ZqxX0.svg" alt="" />
            </div>
          </div>
        }
      </section>

    </>
  )
}

