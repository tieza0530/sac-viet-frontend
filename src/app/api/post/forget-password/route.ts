import Otp from "@/app/config/models/Otp";
import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { generateOtp } from "@/app/utils/createOtp";
import sendEmail from "@/app/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@/app/helper/constant";

export async function POST(req: NextRequest) {
  await connectDB();
  const otp = generateOtp();

  try {
    const { email } = await req.json();
    
    const exitedUser = await User.findOne({ email });
    if (!exitedUser) {
      return NextResponse.json(
        {
          message: "Email không tồn tại!",
        },
        { status: 400, statusText: "Invalid" }
      );
    }
    const sendOtp = new Otp({ email: email, otp: otp });
    await sendOtp.save();
    const accessToken = jwt.sign({ email }, SECRET_KEY, {
      expiresIn: "5m",
    });
    const response = NextResponse.json(
      {
        accessToken,
        message: "Success",
      },
      { status: 200, statusText: "Success" }
    );
    response.headers.append(
        "Set-Cookie",
      `confirm_access=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=300`
        )
        await sendEmail(
          email,
          "OTP xác nhận ",
          `Chào bạn đến với Sắc Việt ! Đây là email xác nhận otp cho password. Vui lòng không chia sẻ OTP với bất kì ai. Mã OTP của bạn là:  ${otp}`
        );
      return response
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500, statusText: "Error" }
    );
  }
}
