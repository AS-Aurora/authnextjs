import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        console.log("Starting signup process...");
        
        // Connect to MongoDB
        await connect();
        console.log("MongoDB connected successfully");

        // Parse request body
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log("Received user data:", { username, email, passwordLength: password?.length });

        // Validate input
        if (!username || !email || !password) {
            console.log("Missing required fields");
            return NextResponse.json(
                { error: "Please provide all required fields" },
                { status: 400 }
            );
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        console.log("Existing user check:", !!existingUser);

        if(existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });

        // Save user
        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser._id);

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: error.status || 500 }
        );
    }
}