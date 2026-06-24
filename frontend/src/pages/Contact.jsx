import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-4 md:px-10'>

      {/* Heading */}
      <div className='text-center pt-12'>
        <p className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          CONTACT US
        </p>
      </div>

      {/* Main Section */}
      <div className='my-14 flex flex-col md:flex-row items-center gap-12 mb-28'>

        {/* Image */}
        <img 
          className='w-full md:max-w-[380px] rounded-xl shadow-lg hover:scale-105 transition duration-500' 
          src={assets.contact_image} 
          alt="" 
        />

        {/* Content */}
        <div className='flex flex-col justify-center items-start gap-6 bg-white p-8 rounded-2xl shadow-md'>

          {/* Office */}
          <div>
            <p className='font-semibold text-xl text-gray-800 mb-2'>OUR OFFICE</p>
            <p className='text-gray-600 text-base leading-6'>
              HealthBridge HQ <br />
              Hinjewadi Phase 1 <br />
              Pune, Maharashtra, India - 411057
            </p>
          </div>

          {/* Contact Info */}
          <div className='text-gray-600 text-base leading-6'>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@healthbridge.com</p>
          </div>

          {/* Careers */}
          <div>
            <p className='font-semibold text-xl text-gray-800 mb-2'>
              CAREERS AT <span className='text-purple-600'>HealthBridge</span>
            </p>
            <p className='text-gray-600 text-base'>
              Join our mission to simplify healthcare. Explore opportunities and grow with us.
            </p>
          </div>

          {/* Button */}
          <button className='mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-110 hover:shadow-purple-400/40 transition-all duration-300'>
            Explore Jobs
          </button>

        </div>

      </div>

    </div>
  )
}

export default Contact