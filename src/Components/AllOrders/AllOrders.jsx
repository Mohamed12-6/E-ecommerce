import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function AllOrders() {
  const [orders, setOrders] = useState(null)
  const { userLogin } = useContext(UserContext)
  const { id } = jwtDecode(userLogin)

  async function getUsersOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      )
      setOrders(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUsersOrders()
  }, [])

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      {orders ? (
        <section className="p-4 space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order p-4 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-200"
            >
              {/* Header */}
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3">
                <div>
                  <h2 className="text-gray-700 font-semibold text-sm sm:text-base">
                    Order ID
                  </h2>
                  <span className="text-gray-500 text-sm break-all">#{order.id}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {order.isPaid ? (
                    <span className="px-3 py-1 text-sm rounded-lg bg-lime-500 text-white font-semibold">
                      مدفوع
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm rounded-lg bg-orange-500 text-white font-semibold">
                      غير مدفوع
                    </span>
                  )}

                  {order.isDelivered ? (
                    <span className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white font-semibold">
                      تم الاستلام
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white font-semibold">
                      قيد التوصيل
                    </span>
                  )}
                </div>
              </header>

              {/* Products Grid */}
              <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item p-3 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <img
                      src={product.product.imageCover}
                      alt={product._id}
                      className="w-full rounded-lg object-cover"
                    />

                    <h3 className="font-semibold text-sm sm:text-base mt-2 line-clamp-2">
                      <Link
                        key={product._id}
                        to={`/productdetails/${product.product.id}/${product.product.category.name}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {product.product.title}
                      </Link>
                    </h3>

                    <div className="flex justify-between items-center mt-2 text-sm sm:text-base">
                      <p className="text-gray-700">Count: {product.count}</p>
                      <span className="font-semibold text-gray-800">
                        {product.price} L.E
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <p className="mt-4 text-gray-700 font-semibold text-center sm:text-right">
                إجمالي الطلب:{" "}
                <span className="text-blue-600">{order.totalOrderPrice}</span> L.E
              </p>
            </div>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  )
}
