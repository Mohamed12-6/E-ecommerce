import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Register() {

    const navigate = useNavigate();
    const [apiError, setApiError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { setUserLogin } = useContext(UserContext)

    function handleRegister(values) {
        setIsLoading(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            .then(resp => {
                if(resp?.data?.message === "success"){
                    localStorage.setItem("ApiToken", resp.data.token)
                    setUserLogin(resp.data.token)
                    setIsLoading(false)
                    navigate("/login")
                }
            })
            .catch(err => {
                setIsLoading(false)
                setApiError(err?.response?.data?.message)
            })
    }

    const validationSchema = yup.object().shape({
        name: yup.string().min(3,"Minimum Characters is 3").max(20,"Maximum Characters is 20").required("Name is required"),
        email: yup.string().email("Enter valid email").required("Email is required"),
        phone: yup.string().required("Number is required").matches(/^01[1250][0-9]{8}$/,"Enter Egyptian number"),
        password: yup.string().required("Password is required")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,"Password must have lowercase, uppercase, digit, symbol, 8-15 chars"),
        rePassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required")
    })

    const formik = useFormik({
        initialValues: { name:"", email:"", phone:"", password:"", rePassword:"" },
        validationSchema,
        onSubmit: handleRegister
    })

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className='text-center text-green-500 text-3xl font-bold mb-6'>Register Now</h1>

                    {apiError && <div className="p-3 mb-4 text-sm text-red-700 rounded-lg bg-red-100">{apiError}</div>}

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/** Name **/}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
                        </div>

                        {/** Email **/}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
                        </div>

                        {/** Phone **/}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>}
                        </div>

                        {/** Password **/}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
                        </div>

                        {/** Confirm Password **/}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="rePassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            {formik.touched.rePassword && formik.errors.rePassword && <p className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</p>}
                        </div>

                        {/** Submit **/}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-md font-medium transition-all duration-300 flex justify-center items-center"
                            >
                                {isLoading && <i className="fa fa-spinner fa-spin mr-2"></i>}
                                {isLoading ? "Signing Up..." : "Sign Up"}
                            </button>
                            <p className="text-sm text-gray-700 mt-2 sm:mt-0">
                                Already have an account? <Link to="/login" className="text-green-500 font-semibold hover:underline">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
