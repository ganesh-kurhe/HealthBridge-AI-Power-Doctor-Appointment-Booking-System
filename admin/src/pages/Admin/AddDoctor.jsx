import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) return toast.error('Image Not Selected')

            const formData = new FormData();
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: { Authorization: `Bearer ${aToken}` } }
            )

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>

            <form onSubmit={onSubmitHandler} className='w-full max-w-4xl'>

                {/* TITLE */}
                <p className='text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center'>
                    Add Doctor
                </p>

                {/* CARD */}
                <div className='bg-white p-8 md:p-10 rounded-2xl shadow-lg'>

                    {/* IMAGE UPLOAD */}
                    <div className='flex items-center justify-center gap-6 mb-10'>
                        <label htmlFor="doc-img" className='cursor-pointer'>
                            <img 
                                className='w-24 h-24 rounded-full border object-cover bg-gray-100 hover:scale-105 transition' 
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                alt="" 
                            />
                        </label>
                        <input 
                            onChange={(e) => setDocImg(e.target.files[0])} 
                            type="file" 
                            id="doc-img" 
                            hidden 
                        />
                        <p className='text-gray-600 text-base md:text-lg'>
                            Upload doctor picture
                        </p>
                    </div>

                    {/* FORM GRID */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base md:text-lg'>

                        {/* LEFT */}
                        <div className='flex flex-col gap-5'>
                            <input onChange={e => setName(e.target.value)} value={name} className='input text-lg py-3' type="text" placeholder='Doctor Name' required />
                            <input onChange={e => setEmail(e.target.value)} value={email} className='input text-lg py-3' type="email" placeholder='Email' required />
                            <input onChange={e => setPassword(e.target.value)} value={password} className='input text-lg py-3' type="password" placeholder='Password' required />

                            <select onChange={e => setExperience(e.target.value)} value={experience} className='input text-lg py-3'>
                                <option>1 Year</option>
                                <option>2 Years</option>
                                <option>3 Years</option>
                                <option>5 Years</option>
                                <option>10 Years</option>
                            </select>

                            <input onChange={e => setFees(e.target.value)} value={fees} className='input text-lg py-3' type="number" placeholder='Consultation Fees' required />
                        </div>

                        {/* RIGHT */}
                        <div className='flex flex-col gap-5'>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='input text-lg py-3'>
                                <option>General physician</option>
                                <option>Gynecologist</option>
                                <option>Dermatologist</option>
                                <option>Pediatricians</option>
                                <option>Neurologist</option>
                                <option>Gastroenterologist</option>
                            </select>

                            <input onChange={e => setDegree(e.target.value)} value={degree} className='input text-lg py-3' type="text" placeholder='Degree' required />

                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='input text-lg py-3' type="text" placeholder='Address Line 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='input text-lg py-3' type="text" placeholder='Address Line 2' required />
                        </div>

                    </div>

                    {/* ABOUT */}
                    <div className='mt-8'>
                        <textarea 
                            onChange={e => setAbout(e.target.value)} 
                            value={about} 
                            className='input text-lg py-3 h-32 resize-none' 
                            placeholder='About Doctor' 
                        />
                    </div>

                    {/* BUTTON */}
                    <div className='flex justify-center'>
                        <button 
                            type='submit' 
                            className='mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-12 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300'
                        >
                            Add Doctor
                        </button>
                    </div>

                </div>

            </form>
        </div>
    )
}

export default AddDoctor