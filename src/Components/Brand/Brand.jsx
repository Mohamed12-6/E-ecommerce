import axios from 'axios'
import Loading from '../Loading/Loading'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Brand() {
  const [allBrand, setAllBrand] = useState(null)

  function getAllBrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => setAllBrand(data.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getAllBrands()
  }, [])

  if (!allBrand) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Fresh Brands</title>
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Our Brands
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {allBrand?.map((brand) => (
            <Link key={brand._id} to={`/brands/${brand._id}`}>
              <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center">
                <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
                  <img
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                    src={brand.image}
                    alt={brand.name}
                  />
                </div>
                <p className="text-center text-gray-800 dark:text-gray-100 font-semibold text-sm sm:text-base">
                  {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
