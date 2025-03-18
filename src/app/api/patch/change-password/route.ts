import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    await connectDB();
    try {
        const {email , password} = await req.json();
        const findUser = await User.findOne({email})

        if(!findUser){
            return NextResponse.json({
                message: "Not Found account!"
            },{status: 404})
        }
        if(!password){
            return NextResponse.json({
                message: "Password not null!"
            },{status: 400}) 
        }

        findUser.password = password
        await findUser.save();

        return NextResponse.json({
            message: "Update Password Success!"
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            { status: 500 }
        );
    }
    
}