import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8'>

      {/* TITLE */}
      <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8'>
        All Doctors
      </h1>

      {/* GRID */}
      <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

        {doctors.map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer group'
          >

            {/* IMAGE */}
            <div className='bg-[#EAEFFF] group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 flex justify-center'>
              <img 
                className='w-36 h-36 object-cover p-4 transition-transform duration-500 group-hover:scale-105' 
                src={item.image} 
                alt="" 
              />
            </div>

            {/* CONTENT */}
            <div className='p-5 text-center'>
              <p className='text-lg md:text-xl font-semibold text-gray-800'>
                {item.name}
              </p>
              <p className='text-gray-500 text-sm md:text-base'>
                {item.speciality}
              </p>

              {/* AVAILABILITY */}
              <div className='mt-4 flex items-center justify-center gap-2 text-sm md:text-base'>

                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available}
                  className='w-4 h-4 accent-green-500 cursor-pointer'
                />

                <p className={`font-medium ${item.available ? 'text-green-600' : 'text-gray-400'}`}>
                  {item.available ? 'Available' : 'Not Available'}
                </p>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default DoctorsList