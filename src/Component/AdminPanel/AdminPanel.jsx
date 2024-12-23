import React, { useEffect, useState } from 'react'
import style from './AdminPanel.module.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminPanel() {
    const [versesData, setversesData] = useState([])
    async function dataApi() {
        const { data } = await axios.get(`https://verse-api-taupe.vercel.app/verse/notAccept`)
        setversesData(data.verses);
    }
    async function DeleteData(id) {
        const { data } = await axios.delete(`https://verse-api-taupe.vercel.app/verse/deleteByid`, {
            data: { id }
        })
        dataApi()
        toast.success(data.message)
    }
    async function updateData(id) {
        const { data } = await axios.put(`https://verse-api-taupe.vercel.app/verse/UpdateByid`, { id })
        dataApi()
        toast.success(data.message)
    }
    useEffect(() => {
        dataApi()
    }, [])
    return <>
        <Toaster />
        <div className="main min-h-screen main-bg-color flex items-center text-white py-5">
            <div className=" min-w-[250px] md:max-w-[800px] w-4/5 secound-bg-color p-5 rounded-md mx-auto flex flex-col gap-5">
                <h1 className='text-5xl text-center'>Verses</h1>
                <div className='AllAyat w-full flex flex-col gap-3'>
                    {versesData && versesData.map((verse, index) => {
                        return (
                            <div key={verse._id} className='aya main-bg-color rounded-md p-5 flex flex-col gap-3'>
                                <h1 className='text-xl lg:text-3xl text-right lg:leading-relaxed'>{verse.verse}</h1>
                                <div className="buttons flex flex-col md:flex-row">
                                    <button onClick={() => { updateData(verse._id) }} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accept</button>
                                    <button onClick={() => { DeleteData(verse._id) }} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
}

