import User from "@/app/config/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/config/mongoose";

export async function GET(req: NextRequest) {
  await connectDB();
  const refreshToken =
    req.cookies.get("refreshToken")?.value || req.headers.get("refreshToken");
  
  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
    
    if (decoded) {
      const findUser = await User.findOne({ token: refreshToken }).select("-password -token");
      
      if (!findUser) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
      return NextResponse.json(
        {
          data: findUser,
          message: "Success",
        },
        { status: 201, statusText: "Success" }
      );
    }
    return console.log("Failed");
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        message: "Error",
      },
      { status: 400, statusText: "Failed" }
    );
  }
}
