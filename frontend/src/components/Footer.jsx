import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className='md:mx-10 mt-40'>

      {/* Top Section */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-base bg-gradient-to-b from-white to-blue-50 p-10 rounded-2xl shadow-sm'>

        {/* ------- Left Section ------- */}
        <div>
          <img className='mb-5 w-44' src={assets.logo} alt="" />

          <p className='w-full md:w-2/3 text-gray-600 leading-7 text-base'>
            Book appointments with trusted doctors anytime, anywhere. 
            HealthBridge makes healthcare simple, fast, and reliable for everyone.
          </p>

          {/* Trust Points */}
          <div className='mt-5 text-sm text-gray-500 flex flex-col gap-2'>
            <p>✔ 100+ Verified Doctors</p>
            <p>✔ Instant Appointment Booking</p>
            <p>✔ Secure & Trusted Platform</p>
          </div>
        </div>

        {/* ------- Company ------- */}
        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>COMPANY</p>

          <ul className='flex flex-col gap-3 text-gray-600 text-base'>

            <li 
              onClick={() => navigate('/')} 
              className='hover:text-purple-600 hover:translate-x-1 transition cursor-pointer'
            >
              Home
            </li>

            <li 
              onClick={() => navigate('/about')} 
              className='hover:text-purple-600 hover:translate-x-1 transition cursor-pointer'
            >
              About Us
            </li>

            <li 
              onClick={() => navigate('/doctors')} 
              className='hover:text-purple-600 hover:translate-x-1 transition cursor-pointer'
            >
              All Doctors
            </li>

            <li 
              onClick={() => navigate('/contact')} 
              className='hover:text-purple-600 hover:translate-x-1 transition cursor-pointer'
            >
              Contact
            </li>

            <li className='hover:text-purple-600 hover:translate-x-1 transition cursor-pointer'>
              Privacy Policy
            </li>

          </ul>
        </div>

        {/* ------- Contact ------- */}
        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>GET IN TOUCH</p>

          <ul className='flex flex-col gap-3 text-gray-600 text-base'>
            <li>📞 +91 98765 43210</li>
            <li>📧 support@healthbridge.com</li>
            <li>📍 Pune, India</li>
          </ul>

          {/* Social Icons */}
          <div className='flex gap-5 mt-5 text-xl'>
            <span className='cursor-pointer hover:scale-110 transition'>🔵</span>
            <span className='cursor-pointer hover:scale-110 transition'>🟣</span>
            <span className='cursor-pointer hover:scale-110 transition'>🔷</span>
            <span className='cursor-pointer hover:scale-110 transition'>🐦</span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div>
        <hr className='border-gray-200' />
        <p className='py-6 text-base text-center text-gray-500'>
          © 2026 HealthBridge.com — All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer