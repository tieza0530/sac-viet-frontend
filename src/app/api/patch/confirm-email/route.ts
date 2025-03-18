import Otp from "@/app/config/models/Otp";
import { connectDB } from "@/app/config/mongoose";
import { generateOtp } from "@/app/utils/createOtp";
import sendEmail from "@/app/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    await connectDB();
    const otp = generateOtp();
    try {
        const { email } = await req.json();
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return NextResponse.json({message: "Confirm email finished!"}, {status: 400, statusText: "Invalid"})
        }
        const findUser = await Otp.findOne({email})
        if(!findUser){
            return NextResponse.json({message: "Confirm email finished!"}, {status: 404, statusText: "Invalid"})
        }
        findUser.otp = otp;
        findUser.createdAt = Date.now();
        await findUser.save();
        await sendEmail(email , "Xác nhận đăng ký ",`Chào bạn đến với Sắc Việt ! Đây là email xác nhận. Vui lòng không chia sẻ OTP với bất kì ai. Mã OTP của bạn là:  ${otp}` )
        return NextResponse.json({
            message: "Send OTP again done!"
        }, {status: 200, statusText: "Success!"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Send OTP again failed!"
        },{status: 500, statusText: "Error"})
    }
}