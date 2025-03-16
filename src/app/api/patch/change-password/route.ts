import User from "@/app/config/models/User";
import { connectDB } from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    await connectDB();
    try {
        const {email , password} = await req.json();
        const findUser = await User.findOne({email})
        if(!findUser && !password){
            return NextResponse.json({
                message: "Không tìm thấy tài khoản"
            },{status: 400, statusText: "Invalid"})
        }
        findUser.password = password
        await findUser.save()
        return NextResponse.json({
            message: "Cập nhật mật khẩu thành công"
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Đã xảy ra lỗi"
            },
            { status: 500, statusText: "Internal Server Error" }
        );
    }
    
}