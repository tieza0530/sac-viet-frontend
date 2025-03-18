import Otp from "@/app/config/models/Otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  try {
    const exitedUser = await Otp.findOne({ email });

    if (!exitedUser) {
      return NextResponse.json(
        {
          message: "Email does not exist!",
        },
        { status: 400 }
      );
    }
    if (exitedUser.otp !== otp) {
      return NextResponse.json(
        {
          message: "Invalid OTP. Please try again!",
        },
        { status: 400 }
      );
    }
    await Otp.findOneAndDelete({ email });

    return NextResponse.json(
      {
        message: "OTP verification successful!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    await Otp.findByIdAndDelete({ email });
    return NextResponse.json(
      {
        message: "Internal Server Error. Please try again later!",
      },
      { status: 500 }
    );
  }
}
