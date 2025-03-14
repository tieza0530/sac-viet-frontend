import * as dotenv from "dotenv";
import User from "@/app/config/models/User";
import Otp from "@/app/config/models/Otp";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { generateOtp } from "@/app/utils/createOtp";
import sendEmail from "@/app/utils/sendEmail";
dotenv.config();

export async function POST(req: NextRequest) {
  await connectDB();
  const otp = generateOtp()
  const secretKey = process.env.JWT_SECRET as string;
  try {
    const { account, password, email } = await req.json();
    const existed = await User.findOne({ account });
    const existedEmail = await User.findOne({ email });

    if (!existed && !existedEmail) {
      await sendEmail(email , "Xác nhận đăng ký ",`Chào bạn đến với Sắc Việt ! Đây là email xác nhận. Vui lòng không chia sẻ OTP với bất kì ai. Mã OTP của bạn là:  ${otp}` )
      const checkGmail = await Otp.create({
        email,
        otp
      })
      const newUser = await User.create({
        account,
        password,
        email,
        authenticated: false,
      });
      await checkGmail.save();
      await newUser.save();      
      const accessToken = jwt.sign({account ,email ,authenticated: false }, secretKey ,{
        expiresIn: "5m",
      })
      const response = NextResponse.json(
        {
          accessToken,
          message: "Success",
        },
        { status: 200, statusText: "Success" }
      );
      response.headers.append(
        "Set-Cookie",
      `confirm_access=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=120`
        )
      return response;
    }
    if (existedEmail) {
      return NextResponse.json(
        {
          data: null,
          message: "Email đã tồn tại!",
        },
        { status: 400, statusText: "Invalid" }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: "Account đã tồn tại!",
      },
      { status: 401, statusText: "Invalid" }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        message: "Error",
      },
      { status: 500, statusText: "Failed" }
    );
  }
}
