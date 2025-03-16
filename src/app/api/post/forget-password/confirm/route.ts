import Otp from "@/app/config/models/Otp";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email ,otp } = await req.json();
      console.log("-----------------------------------------------------",email , otp);
      
    const exitedUser = await Otp.findOne({ email });
    if (!exitedUser) {
      return NextResponse.json(
        {
          message: "Email không tồn tại!",
        },
        { status: 400, statusText: "Invalid" }
      );
    }
    if(exitedUser.otp === otp){
         return NextResponse.json(
        {
          message: "Success",
        },
        { status: 200, statusText: "Success" }
      );
    }
    return NextResponse.json(
      {
        message: "Quên mật khẩu thất bại!",
      },
      { status: 4001, statusText: "Invalid" }
    );  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500, statusText: "Error" }
    );
  }
}
