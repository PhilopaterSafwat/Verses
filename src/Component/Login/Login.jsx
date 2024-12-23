import React, { useEffect } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    let navigate = useNavigate()
    useEffect(() => {

        if (localStorage.getItem("Authorization")) {
            navigate('/adminpanel')
        }
    }, [])

    async function handleLogin(values) {


        try {
            let { data } = await axios.post(`https://verse-api-taupe.vercel.app/auth/login`, values)
            if (data.token) {
                navigate("/adminpanel")
                localStorage.setItem("Authorization", data.token)
            }
        } catch (error) {
            console.log(error);
        }

    }
    function validateForm(values) {
        let errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors

    }
    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, validate: validateForm
        , onSubmit: handleLogin
    })
    return <>
        <div className="main main-bg-color h-screen flex items-center">
            <div className=" min-w-[250px] max-w-[500px] w-4/5 secound-bg-color p-10 py-20 rounded-md mx-auto">
                <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Philopater.safwat@gmail.com" />
                        {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3" role="alert">
                            {formik.errors.email}
                        </div>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3" role="alert">
                            {formik.errors.password}
                        </div>}
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>

    </>
}

