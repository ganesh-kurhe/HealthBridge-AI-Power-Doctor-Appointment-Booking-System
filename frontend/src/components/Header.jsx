import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl px-6 md:px-10 lg:px-20 shadow-xl overflow-hidden'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 md:py-[10vw] z-10'>
                
                {/* Heading */}
                <p className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight'>
                    Your Health, <br />
                    <span className='bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent'>
                        One Click Away
                    </span>
                </p>

                {/* Sub Text */}
                <div className='flex flex-col md:flex-row items-center gap-4 text-white text-base font-light'>
                    <img className='w-32 rounded-full shadow-md' src={assets.group_profiles} alt="" />
                    <p className='text-white/90'>
                        Find trusted doctors, compare profiles, and book appointments instantly — all in one place.
                    </p>
                </div>

                {/* Trust Line */}
                <p className='text-white/80 text-sm'>
                    1000+ Verified Doctors • Easy Booking • Instant Confirmation
                </p>

                {/* Button */}
                <a 
                    href='#speciality' 
                    className='flex items-center gap-3 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-300/50 hover:scale-110 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-400 hover:text-white transition-all duration-300'
                >
                    Find Doctors Near You 
                    <img className='w-4' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative flex items-end justify-center'>
                
                {/* Glow Background Effect */}
                <div className='absolute w-[400px] h-[400px] bg-pink-400 opacity-30 blur-3xl rounded-full top-10 right-10'></div>

                <img 
                    className='w-full md:absolute bottom-0 h-auto rounded-lg transition-transform duration-500 hover:scale-105' 
                    src={assets.header_img} 
                    alt="" 
                />
            </div>
        </div>
    )
}

export default Header