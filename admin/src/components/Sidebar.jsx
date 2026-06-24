import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden
    ${isActive 
      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
      : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600 hover:scale-105'}`

  return (
    <div className='min-h-screen bg-white/80 backdrop-blur-md border-r shadow-md px-4 py-6'>

      {/* ADMIN */}
      {aToken && (
        <ul className='flex flex-col gap-4'>

          <NavLink to='/admin-dashboard' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.home_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Dashboard</p>
          </NavLink>

          <NavLink to='/all-appointments' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Appointments</p>
          </NavLink>

          <NavLink to='/add-doctor' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.add_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Add Doctor</p>
          </NavLink>

          <NavLink to='/doctor-list' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.people_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Doctors List</p>
          </NavLink>

        </ul>
      )}

      {/* DOCTOR */}
      {dToken && (
        <ul className='flex flex-col gap-4'>

          <NavLink to='/doctor-dashboard' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.home_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Dashboard</p>
          </NavLink>

          <NavLink to='/doctor-appointments' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Appointments</p>
          </NavLink>

          <NavLink to='/doctor-profile' className={linkStyle}>
            <img className='w-5 transition-transform duration-300 group-hover:scale-125' src={assets.people_icon} alt='' />
            <p className='hidden md:block text-base font-semibold tracking-wide'>Profile</p>
          </NavLink>

        </ul>
      )}

    </div>
  )
}

export default Sidebar