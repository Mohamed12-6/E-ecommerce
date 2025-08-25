import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {  useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function ForgetPassword() {


    let navigate=useNavigate();

    let [apierror,setapierror]=useState("")

    let [isLoading,setisLoading]=useState(false)



    function handleLogin(formvalues) {
        setisLoading(true)

        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",formvalues)
        .then(({data})=>{
            // console.log(data)
            setapierror(data.message)

            setTimeout(() => {
                if (data?.statusMsg==="success") {
                    setisLoading(false)
                    navigate("/resetcode")
                }
            }, 1000);
        })
        .catch((err)=>{
            setisLoading(false)
            console.log(err)
        })
        console.log(formvalues)
    }



    let validationSchema=yup.object().shape({

        email:yup
        .string()
        .email("Enter valid email")
        .required("Email is Required"),
    })

    let formik=useFormik({
        initialValues:{
            email:"",
        },
        validationSchema
        ,
        onSubmit:handleLogin
    })
    return (
        <>
        <Helmet>Forget Password</Helmet>
            <h1 className='text-center text-green-400  mb-5 text-3xl font-bold'>
            <i className="fa-regular fa-circle-user mr-3 text-green-500"></i>

                Forget Password</h1>


            <div className="max-w-md mx-auto">

                {apierror?<div className="p-4 mb-4 text-sm text-green-500 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
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






                <div className='flex items-center '>

                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {isLoading?<i className="fa fa-spinner fa-spin"></i>: "Submit"}
                </button>

            
                </div>

            </form>

            </div>

        </>


    )
}

