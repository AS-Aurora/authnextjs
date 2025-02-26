import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt, { compare } from "bcryptjs";
import User from "@/models/userModel";

connect()

export async function PUT(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { token, newPassword } = reqbody;

        const user = await User.findOne({forgotPasswordToken: token})
        if (!user || user.forgotPasswordTokenexpire < Date.now()) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenexpire = undefined
        await user.save();

        return NextResponse.json({message: "Password reset successfully", success: true});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
