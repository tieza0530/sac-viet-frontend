import Otp from "@/app/config/models/Otp";
import jwt from "jsonwebtoken";
import User from "@/app/config/models/User";
import { NextRequest, NextResponse } from "next/server";
import { SECRET_KEY } from "@/app/helper/constant";

export async function POST(req: NextRequest) {
  const { otp, email, account, accessTokenRegis } = await req.json();
  try {
    if (!email || !account || !otp) {
      return NextResponse.json(
        { message: "Missing email, account, or OTP!" },
        { status: 400 }
      );
    }
    if (!accessTokenRegis) {
      return NextResponse.json({ message: "Unauthorized access!" }, { status: 401 });
    }
    const checkUserConfirm = await Otp.findOne({ accessTokenRegis });
    if (!checkUserConfirm) {
      return NextResponse.json(
        { message: "Invalid or expired OTP!" },
        { status: 400 }
      );
    }
    if (checkUserConfirm.otp !== otp.pin) {
      return NextResponse.json(
        { message: "Incorrect OTP!" },
        { status: 400 }
      );
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        { message: "User not found!" },
        { status: 404 }
      );
    }
    const id = findUser._id;
    const accessToken = jwt.sign({ id, account, email }, SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign({ id, account, email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    findUser.token = refreshToken;
    findUser.authenticated = true;
    await findUser.save();
    await Otp.findOneAndDelete({ email });
    const response = NextResponse.json(
      { accessToken, message: "OTP verification successful!" },
      { status: 200 }
    );
    response.headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
    );
    return response;
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    await Otp.findOneAndDelete({ email });
    await User.findOneAndDelete({ email });
    return NextResponse.json(
      { message: "An error occurred!" },
      { status: 500 }
    );
  }
}
