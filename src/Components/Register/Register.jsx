import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Register() {



    let navigate=useNavigate();

    let [apierror,setapierror]=useState("")

    let [isLoading,setisLoading]=useState(false)

    let {setuserLogin} =useContext(UserContext)

    function handleRegister(formvalues) {
        setisLoading(true)

        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",formvalues)
        .then((resp)=>{
            if(resp?.data?.message==="success"){
                localStorage.setItem("ApiToken",resp.data.token)
                // console.log(resp.data.token)

                setuserLogin(resp.data.token)
                setisLoading(false)
                navigate("/login")
            }
// console.log(resp?.response?.data?.message)
        })
        .catch((err)=>{
            setisLoading(false)

            setapierror(err?.response?.data?.message)
// console.log(err?.response?.data?.message)
        })
        // console.log(formvalues)
    }



    let validationSchema=yup.object().shape({
        name:yup
        .string()
        .min(3, "Minimum Characters is 3")
        .max(20, "Maximum Characters is 20")
        .required("Name is required"),

        email:yup
        .string()
        .email("Enter valid email")
        .required("Email is Required"),

        phone: yup
        .string()
        .required("Number is required")
        .matches(/^01[1250][0-9]{8}$/, "Enter Egyptian number"),


        password:yup
        .string()
        .required("password is Required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,"Password contains lowercase, uppercase, digit, symbol, 8-16 chars, no spaces."),
        

        rePassword:yup
        .string()
        .required("Password is Required")
        .oneOf([yup.ref("password")], "Should be matches password")


    })

    let formik=useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        validationSchema
        ,
        onSubmit:handleRegister
    })
    return (
        <>
        <Helmet>Register</Helmet>
            <h1 className='text-center text-green-400 text-3xl font-bold mb-6'>Register Now </h1>



            <div className="max-w-md mx-auto">

                {apierror?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apierror}</div>:null}


            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
                </div>


                {formik.errors.name&&formik.touched.name ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.name}
                </div>:null}



                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address : </label>
                </div>


                {formik.errors.email&&formik.touched.email ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.email}
                </div>:null}


                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number :</label>
                </div>

                
                {formik.errors.phone&&formik.touched.phone ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.phone}
                </div>:null}



                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
                </div>

                
                {formik.errors.password&&formik.touched.password?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.password}
                </div>:null}



                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword :</label>
                </div>

                {formik.errors.rePassword&&formik.touched.rePassword ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.rePassword}
                </div>:null}

                <div className='flex items-center '>

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading?<i className="fa fa-spinner fa-spin"></i>: "Sign Up"}
                </button>

                <p className='px-3'>You have an account ?<span className='px-1 font-semibold'><Link to={"/login"}>Login Now</Link></span></p>
            
                </div>

            </form>

            </div>

        </>


    )
}
