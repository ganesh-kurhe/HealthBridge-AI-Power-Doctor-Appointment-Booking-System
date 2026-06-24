import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='max-w-4xl mx-auto py-10 px-4'>

            {/* CARD */}
            <div className='bg-white rounded-2xl shadow-lg p-8'>

                {/* TOP SECTION */}
                <div className='flex flex-col sm:flex-row items-center gap-8'>

                    {/* IMAGE */}
                    {isEdit
                        ? <label htmlFor='image'>
                            <div className='relative cursor-pointer'>
                                <img className='w-40 h-40 object-cover rounded-full border-4 border-purple-200 shadow' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute bottom-2 right-2' src={assets.upload_icon} alt="" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                        : <img className='w-40 h-40 object-cover rounded-full border-4 border-purple-200 shadow' src={userData.image} alt="" />
                    }

                    {/* NAME */}
                    <div className='text-center sm:text-left'>
                        {isEdit
                            ? <input
                                className='text-3xl font-semibold bg-gray-50 px-3 py-1 rounded'
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            />
                            : <p className='text-3xl md:text-4xl font-bold text-gray-800'>
                                {userData.name}
                            </p>
                        }

                        <p className='text-gray-500 mt-2 text-base'>Patient Profile</p>
                    </div>
                </div>

                {/* DIVIDER */}
                <hr className='my-6' />

                {/* CONTACT INFO */}
                <div>
                    <p className='text-lg font-semibold text-gray-700 mb-3'>Contact Information</p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-base'>

                        <div>
                            <p className='font-medium'>Email</p>
                            <p className='text-blue-500'>{userData.email}</p>
                        </div>

                        <div>
                            <p className='font-medium'>Phone</p>
                            {isEdit
                                ? <input className='bg-gray-50 p-2 rounded w-full' type="text"
                                    value={userData.phone}
                                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                                : <p className='text-blue-500'>{userData.phone}</p>
                            }
                        </div>

                        <div className='sm:col-span-2'>
                            <p className='font-medium'>Address</p>

                            {isEdit
                                ? <div className='flex flex-col gap-2'>
                                    <input className='bg-gray-50 p-2 rounded'
                                        value={userData.address.line1}
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                    />
                                    <input className='bg-gray-50 p-2 rounded'
                                        value={userData.address.line2}
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                    />
                                </div>
                                : <p className='text-gray-500'>
                                    {userData.address.line1} <br /> {userData.address.line2}
                                </p>
                            }
                        </div>

                    </div>
                </div>

                {/* BASIC INFO */}
                <div className='mt-8'>
                    <p className='text-lg font-semibold text-gray-700 mb-3'>Basic Information</p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-base'>

                        <div>
                            <p className='font-medium'>Gender</p>
                            {isEdit
                                ? <select className='bg-gray-50 p-2 rounded w-full'
                                    value={userData.gender}
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <p className='text-gray-500'>{userData.gender}</p>
                            }
                        </div>

                        <div>
                            <p className='font-medium'>Birthday</p>
                            {isEdit
                                ? <input className='bg-gray-50 p-2 rounded w-full'
                                    type='date'
                                    value={userData.dob}
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                />
                                : <p className='text-gray-500'>{userData.dob}</p>
                            }
                        </div>

                    </div>
                </div>

                {/* BUTTON */}
                <div className='mt-10 text-center sm:text-left'>
                    {isEdit
                        ? <button
                            onClick={updateUserProfileData}
                            className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition'
                        >
                            Save Information
                        </button>
                        : <button
                            onClick={() => setIsEdit(true)}
                            className='border border-purple-500 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition'
                        >
                            Edit Profile
                        </button>
                    }
                </div>

            </div>

        </div>
    ) : null
}

export default MyProfile