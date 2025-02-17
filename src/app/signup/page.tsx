"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      const response = await axios.post('/api/users/signup', user)
      console.log("Success: ", response.data)
      if(response.data.success) {
        router.push("/login");
      }
    } catch (error:any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup Page"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 m-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        onClick={onSignUp}>{buttonDisabled ? "No Signup" : "Sign Up"}</button>
      <Link href="/login">Login</Link>
    </div>
  );
}
