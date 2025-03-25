import { NextResponse } from "next/server";
import { connectDB } from "@/app/config/mongoose";
import Article from "@/app/config/models/Article";

export async function GET() {
    await connectDB()
  try {
      const article = await Article.find()
      if (!article) {
        return NextResponse.json({ error: "Invalid!" }, { status: 401 });
      }
      return NextResponse.json(
        {
          data: article, 
          message: "Success",
        },
        { status: 200 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500 }
    );
  }
}
