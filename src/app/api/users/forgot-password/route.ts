import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

 connect()

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json()
        const {email} = reqbody
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        
        const userId = user._id.toString()
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId
        })

        return NextResponse.json({message: "Password reset link sent to your email"})
        
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}