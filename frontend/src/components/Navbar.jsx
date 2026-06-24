import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between px-6 md:px-12 py-4 mb-5 bg-white/95 backdrop-blur-lg shadow-md border-b border-slate-100 sticky top-0 z-50'>

      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className='w-44 md:w-48 cursor-pointer transition-all duration-300 hover:scale-105'
        src={assets.logo}
        alt=""
      />

      {/* Desktop Menu */}
      <ul className='md:flex items-center gap-6 font-medium hidden text-sm'>
        {[
          { name: "HOME", path: "/" },
          { name: "ALL DOCTORS", path: "/doctors" },
          { name: "AI SYMPTOM CHECKER", path: "/symptom-checker" },
          { name: "AI HEALTH ASSISTANT", path: "/ai-health-assistant" },
          { name: "AI RISK ASSESSMENT", path: "/ai-health-risk-assessment" },
          { name: "ABOUT", path: "/about" },
          { name: "CONTACT", path: "/contact" }
        ].map((item, index) => (
          <NavLink key={index} to={item.path} className='group relative'>

            <li
              className={`py-2 px-3 cursor-pointer transition-all duration-300 group-hover:scale-105 ${
                item.name.includes("AI")
                  ? "font-bold text-violet-600"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              {item.name}
            </li>

            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full'></span>
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-5'>
        {
          token && userData
            ? <div className='flex items-center gap-3 cursor-pointer group relative'>

              <img
                className='w-10 h-10 rounded-full border-2 border-indigo-200 shadow-sm transition'
                src={userData.image}
                alt=""
              />

              <img
                className='w-3 transition-transform duration-300 group-hover:rotate-180'
                src={assets.dropdown_icon}
                alt=""
              />

              {/* Dropdown */}
              <div className='absolute right-0 pt-14 z-20 hidden group-hover:block'>
                <div className='min-w-56 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-2 p-4 text-sm'>
                  <p
                    onClick={() => navigate('/my-profile')}
                    className='hover:text-purple-600 cursor-pointer transition'
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => navigate('/my-appointments')}
                    className='hover:text-blue-600 cursor-pointer transition'
                  >
                    My Appointments
                  </p>

                  <p
                    onClick={logout}
                    className='hover:text-red-500 cursor-pointer transition'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            : <button
              onClick={() => navigate('/login')}
              className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hidden md:block'
            >
              Create Account
            </button>
        }

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-8 md:hidden cursor-pointer hover:scale-110 transition'
          src={assets.menu_icon}
          alt=""
        />

        {/* Mobile Menu */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 transition-all duration-300`}>

          <div className='flex items-center justify-between px-5 py-6 border-b border-slate-200 bg-white'>
            <img src={assets.logo} className='w-40' alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className='w-8 cursor-pointer hover:rotate-90 transition'
              alt=""
            />
          </div>

          <ul className='flex flex-col items-center gap-5 mt-10 px-5 text-xl font-semibold'>
            {[
              { name: "HOME", path: "/" },
              { name: "ALL DOCTORS", path: "/doctors" },
              { name: "AI SYMPTOM CHECKER", path: "/symptom-checker" },
              { name: "AI HEALTH ASSISTANT", path: "/ai-health-assistant" },
              { name: "AI RISK ASSESSMENT", path: "/ai-health-risk-assessment" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" }
            ].map((item, index) => (
              <NavLink
                key={index}
                onClick={() => setShowMenu(false)}
                to={item.path}
              >
                <p className={`w-full text-center px-6 py-3 rounded-xl shadow-md transition-all duration-300 ${
                  item.name.includes("AI")
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:scale-105'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105'
                }`}>
                  {item.name}
                </p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

