import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({ email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400}) 
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({email, username, password: hashpassword})

        const saveUser = await newUser.save()
        console.log(saveUser)

        return NextResponse.json({
            message: "User created successfully", success: true, saveUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message }, {status: 500})
    }
}

await connect()
