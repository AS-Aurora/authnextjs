"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const forgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleforgotpassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/forgot-password', {email});
            console.log("Login response:", response.data);
            setMessage("Password reset link sent to your email");
            router.push('/login')
            
        } catch(error: any) {
            console.log("Login error:", error.response?.data || error.message);
            setMessage(error.response?.data || error.message);
            setLoading(false);
            
        }
    }



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing" : "Forgot Password"}</h1>
        <input type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className='p-2 m-2 border border-gray-300 rounded text-black'
         />
         <button onClick={handleforgotpassword}>
            {loading ? "Processing" : "Send Link"}
         </button>
         {message && <p>{message}</p>}
    </div>
  )
}

export default forgotPassword