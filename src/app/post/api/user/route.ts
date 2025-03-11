import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/config/models/User";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { account , password , phone , refreshToken} = await req.json();
        const newUser = await User.create({account , password , phone , refreshToken})
        return NextResponse.json({
            data: newUser,
            message: "Success"
        }, {status: 200, statusText: "Success"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: "Error"
        }, {status: 500 , statusText: "Failed"})
        
    }
}