import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  const location = useLocation();
  const priority = location.state?.priority || "Low";
  const department = location.state?.department;
  const fromSymptomChecker = location.state?.fromSymptomChecker;

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='px-4 md:px-10 py-10'>

      {/* Priority Indicator (from Symptom Checker) */}
      {fromSymptomChecker && (
        <div className={`mb-6 p-4 rounded-xl border-2 text-center ${
          priority === 'High' ? 'bg-red-50 border-red-200 text-red-800' :
          priority === 'Medium' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
          'bg-green-50 border-green-200 text-green-800'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">
              {priority === 'High' ? '🚨' : priority === 'Medium' ? '⚠️' : 'ℹ️'}
            </span>
            <h3 className="text-lg font-semibold">
              Priority Level: {priority}
            </h3>
          </div>
          <p className="text-sm">
            {priority === 'High' 
              ? 'Your symptoms indicate urgent medical attention. You will be prioritized in the appointment queue.'
              : priority === 'Medium'
              ? 'Your symptoms suggest moderate urgency. You will receive priority over routine appointments.'
              : 'Your symptoms appear routine. Appointments are processed in order of booking.'
            }
          </p>
          {department && (
            <p className="text-sm mt-1 font-medium">
              Recommended Department: {department}
            </p>
          )}
        </div>
      )}

      {/* Heading */}
      <p className='text-gray-700 text-lg md:text-xl font-medium'>
        Browse through the doctors specialist.
      </p>

      <div className='flex flex-col sm:flex-row items-start gap-8 mt-8'>

        {/* Filter Button (Mobile) */}
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-2 px-4 border rounded-full text-base font-medium transition-all sm:hidden shadow-sm ${showFilter ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white'}`}
        >
          Filters
        </button>

        {/* Filter Sidebar */}
        <div className={`flex-col gap-4 text-base ${showFilter ? 'flex' : 'hidden sm:flex'} bg-white p-5 rounded-xl shadow-md border`}>

          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist"
          ].map((item, i) => (

            <p 
              key={i}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all font-medium 
                ${speciality === item 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow' 
                  : 'bg-gray-100 hover:bg-purple-100 hover:text-purple-600'}`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>

          {filterDoc.map((item, index) => (
            <div 
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`, {
                  state: { priority, department, fromSymptomChecker }
                });
                scrollTo(0, 0);
              }}
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
                <p className='text-lg md:text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition'>
                  {item.name}
                </p>

                {/* Speciality */}
                <p className='text-sm md:text-base text-gray-500'>
                  {item.speciality}
                </p>

                {/* Rating UI */}
                <div className='flex justify-center gap-1 mt-2 text-yellow-400 text-sm'>
                  ★ ★ ★ ★ ☆
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors