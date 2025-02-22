"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import {use} from "react"

export default function ProfilePage({params}: any) {
    const router = useRouter()
    const newparams = use(params) as {id: string}

    const handleLogout = async() => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")
        } catch (error: any) {
            console.error(error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <hr />
        <p>Profile Page {newparams.id}</p>

        <hr />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded"
        onClick={handleLogout}>
            Logout
        </button>
        </div>
    );
    }