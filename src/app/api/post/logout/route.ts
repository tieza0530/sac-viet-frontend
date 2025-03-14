import * as dotenv from "dotenv";
import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";
dotenv.config();


export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { refreshToken } = await req.json();
    const existed = await User.findOne({ refreshToken });
    if (!existed) {
        return NextResponse.json(
          {
            data: null,
            message: "Không tìm thấy tài khoản!",
          },
          { status: 404, statusText: "Not Found" }
        );
      }
    const response = NextResponse.json(
        {
          data: null,
          message: "Đăng xuất thành công!",
        },
        { status: 200, statusText: "OK" }
      );
    response.cookies.set('refreshToken', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(0),  
      });
    return response;

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
