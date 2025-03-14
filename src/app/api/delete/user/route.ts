import Otp from "@/app/config/models/Otp";
import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    await connectDB();
  try {
    const { email, account } = await req.json();      
    const findUser = await User.findOneAndDelete({ email, account ,authenticated: false});    
   const findUserOTP = await Otp.findOneAndDelete({ email });
    

    if (findUser && findUserOTP ) {
      return NextResponse.json(
        {
          message: "Xóa tài khoản thành công!",
        },
        { status: 200, statusText: "Done!!" }
      );
    }
    return NextResponse.json(
      { message: "Không tìm thấy tài khoản chưa xác nhận!" },
      { status: 404 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500, statusText: "Error!!" }
    );
  }
}
