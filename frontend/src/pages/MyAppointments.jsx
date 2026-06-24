import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token, getDoctosData } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setAppointments(data.appointments)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment',
                { appointmentId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctosData()
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay',
                { appointmentId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                const options = {
                    key: data.order.key_id,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: "Appointment Payment",
                    description: "Doctor Appointment",
                    order_id: data.order.id,
                    handler: async (response) => {
                        const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay',
                            response,
                            { headers: { Authorization: `Bearer ${token}` } }
                        )
                        if (data.success) {
                            toast.success("Payment successful")
                            getUserAppointments()
                            navigate('/my-appointments')
                        }
                    }
                }
                const rzp = new window.Razorpay(options)
                rzp.open()
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe',
                { appointmentId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                window.location.href = data.session_url
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='px-4 md:px-10 py-8'>

            {/* Heading */}
            <p className='text-2xl md:text-3xl font-semibold text-gray-800 mb-6'>
                My Appointments
            </p>

            <div className='space-y-6'>

                {appointments.map((item, index) => (

                    <div key={index} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col md:flex-row gap-6'>

                        {/* Image */}
                        <div className='flex justify-center md:block'>
                            <img className='w-28 h-28 object-cover rounded-xl bg-[#EAEFFF] border' src={item.docData.image} alt="" />
                        </div>

                        {/* Info */}
                        <div className='flex-1 text-gray-600'>

                            <p className='text-xl font-semibold text-gray-800'>
                                {item.docData.name}
                            </p>

                            {/* 🔥 ADD THIS BLOCK */}
                            <div className='mt-2'>
                                {item.priority === "High" && (
                                    <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold'>
                                        🔴 Emergency
                                    </span>
                                )}

                                {item.priority === "Medium" && (
                                    <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold'>
                                        🟡 Medium
                                    </span>
                                )}

                                {item.priority === "Low" && (
                                    <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold'>
                                        🟢 Low
                                    </span>
                                )}
                            </div>

                            <p className='text-sm text-purple-600 font-medium mt-1'>
                                {item.docData.speciality}
                            </p>

                            <p className='mt-3 font-medium text-gray-700'>Address:</p>
                            <p className='text-sm'>{item.docData.address.line1}</p>
                            <p className='text-sm'>{item.docData.address.line2}</p>

                            <p className='mt-3 text-sm'>
                                <span className='font-semibold text-gray-800'>Date & Time:</span>
                                {' '}{slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className='flex flex-col gap-3 justify-center items-center md:items-end'>

                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id &&
                                <button
                                    onClick={() => setPayment(item._id)}
                                    className='min-w-44 py-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition'
                                >
                                    Pay Online
                                </button>
                            }

                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id &&
                                <button
                                    onClick={() => appointmentStripe(item._id)}
                                    className='min-w-44 py-2 rounded-full border flex items-center justify-center hover:bg-gray-100'
                                >
                                    <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" />
                                </button>
                            }

                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id &&
                                <button
                                    onClick={() => appointmentRazorpay(item._id)}
                                    className='min-w-44 py-2 rounded-full border flex items-center justify-center hover:bg-gray-100'
                                >
                                    <img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" />
                                </button>
                            }

                            {!item.cancelled && item.payment && !item.isCompleted &&
                                <button className='min-w-44 py-2 rounded-full bg-blue-100 text-blue-600 font-medium'>
                                    Paid
                                </button>
                            }

                            {item.isCompleted &&
                                <button className='min-w-44 py-2 rounded-full border border-green-500 text-green-600 font-medium'>
                                    Completed
                                </button>
                            }

                            {!item.cancelled && !item.isCompleted &&
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className='min-w-44 py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition'
                                >
                                    Cancel Appointment
                                </button>
                            }

                            {item.cancelled && !item.isCompleted &&
                                <button className='min-w-44 py-2 rounded-full border border-red-500 text-red-500'>
                                    Cancelled
                                </button>
                            }

                        </div>

                    </div>

                ))}

            </div>
        </div>
    )
}

export default MyAppointments