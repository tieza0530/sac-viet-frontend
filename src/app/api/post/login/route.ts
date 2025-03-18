import User from "@/app/config/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { SECRET_KEY } from "@/app/helper/constant";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        {
          data: null,
          message: "Missing username or password",
        },
        { status: 400, statusText: "Bad Request" }
      );
    }
    const checkUser = await User.findOne({ account: username });
    if (checkUser) {
      const isMatch = await bcrypt.compare(password, checkUser.password);
      if (isMatch) {
        const refreshToken = jwt.sign(
          { account: checkUser.account, email: checkUser.email },
          SECRET_KEY,
          { expiresIn: "7d" }
        );     
        const accessToken = jwt.sign({id: checkUser._id ,account: checkUser.account, email: checkUser.email } ,SECRET_KEY , { expiresIn: "15m"})   
        await User.findByIdAndUpdate(checkUser._id, {token: refreshToken})
        const response = NextResponse.json(
          {
            accessToken,
            message: "Đăng nhập thành công!",
          },
          { status: 200, statusText: "Success" }
        );
        response.headers.append(
          "Set-Cookie",
          `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
        );
        return response;
      }
      return NextResponse.json(
        {
          data: null,
          message: "Invalid password",
        },
        { status: 401, statusText: "Unauthorized" }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: "User not found",
      },
      { status: 404, statusText: "Not Found" }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        message: error || "An unexpected error occurred",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
