import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-6 my-20 px-4 md:px-10 bg-gradient-to-b from-white to-purple-50 py-16 rounded-xl'>

            {/* Heading */}
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
                Top Rated Doctors Near You
            </h1>

            {/* Subtext */}
            <p className='sm:w-2/3 md:w-1/2 text-center text-base md:text-lg text-gray-600'>
                Discover highly rated and experienced doctors available for instant booking.
            </p>

            {/* Doctors Grid */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-10'>

                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-3 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden'
                    >

                        {/* Image */}
                        <div className='bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex justify-center'>
                            <img 
                                className='w-24 h-24 object-cover rounded-full border-4 border-white shadow-md group-hover:scale-110 transition duration-300'
                                src={item.image} 
                                alt="" 
                            />
                        </div>

                        {/* Content */}
                        <div className='p-4 text-center'>

                            {/* Availability */}
                            <div className={`flex justify-center items-center gap-2 text-xs mb-2 ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                {item.available ? 'Available' : 'Not Available'}
                            </div>

                            {/* Name */}
                            <p className='text-base font-semibold text-gray-800 group-hover:text-purple-600 transition'>
                                {item.name}
                            </p>

                            {/* Speciality */}
                            <p className='text-sm text-gray-500'>
                                {item.speciality}
                            </p>

                            {/* Rating (fake UI for better UX) */}
                            <div className='flex justify-center gap-1 mt-2 text-yellow-400 text-sm'>
                                ★ ★ ★ ★ ☆
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button */}
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='mt-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-110 hover:shadow-pink-400/40 transition-all duration-300'
            >
                View All Doctors
            </button>

        </div>
    )
}

export default TopDoctors