import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-6 sm:px-12 py-4 bg-white/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50'>

      {/* LEFT SECTION */}
      <div className='flex items-center gap-4'>

        {/* Logo */}
        <img 
          onClick={() => navigate('/')} 
          className='w-36 sm:w-44 cursor-pointer hover:scale-105 transition' 
          src={assets.admin_logo} 
          alt="logo" 
        />

        {/* Role Badge */}
        <span className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm
          ${aToken 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          }`}
        >
          {aToken ? 'Admin Panel' : 'Doctor Panel'}
        </span>
      </div>

      {/* RIGHT SECTION */}
      <div className='flex items-center gap-4'>

        {/* Welcome Text */}
        <p className='hidden sm:block text-gray-600 text-sm'>
          Welcome back 👋
        </p>

        {/* Logout Button */}
        <button 
          onClick={logout} 
          className='bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-red-400/40 hover:scale-105 transition-all duration-300'
        >
          Logout
        </button>

      </div>
    </div>
  )
}

export default Navbar