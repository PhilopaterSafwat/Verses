import React, { useEffect, useState } from 'react'
import image from './../../assets/freepik__expand__14204.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const useNav = useNavigate()
  const [Ayat, setAyat] = useState([])
  const [loading, setLoading] = useState(true);
  const [randwom, setRandwom] = useState(Math.floor(Math.random() * Ayat.length))
  const [lastRandIndex, setLastRandIndex] = useState(null)
  const getRandomVerse = () => {
    let newRandIndex = Math.floor(Math.random() * Ayat.length);
    while (newRandIndex === lastRandIndex) {
      newRandIndex = Math.floor(Math.random() * Ayat.length);
    }
    setRandwom(newRandIndex);
    setLastRandIndex(newRandIndex);
  }
  async function versesApi() {
    try {
      const { data } = await axios.get('http://verse-api-taupe.vercel.app/verse/Accepted');
      setAyat(data.verses);
      setRandwom(Math.floor(Math.random() * data.verses.length));
    } catch (err) {
      setError('Failed to fetch verses.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    versesApi()
  }, [])
  if (loading) {
    return <div>Loading...</div>;
  }
  return <>
    <div className='bg-gray-900 h-screen text-white' >
      <div className="h-screen w-full relative flex items-center justify-center">
        <div className='h-1/2 bg-blue-900 absolute top-0 left-0 right-0 z-0'>
          <div className='bg-black h-full w-full absolute top-0 opacity-40'></div>
          <img src={image} alt="" className='w-full h-full object-cover lg:object-[0px_60%] object-[90%]' />
        </div>
        <div className='Ayaat w-4/5 lg:w-1/2 secound-bg-color relative z-20 rounded-md p-10 lg:p-20 flex flex-col gap-10'>
          {/* <h1 className='text-2xl lg:text-4xl text-right lg:leading-relaxed'>"وَكَانَ الرَّبُّ مَعَ يُوسُفَ فَكَانَ رَجُلًا نَاجِحًا، وَكَانَ فِي بَيْتِ سَيِّدِهِ الْمِصْرِيِّ." (تك 39: 2).</h1> */}
          <h1 className='text-2xl lg:text-4xl text-right lg:leading-relaxed'>{Ayat[randwom].verse}</h1>
          <div className="buttons flex flex-col gap-3">
            <button className='third-bg-color p-3 rounded-md transition-all' onClick={() => { getRandomVerse() }}> Randowm Verse</button>
            <button className='third-bg-color p-3 rounded-md transition-all' onClick={() => { useNav('addVerse') }}> ADD Verse</button>
          </div>
        </div>
      </div>

    </div>
  </>
}

