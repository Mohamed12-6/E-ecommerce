import { Link } from "react-router-dom"
import useAllCategory from "../../Hooks/useAllCategory"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function Categories() {

    let { data, isLoading } = useAllCategory()
    console.log(data?.data?.data)

    if (isLoading) {
        return <>

            <div className="container d-flex justify-content-center">
                <Loading />
            </div>
        </>
    }
    return (
        <>
            <Helmet>
                <title>Fresh Categories</title>
            </Helmet>
            <div className="grid  md:grid-cols-2 xl:grid-cols-6 gap-5 m-auto">

                {data?.data?.data?.map((cate) =>
                    <Link key={cate._id} to={`/categoryDetails/${cate._id}/${cate.name}`}>
                        <div className="mx-2 md:col-span-4 group  lg:col-span-3 xl:col-span-1 overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-lg h-[380px] md:h-[250px] w-full" src={cate.image} alt='' />
                            <p className=' text-center'>{cate.name}</p>


                        </div>
                    </Link>

                )}</div>
        </>

    )
}
