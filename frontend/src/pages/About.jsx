import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 md:px-10'>

      {/* Heading */}
      <div className='text-center pt-12'>
        <p className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          ABOUT US
        </p>
      </div>

      {/* Top Section */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>

        {/* Image */}
        <img 
          className='w-full md:max-w-[380px] rounded-xl shadow-lg hover:scale-105 transition duration-500' 
          src={assets.about_image} 
          alt="" 
        />

        {/* Content */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-base md:text-lg text-gray-600 leading-7'>

          <p>
            Welcome to <span className='font-semibold text-gray-800'>HealthBridge</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. 
            We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>

          <p>
            <span className='font-semibold text-gray-800'>HealthBridge</span> is committed to excellence in healthcare technology. 
            We continuously enhance our platform by integrating modern innovations to improve user experience and deliver superior service. 
            Whether you're booking your first appointment or managing ongoing care, we support you every step of the way.
          </p>

          <div>
            <p className='text-lg md:text-xl font-semibold text-gray-800 mb-2'>Our Vision</p>
            <p>
              Our vision at <span className='font-semibold text-gray-800'>HealthBridge</span> is to create a seamless healthcare experience for every user. 
              We aim to bridge the gap between patients and healthcare providers, making access to care simple, fast, and reliable.
            </p>
          </div>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center my-10'>
        <p className='text-2xl md:text-3xl font-bold text-gray-800'>
          WHY <span className='text-purple-600'>CHOOSE US</span>
        </p>
      </div>

      {/* Cards */}
      <div className='grid md:grid-cols-3 gap-6 mb-20'>

        {/* Card 1 */}
        <div className='bg-white border rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-gray-600'>
          <p className='text-lg font-semibold text-gray-800 mb-3'>EFFICIENCY</p>
          <p className='text-base leading-6'>
            Streamlined appointment scheduling that fits perfectly into your busy lifestyle.
          </p>
        </div>

        {/* Card 2 */}
        <div className='bg-white border rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-gray-600'>
          <p className='text-lg font-semibold text-gray-800 mb-3'>CONVENIENCE</p>
          <p className='text-base leading-6'>
            Access a wide network of trusted healthcare professionals near you anytime.
          </p>
        </div>

        {/* Card 3 */}
        <div className='bg-white border rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-gray-600'>
          <p className='text-lg font-semibold text-gray-800 mb-3'>PERSONALIZATION</p>
          <p className='text-base leading-6'>
            Get tailored recommendations and reminders to stay on top of your health journey.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About