import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {

    let { addProductToCart,setCart } = useContext(CartContext)

    let [loadin,setLoading]=useState(false)
    let [cuurentProductId,setcuurentProductId]=useState(false)

    function getAllProduct() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    let { data, isLoading, isError } = useQuery({
        queryKey: ['AllProducts'],
        queryFn: getAllProduct,
    });

    async function AddToCart(productID) {
        setLoading(true)
        setcuurentProductId(productID)
        let res = await addProductToCart(productID)
        if (res.data.status==="success") {
            setLoading(false)
            setCart(res.data)
            // console.log('Added')
            toast.success(res.data.message ,{
                duration: 4000,
            })
        }
        else{
            setLoading(false)

            toast.error(res.data.message,{
                duration: 4000,
            })

            // console.log('Not Added')
        }
        // console.log(res)
    }



    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching products.</div>;
    }

    return (
        <div className='grid md:grid-cols-2 xl:grid-cols-6'>
            {data?.data?.data.map((product) => (
                <div key={product.id} className='Reproduct'>
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                        <div className=" mx-auto mt-11 px-3 transform overflow-hidden rounded-lg bg-white duration-300 hover:scale-105">
                            <img className="w-full" src={product.imageCover} alt="Product Image" />
                            <div className="products p-4">
                                <h2 className="mb-2 text-lg font-medium text-gray-900">{product.category.name}</h2>
                                <p className="mb-2 text-base text-gray-700">{product.title.split(" ").splice(0, 2).join(" ")}</p>
                                <div className="flex items-center justify-between">
                                    <p className="mr-2 text-lg font-semibold text-gray-900">{product.price} EGP</p>
                                    <p className="text-base font-medium text-gray-500">{product.ratingsAverage}<i className='fas fa-star text-yellow-200'></i></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <button onClick={()=>AddToCart(product.id)} className='btn'>{cuurentProductId===product.id&&loadin?<i className="fa fa-spinner fa-spin"></i>:"Add to cart"}</button>
                </div>
            ))}
        </div>
    );
}