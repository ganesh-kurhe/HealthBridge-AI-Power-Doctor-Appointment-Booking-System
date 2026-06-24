import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom";

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const location = useLocation();
    const priority = location.state?.priority || "Low";

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {

            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {

                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable =
                    docInfo.slots_booked[slotDate] &&
                    docInfo.slots_booked[slotDate].includes(slotTime)
                        ? false
                        : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { docId, slotDate, slotTime, priority },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='px-4 md:px-10 py-8'>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-6'>

                {/* Image */}
                <div className='bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-2xl shadow-lg'>
                    <img className='w-full sm:max-w-72 rounded-xl' src={docInfo.image} alt="" />
                </div>

                {/* Info */}
                <div className='flex-1 bg-white rounded-2xl p-8 shadow-md border'>

                    <p className='flex items-center gap-2 text-3xl md:text-4xl font-semibold text-gray-800'>
                        {docInfo.name}
                        <img className='w-5' src={assets.verified_icon} alt="" />
                    </p>

                    <div className='flex items-center gap-3 mt-3 text-gray-600 text-base'>
                        <p>{docInfo.degree} • {docInfo.speciality}</p>
                        <span className='px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm'>
                            {docInfo.experience}
                        </span>
                    </div>

                    <div className='mt-5'>
                        <p className='flex items-center gap-2 text-base font-semibold text-gray-800'>
                            About
                            <img className='w-4' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-gray-600 mt-2 text-base leading-7 max-w-[700px]'>
                            {docInfo.about}
                        </p>
                    </div>

                    <p className='text-lg font-medium mt-6 text-gray-700'>
                        Appointment Fee:
                        <span className='text-purple-600 font-semibold ml-2'>
                            {currencySymbol}{docInfo.fees}
                        </span>
                    </p>
                </div>
            </div>

            {/* ---------- Booking Section ----------- */}
            <div className='sm:ml-72 sm:pl-6 mt-10'>

                <p className='text-xl font-semibold text-gray-800'>Booking Slots</p>

                {/* Days */}
                <div className='flex gap-4 mt-5 overflow-x-auto'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)}
                            className={`min-w-[70px] text-center py-5 rounded-full cursor-pointer transition-all
                            ${slotIndex === index
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow scale-105'
                                    : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                        >
                            <p className='text-sm'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-lg font-semibold'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                <div className='flex gap-3 mt-6 overflow-x-auto'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                            className={`px-5 py-2 rounded-full text-sm cursor-pointer transition
                            ${item.time === slotTime
                                    ? 'bg-purple-600 text-white shadow scale-105'
                                    : 'border border-gray-300 text-gray-600 hover:bg-purple-50'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                {/* Button */}
                <button
                    onClick={bookAppointment}
                    className='mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-3 rounded-full text-base font-semibold shadow-lg hover:scale-105 transition'
                >
                    Book an appointment
                </button>
            </div>

            {/* Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />

        </div>
    ) : null
}

export default Appointment