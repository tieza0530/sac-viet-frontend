import * as dotenv from "dotenv";
import User from "@/app/config/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { SECRET_KEY } from "@/app/helper/constant";
dotenv.config();


export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();    
    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(accessToken, SECRET_KEY) as { email: string; account: string };
    
    if(!decoded){
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const email = decoded.email
    const existed = await User.findOne({ email });
    
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
    existed.token = ''
    await existed.save()
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
