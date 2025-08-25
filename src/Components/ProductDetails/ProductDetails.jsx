import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // عرض شريحة واحدة في جميع الشاشات
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    let { addProductToCart } = useContext(CartContext)
    const [productDetails, setProductDetails] = useState(null);
    const [Relatedproduct, setRelatedproduct] = useState([]);

    const [isLoading, setisLoading] = useState(false);

    let { id, category } = useParams();
    // console.log(id);

    function getProductDetails(id) {
        setisLoading(true)

        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                // console.log(data.data);
                setisLoading(false)
                setProductDetails(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getRelatedProduct(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                // console.log(allProducts);
                let relatedproducts = allProducts.filter((product) => product.category.name === category);
                setRelatedproduct(relatedproducts);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getProductDetails(id);
        getRelatedProduct(category);
    }, [id, category]);

    return (
        <>
            <Helmet>
                <title>Fresh Product</title>
            </Helmet>
            {isLoading ? <Loading /> : <>
                <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden" key={productDetails?.id}>
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="w-full md:w-1/3 p-4 ">
                            <Slider {...settings}>
                                {productDetails?.images.map((src, index) => (
                                    <img src={src} alt={`Product Image ${index}`} className="w-full h-auto object-cover rounded-lg" key={index} />
                                ))}
                            </Slider>
                            <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="md:w-2/3 p-6 relative">
                            <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{productDetails?.category.name}</h1>
                            <p className="text-sm text-gray-600 mb-4">{productDetails?.title.split(" ").splice(0, 2).join(" ")}</p>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl font-bold text-gray-900">{productDetails?.price} EGP</span>
                                <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{productDetails?.ratingsAverage} ★</span>
                            </div>

                            <div className="flex space-x-4">

                                <button onClick={() => addProductToCart(id)} className="flex-1 bg-green-200 hover:bg-green-300 text-green-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 xl:grid-cols-6'>
                    {Relatedproduct?.map((product) => (
                        <Link to={`/productdetails/${product.id}/${product.category.name}`} key={product.id}>
                            <div className="Reproduct mx-auto mt-11 px-3 transform overflow-hidden rounded-lg bg-white duration-300 hover:scale-105">
                                <img className="w-full" src={product.imageCover} alt="Product Image" />
                                <div className="products p-4">
                                    <h2 className="mb-2 text-lg font-medium text-gray-900">{product.category.name}</h2>
                                    <p className="mb-2 text-base text-gray-700">{product.title.split(" ").splice(0, 2).join(" ")}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="mr-2 text-lg font-semibold text-gray-900">{product.price} EGP</p>
                                        <p className="text-base font-medium text-gray-500">{product.ratingsAverage} <i className='fas fa-star text-yellow-200'></i></p>
                                    </div>
                                    <button className='btn'>Add to cart</button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </>}

        </>
    );
}