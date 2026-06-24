import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center my-16 px-4 md:px-10'>

            {/* Heading */}
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                Related Doctors
            </h1>

            <p className='text-gray-500 text-base mt-2 text-center max-w-md'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Cards */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10'>

                {relDoc.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-3 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden'
                    >

                        {/* Image */}
                        <div className='bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex justify-center'>
                            <img
                                className='w-24 h-24 object-cover rounded-full border-4 border-white shadow group-hover:scale-110 transition'
                                src={item.image}
                                alt=""
                            />
                        </div>

                        {/* Content */}
                        <div className='p-4 text-center'>

                            {/* Availability */}
                            <div className={`flex justify-center items-center gap-2 text-sm mb-2 ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                {item.available ? 'Available' : 'Not Available'}
                            </div>

                            {/* Name */}
                            <p className='text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition'>
                                {item.name}
                            </p>

                            {/* Speciality */}
                            <p className='text-sm text-gray-500'>
                                {item.speciality}
                            </p>

                            {/* Rating */}
                            <div className='flex justify-center gap-1 mt-2 text-yellow-400 text-sm'>
                                ★ ★ ★ ★ ☆
                            </div>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default RelatedDoctors