import Otp from "@/app/config/models/Otp";
import jwt from "jsonwebtoken";
import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const secretKey = process.env.JWT_SECRET as string;
  try {
    const { otp, email, account } = await req.json();
    if (!email || !account || !otp) {
      return NextResponse.json(
        { message: "Thiếu thông tin email, tài khoản hoặc OTP!" },
        { status: 400 }
      );
    }
    const checkOtp = await Otp.findOne({ email });
    if (!checkOtp) {
      return NextResponse.json(
        { message: "OTP không đúng  hoặc đã hết hạn!" },
        { status: 400 }
      );
    }
    if (checkOtp.otp !== otp.pin) {
      return NextResponse.json(
        { message: "OTP không hợp lệ!" },
        { status: 400 }
      );
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng!" },
        { status: 404 }
      );
    }
    const accessToken = jwt.sign({ account, email, authenticated: true }, secretKey, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ account, email, authenticated: true }, secretKey, {
      expiresIn: "7d",
    });

    findUser.token = refreshToken;
    findUser.authenticated = true;
    await findUser.save();
    await Otp.findOneAndDelete({email})
    const response = NextResponse.json(
      { accessToken, message: "Xác thực thành công!" },
      { status: 200 }
    );
    response.headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
    );
    return response;
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi", error },
      { status: 500 }
    );
  }
}
