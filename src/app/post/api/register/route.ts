import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/config/models/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export async function POST(req: NextRequest) {
    const secretKey = process.env.JWT_SECRET  as string    
  await connectDB();
  try {
    const { account, password, phone } = await req.json();
    const existed = await User.findOne({ account });
    const existedPhone = await User.findOne({ phone });

    if (!existed && !existedPhone) {
      const newUser = await User.create({
        account,
        password,
        phone,
      });
      const accessToken = jwt.sign({account: newUser.account, phone: newUser.phone } , secretKey,  { expiresIn: "15m" })
      const refreshToken = jwt.sign({account: newUser.account, phone: newUser.phone } , secretKey,  { expiresIn: "7d" })
      newUser.token = refreshToken;
      await newUser.save();
      const response =  NextResponse.json(
        {
         accessToken,
          message: "Success",
        },
        { status: 200, statusText: "Success" }
      );
       response.headers.append(
        "Set-Cookie",
        `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
      );
       return response
    }
    if (existedPhone) {
      return NextResponse.json(
        {
          data: null,
          message: "Số điện thoại đã tồn tại!",
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
