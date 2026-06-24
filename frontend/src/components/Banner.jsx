import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 shadow-xl overflow-hidden relative'>

            {/* Glow Effect */}
            <div className='absolute w-[300px] h-[300px] bg-pink-400 opacity-30 blur-3xl rounded-full top-0 right-10'></div>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-10 md:py-16 lg:py-20 z-10'>

                {/* Heading (same text, better styling) */}
                <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                    <p>Book Appointment</p>
                    <p className='mt-3'>
                        With <span className='bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent'>100+ Trusted Doctors</span>
                    </p>
                </div>

                {/* Button (same text, improved UI) */}
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                    className='mt-6 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-300/50 hover:scale-110 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-400 hover:text-white transition-all duration-300'
                >
                    Create account
                </button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[400px] relative z-10'>
                <img 
                    className='w-full max-w-md ml-auto transition-transform duration-500 hover:scale-105 drop-shadow-lg' 
                    src={assets.appointment_img} 
                    alt="" 
                />
            </div>
        </div>
    )
}

export default Banner