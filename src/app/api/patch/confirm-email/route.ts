import Otp from "@/app/config/models/Otp";
import { connectDB } from "@/app/config/mongoose";
import { generateOtp } from "@/app/utils/createOtp";
import sendEmail from "@/app/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const otp = generateOtp();
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message:"Invalid email address" },
        { status: 400 }
      );
    }

    const findUser = await Otp.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        { message:"Email not found" },
        { status: 404 }
      );
    }

    findUser.otp = otp;
    findUser.createdAt = Date.now();
    await findUser.save();

    await sendEmail(
      email,
      "Xác nhận đăng ký ",
      `Chào bạn đến với Sắc Việt ! Đây là email xác nhận. Vui lòng không chia sẻ OTP với bất kì ai. Mã OTP của bạn là:  ${otp}`
    );
    
    return NextResponse.json(
      {
        message: "Send OTP again success!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
