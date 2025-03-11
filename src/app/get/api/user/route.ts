
import User from "@/app/config/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const listUsers = await User.find()
      if(listUsers){
        return NextResponse.json(
            {
              data: listUsers,
              message: "Success",
            },
            { status: 201, statusText: "Success" }
          );
      }  
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