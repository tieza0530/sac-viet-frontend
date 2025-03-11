import { NextRequest, NextResponse } from "next/server";
import Contact from "@/app/config/models/Contact";
import { connectDB } from "@/app/config/mongoose";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { name, email, phone, message } = await req.json();
    const newSend = await Contact.create({ name, email, phone, message });
    return NextResponse.json(
      {
        data: newSend,
        message: "Success",
      },
      { status: 200, statusText: "Success" }
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
