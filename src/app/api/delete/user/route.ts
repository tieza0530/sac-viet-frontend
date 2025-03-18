import Otp from "@/app/config/models/Otp";
import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const { email, account } = await req.json();
    if (!email || !account) {
      return NextResponse.json(
        { message: "Missing email or account!" },
        { status: 400 }
      );
    }

    const findUser = await User.findOneAndDelete({
      email,
      account,
      authenticated: false,
    });
    const findUserOTP = await Otp.findOneAndDelete({ email });

    if (!findUser && !findUserOTP) {
      return NextResponse.json({ message: "NotFound !" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: "Delete Success!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500, statusText: "Error!!" }
    );
  }
}
