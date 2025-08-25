import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function AllOrders() {

    const [orders, setOrders] = useState(null)

    const { userLogin, setuserLogin } = useContext(UserContext)

    const { id } = jwtDecode(userLogin)
    // console.log(id)

    async function getUsersOrders() {
        const options = {
            // url:`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`,
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: 'GET',
        }

        const { data } = await axios.request(options)
        setOrders(data)
        // console.log(data)
    }

    useEffect(() => {
        getUsersOrders()
    }, [])


    return (
        <>
            <Helmet>
    <title> Orders</title>
  </Helmet>
            {
                orders ? <section>
                    {orders.map((order) => <div key={order.id} className='order p-4 border-2 border-gray-500 rounded-lg border-opacity-25 '>
                        <header className='flex justify-between items-center'>
                            <div>
                                <h2>Orders ID</h2>
                                <span>#{order.id}</span>
                            </div>

                            <div>
                                {order.isPaid ?
                                    <span className='inline-block px-3 py-1 mx-2 bg-lime-500 text-white font-semibold'>
                                        غير مدفوع
                                    </span>
                                    :
                                    <span className='inline-block px-3 py-1 mx-2 bg-blue-500 text-white font-semibold'>
                                        قيد التوصيل
                                    </span>
                                }

                                {order.isDelivered ? <span className='inline-block px-3 py-1 mx-2 bg-lime-500 text-white font-semibold'>
                                    تم الاستلام
                                </span> : <span className='inline-block px-3 py-1 mx-2 bg-blue-500 text-white font-semibold'>
                                    قيد التوصيل
                                </span>
                                }
                            </div>
                        </header>

                        <div className='grid mt-4  md-gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>

                            {order.cartItems.map((product) =>

                                <div key={product._id} className='product-item mt-3 mx-1 border-2 border-gray-400 border-opacity-30 p-4 rounded-lg'>
                                    <img src={product.product.imageCover} alt={product._id} className='w-full' />

                                    <h3 className='font-bold text-lg line-clamp-2'>
                                    <Link key={product._id} to={`/productdetails/${product.product.id}/${product.product.category.name}`}>
                                    {product.product.title}
                                        </Link>

                                    </h3>

                                    <div className='flex justify-between items-center'>
                                        <p><span className='font-medium'>Count : {product.count}</span></p>
                                        <span>{product.price} L.E</span>
                                    </div>
                                </div>
                            )}
                        </div>


                        <p className='m-2 text-gray-600 font-bold'>Your Total Order Price is <span>{order.totalOrderPrice}</span> L.E</p>
                    </div>)}



                </section> : <Loading />
            }
        </>
    )
}
