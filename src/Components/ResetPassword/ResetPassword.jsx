import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function ResetPassword() {


    let navigate=useNavigate();

    let [apierror,setapierror]=useState("")

    let [isLoading,setisLoading]=useState(false)


    function handleLogin(formvalues) {
        setisLoading(true)

        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",formvalues)
        .then(({data})=>{
            setapierror(data?.message)

// console.log(data)
setTimeout(() => {
    setisLoading(false)
    navigate("/login")
}, 1000);

        })
        .catch((err)=>{
            setisLoading(false)

            console.log(err)
// console.log(err?.response?.data?.message)
        })
        // console.log(formvalues)
    }



    let validationSchema=yup.object().shape({

        email:yup
        .string()
        .email("Enter valid email")
        .required("Email is Required"),

        newPassword:yup
        .string()
        .required("password is Required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,"Password contains lowercase, uppercase, digit, symbol, 8-16 chars, no spaces."),
        


    })

    let formik=useFormik({
        initialValues:{
            email:"",
            newPassword:"",
        },
        validationSchema
        ,
        onSubmit:handleLogin
    })
    return (
        <>
            <h1 className='text-center text-green-400  mb-5 text-3xl font-bold'>
            <i className="fa-regular fa-circle-user mr-3 text-green-500"></i>
                Reset Password</h1>



            <div className="max-w-md mx-auto">

                {apierror?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apierror}</div>:null}


            <form onSubmit={formik.handleSubmit}>





                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address : </label>
                </div>


                {formik.errors.email&&formik.touched.email ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.email}
                </div>:null}



                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="newPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your newPassword :</label>
                </div>

                
                {formik.errors.newPassword&&formik.touched.newPassword?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {formik.errors.newPassword}
                </div>:null}



 

                <div className='flex items-center '>

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading?<i className="fa fa-spinner fa-spin"></i>: "Login"}
                </button>


                </div>
            </form>

            </div>

        </>


    )
}

