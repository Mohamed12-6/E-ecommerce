import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function CategoryDetails() {
  const { id, category } = useParams();
  const { Best, addWishlist, deleteFromWish } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  async function addWish(productId) {
    const { data } = await addWishlist(productId);
    toast.loading('Adding Product To WishList');
    setTimeout(() => {
      toast.dismiss();
      data?.status === 'success' && toast.success(data?.message);
    }, 800);
  }

  async function deleteWish(productId) {
    const { data } = await deleteFromWish(productId);
    toast.loading('Removing Product From WishList');
    setTimeout(() => {
      toast.dismiss();
      data?.status === 'success' && toast.success(data?.message);
    }, 800);
  }

  async function addCart(productId) {
    const { data } = await addProductToCart(productId);
    toast.loading('Adding Product To Cart');
    setTimeout(() => {
      toast.dismiss();
      data.status === 'success' && toast.success(data?.message);
    }, 800);
  }

  function getRelatedProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const filterProduct = data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProduct(filterProduct);
      })
      .catch(console.log);
  }

  useEffect(() => {
    getRelatedProduct();
  }, [category]);

  return (
    <>
      <Helmet>
        <title>{category} | Category Details</title>
      </Helmet>

      <div className="w-[90%] mx-auto mt-10 mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center text-green-600">
          {category} Products
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {relatedProduct.length > 0 ? (
            relatedProduct.map((product) => {
              const isInWishlist = Best?.data?.some(
                (wishItem) => wishItem.id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="relative group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      loading="lazy"
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-60 sm:h-64 md:h-72 lg:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    onClick={() =>
                      isInWishlist
                        ? deleteWish(product.id)
                        : addWish(product.id)
                    }
                    className="absolute top-4 right-4 text-green-400 hover:scale-110 transition-transform duration-300"
                  >
                    <i
                      className={`fa-${
                        isInWishlist ? 'solid' : 'regular'
                      } fa-heart text-2xl`}
                    ></i>
                  </button>

                  <div className="p-4">
                    <h3 className="text-green-500 text-sm font-medium">
                      {product.category.name}
                    </h3>
                    <h4 className="font-semibold text-gray-700 mt-1 line-clamp-2">
                      {product.title}
                    </h4>

                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="font-semibold text-gray-600">
                        {product.price} EGP
                      </span>
                      <span className="text-yellow-500 flex items-center gap-1">
                        {product.ratingsAverage}
                        <i className="fa fa-star"></i>
                      </span>
                    </div>

                    <button
                      onClick={() => addCart(product.id)}
                      className="w-full mt-4 py-2 text-center border border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                    >
                      <i className="fa-solid fa-cart-plus mr-1"></i> Add To Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-gray-100 mt-6 p-6 rounded-lg text-center">
              <p className="text-xl font-medium text-gray-600">
                Oops! No products in this category. Choose another one.
              </p>
              <Link to="/category">
                <button className="mt-5 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md transition-all">
                  Back To Categories
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
