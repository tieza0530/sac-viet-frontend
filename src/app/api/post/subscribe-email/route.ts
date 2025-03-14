import SubscribeEmail from "@/app/config/models/SubscribeEmail";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { emailCustomer } = await req.json();
        const existed = await SubscribeEmail.findOne({emailCustomer})
        if(!existed){
        const newSubscribeEmail = await SubscribeEmail.create({emailCustomer})
        return NextResponse.json({
            data: newSubscribeEmail,
            message: "Success"
        }, {status: 200, statusText: "Success"})
    }
    return NextResponse.json({
        data: null,
        message: "Email đã tồn tại trong hệ thống !"
    }, {status: 400, statusText: "Invalid!"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: "Error"
        }, {status: 500, statusText: "Failed!"})
    }
}
