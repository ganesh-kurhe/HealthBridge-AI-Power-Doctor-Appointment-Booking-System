import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div 
            id='speciality' 
            className='flex flex-col items-center gap-6 py-20 px-4 bg-gradient-to-b from-white to-blue-50 rounded-xl'
        >

            {/* Heading */}
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
                Browse Doctors by Speciality
            </h1>

            {/* Subtext */}
            <p className='sm:w-2/3 md:w-1/2 text-center text-base md:text-lg text-gray-600'>
                Explore a wide range of medical specialities and connect with the right doctor for your needs.
            </p>

            {/* Speciality Cards */}
            <div className='flex sm:justify-center gap-8 pt-8 w-full overflow-x-auto scrollbar-hide'>

                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        key={index}
                        className='flex flex-col items-center cursor-pointer flex-shrink-0 group'
                    >

                        {/* Card */}
                        <div className='bg-white p-4 sm:p-6 rounded-full shadow-md group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-blue-100 to-purple-100'>

                            <img 
                                className='w-14 sm:w-20' 
                                src={item.image} 
                                alt="" 
                            />
                        </div>

                        {/* Text */}
                        <p className='mt-3 text-sm sm:text-base font-medium text-gray-700 group-hover:text-purple-600 transition'>
                            {item.speciality}
                        </p>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu