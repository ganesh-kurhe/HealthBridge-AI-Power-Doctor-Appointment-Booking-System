import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='flex justify-center bg-gray-50 min-h-screen'>

      {/* CENTER CONTAINER */}
      <div className='w-full max-w-6xl px-4 md:px-8 py-8'>

        {/* ===== CARDS ===== */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

          {/* Doctors */}
          <div className='flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='p-4 bg-blue-100 rounded-full'>
              <img className='w-10' src={assets.doctor_icon} alt="" />
            </div>
            <div>
              <p className='text-3xl font-bold text-gray-800'>{dashData.doctors}</p>
              <p className='text-gray-500 text-sm'>Total Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className='flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='p-4 bg-purple-100 rounded-full'>
              <img className='w-10' src={assets.appointments_icon} alt="" />
            </div>
            <div>
              <p className='text-3xl font-bold text-gray-800'>{dashData.appointments}</p>
              <p className='text-gray-500 text-sm'>Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className='flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300'>
            <div className='p-4 bg-green-100 rounded-full'>
              <img className='w-10' src={assets.patients_icon} alt="" />
            </div>
            <div>
              <p className='text-3xl font-bold text-gray-800'>{dashData.patients}</p>
              <p className='text-gray-500 text-sm'>Patients</p>
            </div>
          </div>

        </div>

        {/* ===== LATEST BOOKINGS ===== */}
        <div className='bg-white mt-10 rounded-2xl shadow-md overflow-hidden'>

          {/* Header */}
          <div className='flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
            <img className='w-5' src={assets.list_icon} alt="" />
            <p className='text-lg font-semibold'>Latest Bookings</p>
          </div>

          {/* List */}
          <div className='divide-y'>
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (

              <div 
                key={index} 
                className='flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-all duration-200'
              >

                {/* Image */}
                <img className='w-12 h-12 rounded-full object-cover border' src={item.docData.image} alt="" />

                {/* Info */}
                <div className='flex-1'>
                  <p className='font-semibold text-gray-800'>{item.docData.name}</p>
                  <p className='text-sm text-gray-500'>
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status */}
                {item.cancelled ? (
                  <span className='px-4 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-4 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium'>
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='px-4 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600 transition'
                  >
                    Cancel
                  </button>
                )}

              </div>

            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard