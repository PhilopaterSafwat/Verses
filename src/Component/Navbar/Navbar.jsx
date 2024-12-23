import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import cross from "./../../assets/freepik__adjust__91735.png"

export default function Navbar() {


    return <>
        <nav className=" border-gray-200 bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to={""} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={cross} className="h-14" alt="Bible Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Christian verses</span>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Link to={"login"} className="text-white hover:underline text-lg">Login</Link>
                    {localStorage.getItem("Authorization") && <Link to={"login"} onClick={()=>{localStorage.removeItem("Authorization")}} className="text-white hover:underline text-lg">Logut</Link>}
                </div>
            </div>
        </nav>
    </>
}

