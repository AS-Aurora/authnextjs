"use client"

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { log } from 'node:console'
import React, { useState } from 'react'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const router = useRouter()
    const params = useSearchParams()
    const token = params.get('token')

    const handleresetPassword = async () => {
        if(newPassword !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }

        try {
            setLoading(true)
            const response = await axios.post('/api/users/resetpassword', {token, newPassword})
            setMessage("Password reset successful")
            console.log(response.data)

            if(response.data.success) {
                router.push('/login')
            }
        } catch (error: any) {
            console.log("Login error:", error.message)
            setMessage(error.message)
            setLoading(false)
            
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <input type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder='New Password'
        className='p-2 m-2 border border-gray-300 rounded text-black' />
        <input type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder='Confirm Password'
        className='p-2 m-2 border border-gray-300 rounded text-black' />
        <button onClick={handleresetPassword}>
            {loading ? "Processing" : "Reset Password"}
        </button>
        {message && <p>{message}</p>}
    </div>
  )
}

export default ResetPassword