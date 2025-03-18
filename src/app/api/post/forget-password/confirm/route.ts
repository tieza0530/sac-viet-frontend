import Otp from "@/app/config/models/Otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  try {

    const exitedUser = await Otp.findOne({ email });
    if (!exitedUser) {
      return NextResponse.json(
        {
          message: "Email không tồn tại!",
        },
        { status: 400, statusText: "Invalid" }
      );
    }
    if (exitedUser.otp === otp) {
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
    );
  } catch (error) {
    console.log(error);
    await Otp.findByIdAndDelete({email})
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500, statusText: "Error" }
    );
  }
}
