import { Link } from "react-router-dom"
import useAllCategory from "../../Hooks/useAllCategory"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function Categories() {

  let { data, isLoading } = useAllCategory()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Fresh Categories</title>
      </Helmet>

      <div className="container mx-auto px-3 py-6">
        <h2 className="text-2xl font-semibold text-center mb-6">All Categories</h2>

        <div className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-6 
          gap-6">

          {data?.data?.data?.map((cate) => (
            <Link key={cate._id} to={`/categoryDetails/${cate._id}/${cate.name}`}>
              <div className="group overflow-hidden bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">

                {/* الصورة */}
                <img
                  className="rounded-t-2xl h-64 sm:h-56 md:h-52 lg:h-48 xl:h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={cate.image}
                  alt={cate.name}
                />

                {/* الاسم */}
                <p className="text-center text-gray-800 dark:text-gray-200 py-3 font-medium group-hover:text-green-600 transition-colors duration-300">
                  {cate.name}
                </p>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </>
  )
}
