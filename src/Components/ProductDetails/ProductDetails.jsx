import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    const { addProductToCart } = useContext(CartContext);
    const [productDetails, setProductDetails] = useState(null);
    const [Relatedproduct, setRelatedproduct] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const { id, category } = useParams();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    const getProductDetails = (id) => {
        setisLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                setProductDetails(data.data);
                setisLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setisLoading(false);
            });
    };

    const getRelatedProduct = (category) => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                const related = data.data.filter((product) => product.category.name === category);
                setRelatedproduct(related);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getProductDetails(id);
        getRelatedProduct(category);
    }, [id, category]);

    return (
        <>
            <Helmet>
                <title>Fresh Product</title>
            </Helmet>

            {isLoading ? <Loading /> : (
                <>
                    {/* Product Main Section */}
                    <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden p-4 md:p-6 mt-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Slider */}
                            <div className="w-full md:w-1/3 relative">
                                <Slider {...settings}>
                                    {productDetails?.images.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Product Image ${index}`}
                                            className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-lg"
                                        />
                                    ))}
                                </Slider>
                            </div>

                            {/* Product Info */}
                            <div className="md:w-2/3 flex flex-col justify-between">
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{productDetails?.category.name}</h1>
                                <p className="text-sm md:text-base text-gray-600 mb-4">
                                    {productDetails?.title.split(" ").splice(0, 2).join(" ")}
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <span className="text-2xl md:text-3xl font-bold text-gray-900">{productDetails?.price} EGP</span>
                                    <span className="bg-green-500 text-white text-sm md:text-base font-semibold px-2.5 py-0.5 rounded">
                                        {productDetails?.ratingsAverage} ★
                                    </span>
                                </div>

                                <button
                                    onClick={() => addProductToCart(id)}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded transition duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-8 px-2 md:px-6">
                        {Relatedproduct?.map((product) => (
                            <Link key={product.id} to={`/productdetails/${product.id}/${product.category.name}`}>
                                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition duration-300">
                                    <img
                                        src={product.imageCover}
                                        alt="Product Image"
                                        className="w-full h-48 md:h-56 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-medium text-gray-900">{product.category.name}</h2>
                                        <p className="text-sm md:text-base text-gray-700 mb-2">
                                            {product.title.split(" ").splice(0,2).join(" ")}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-semibold text-gray-900">{product.price} EGP</p>
                                            <p className="text-sm font-medium text-yellow-500">{product.ratingsAverage} ★</p>
                                        </div>
                                        <button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-1.5 md:py-2 rounded transition duration-300">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
