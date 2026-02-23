import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { getPasswordResettoken } from '../services/operations/authAPI'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(getPasswordResettoken(email, setEmailSent))
    }

    return (
        <div className='min-h-screen bg-richblack-900 flex items-center justify-center px-4'>
            {loading ? (
                <div className='flex flex-col items-center gap-4'>
                    <div className='spinner'></div>
                    <p className='text-richblack-100'>Loading...</p>
                </div>
            ) : (
                <div className='w-full max-w-[508px] mx-auto flex flex-col gap-6'>
                    {/* Header */}
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-richblack-5 text-3xl font-semibold leading-[2.375rem]'>
                            {!emailSent ? "Reset your password" : "Check your email"}
                        </h1>
                        <p className='text-richblack-100 text-lg leading-[1.625rem]'>
                            {!emailSent 
                                ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery." 
                                : `We have sent the reset email to ${email}`
                            }
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6'>
                        {!emailSent && (
                            <label className='w-full'>
                                <p className='mb-2 text-sm leading-[1.375rem] text-richblack-5'>
                                    Email Address <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email address'
                                    style={{
                                        boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                                    }}
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none border border-richblack-700 focus:border-richblue-300 transition-colors duration-200'
                                />
                            </label>
                        )}

                        <button
                            type='submit'
                            className='w-full bg-yellow-50 py-[12px] px-[24px] rounded-[8px] font-medium text-richblack-900 hover:bg-yellow-100 hover:scale-95 transition-all duration-200'
                        >
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className='flex items-center gap-2'>
                        <Link to='/login'>
                            <div className='flex items-center gap-2 text-richblack-5 hover:text-richblue-100 transition-colors duration-200'>
                                <BiArrowBack className='text-lg' />
                                <p className='text-base font-medium'>Back to login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword
