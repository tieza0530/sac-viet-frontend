import * as dotenv from "dotenv";
import User from "@/app/config/models/User";
import Otp from "@/app/config/models/Otp";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { generateOtp } from "@/app/utils/createOtp";
import sendEmail from "@/app/utils/sendEmail";
import { SECRET_KEY } from "@/app/helper/constant";
dotenv.config();

export async function POST(req: NextRequest) {
  await connectDB();
  const otp = generateOtp();
  try {
    const { account, password, email } = await req.json();
    const existedAccount = await User.findOne({ account });
    const existedEmail = await User.findOne({ email });

    if (!existedAccount && !existedEmail) {
      const accessToken = jwt.sign({ account, email }, SECRET_KEY, { expiresIn: "5m"});
      await Otp.create({
        email,
        otp,
        accessTokenRegis: accessToken,
      });
      await User.create({
        account,
        password,
        email,
        authenticated: false,
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
      );
      await sendEmail(
        email,
        "Xác nhận đăng ký ",
        `Chào bạn đến với Sắc Việt! Đây là email xác nhận. Vui lòng không chia sẻ OTP với bất kì ai. Mã OTP của bạn là:  ${otp}`
      );
      return response;
    }
    if (existedEmail) {
      return NextResponse.json(
        {
          message: "Email đã tồn tại!",
        },
        { status: 400, statusText: "Invalid" }
      );
    }
    return NextResponse.json(
      {
        message: "Account đã tồn tại!",
      },
      { status: 401, statusText: "Invalid" }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error:" + error,
      },
      { status: 500, statusText: "Error" }
    );
  }
}
