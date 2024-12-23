import React, { useEffect, useRef } from 'react'
import style from './AddVerse.module.css'
import image from './../../assets/freepik__expand__14204.png'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'



export default function AddVerse() {
    const inputRef = useRef(null)
    async function addVerseApi(value) {
        console.log(inputRef.current.value);

        const { data } = await axios.post(`https://verse-api-taupe.vercel.app`, { verse: inputRef.current.value })
        console.log(data);
        toast.success("Wait for Accept")
        inputRef.current.value = ""
    }
    useEffect(() => {
        function foucsX() {
            inputRef.current.focus()
        }
        foucsX()
    }, [])

    return <>
        <Toaster />
        <div className='bg-gray-900 h-screen text-white' >
            <div className="h-screen w-full relative flex items-center justify-center">
                <div className='h-1/2 bg-blue-900 absolute top-0 left-0 right-0 z-0'>
                    <div className='bg-black h-full w-full absolute top-0 opacity-40'></div>
                    <img src={image} alt="" className='w-full h-full object-cover lg:object-[0px_60%] object-[90%]' />
                </div>
                <div className='Ayaat w-4/5 lg:w-1/2 secound-bg-color relative z-20 rounded-md p-5 flex flex-col gap-10'>
                    <textarea name="" id="" ref={inputRef} className='main-bg-color p-5 rounded-md text-right text-2xl lg:text-3xl outline-none'></textarea>
                    <button onClick={() => { addVerseApi() }} className='third-bg-color p-3 rounded-md transition-all'> ADD Verse</button>
                </div>
            </div>

        </div>

    </>
}

