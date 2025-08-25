import axios from 'axios'
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Brand() {


    let [allBrand, setallBrand] = useState(null)
    function getAllOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then(({ data }) => setallBrand(data.data)
            )
            .catch((err) => err)
    }

    useEffect(() => {
        getAllOrders();
    }, []);
    if (!allBrand) {
        return <>

            <div className="container d-flex justify-content-center">
                <Loading />
            </div>
        </>
    }

    return (
        <>
            <Helmet>
                <title>Fresh Brands</title>
            </Helmet>

            <div className="grid  md:grid-cols-2 xl:grid-cols-6 gap-5 m-auto">

                {allBrand?.map((product) =>
                    <Link key={product._id}>
                        <div className="mx-2 md:col-span-4 group  lg:col-span-3 xl:col-span-1 overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className=" object-cover rounded-lg mb-3" src={product.image} alt='' />
                            <p className=' text-center'>{product.name}</p>


                        </div>
                    </Link>

                )}</div>
        </>


    )
}