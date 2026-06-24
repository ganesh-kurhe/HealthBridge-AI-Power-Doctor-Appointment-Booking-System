import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='flex justify-center bg-gray-50 min-h-screen'>

      {/* CENTER CONTAINER */}
      <div className='w-full max-w-6xl px-4 md:px-8 py-8'>

        {/* Title */}
        <p className='text-2xl font-semibold text-gray-800 mb-6'>
          All Appointments
        </p>

        {/* TABLE CARD */}
        <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

          {/* HEADER */}
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_3fr_1fr_1fr] px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Priority</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* BODY */}
          <div className='max-h-[70vh] overflow-y-auto divide-y'>

            {appointments.map((item, index) => (

              <div 
                key={index}
                className='grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_3fr_1fr_1fr] items-center px-6 py-4 text-sm text-gray-600 hover:bg-gray-50 transition-all'
              >

                <p className='font-medium text-gray-800'>{index + 1}</p>

                {/* Patient */}
                <div className='flex items-center gap-3'>
                  <img src={item.userData.image} className='w-10 h-10 rounded-full object-cover border' alt="" />
                  <p className='font-medium text-gray-800'>{item.userData.name}</p>
                </div>

                {/* Age */}
                <p>{calculateAge(item.userData.dob)}</p>

                {/* Priority */}
                <div className='flex justify-center'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800 border border-red-200' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    {item.priority === 'High' ? '🚨' : item.priority === 'Medium' ? '⚠️' : 'ℹ️'} {item.priority}
                  </span>
                </div>

                {/* Date */}
                <p>
                  {slotDateFormat(item.slotDate)} <br />
                  <span className='text-xs text-gray-400'>{item.slotTime}</span>
                </p>

                {/* Doctor */}
                <div className='flex items-center gap-3'>
                  <img src={item.docData.image} className='w-10 h-10 rounded-full object-cover bg-gray-100 border' alt="" />
                  <p className='font-medium text-gray-800'>{item.docData.name}</p>
                </div>

                {/* Fees */}
                <p className='font-semibold text-gray-800'>
                  {currency}{item.amount}
                </p>

                {/* Status */}
                {item.cancelled ? (
                  <span className='px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium'>
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className='px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600 transition'
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

export default AllAppointments