import UserInfo from "@/app/config/models/InfoUser";
import User from "@/app/config/models/User";
import { SECRET_KEY } from "@/app/helper/constant";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const { idx } = await req.json();
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY as string) as {id: string, email: string , account: string};
    
  
    const UpdateinfoUser = await UserInfo.findOne({user: decoded.id});

    if (!UpdateinfoUser) {
        return NextResponse.json({ message: "Không tìm thấy thông tin user!" }, { status: 404 });
    }

    UpdateinfoUser.address.splice(idx, 1);

    await UpdateinfoUser.save();

    const data = await User.findOne({ _id: decoded.id }).select("-password -token").populate("info");      
    
    return NextResponse.json({ message: "Cập nhật thành công!", data });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
