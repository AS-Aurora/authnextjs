"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("nothing")

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login response:", response.data);

      const userResponse = await axios.get("/api/users/me")
      console.log(userResponse.data)
      const userId = userResponse.data.data._id
      router.push(`/profile/${userId}`)
    } catch (error: any) {
      console.log("Login error:", error.response?.data || error.message);
      setLoading(false);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login Page"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 m-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 m-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
        onClick={onLogin}>{buttonDisabled ? "No Login" : "Login"}</button>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
}