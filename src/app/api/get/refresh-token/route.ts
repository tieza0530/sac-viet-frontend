import { SECRET_KEY } from "@/app/helper/constant";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get("refreshToken")?.value || req.headers.get("refreshToken");
    
        if(!refreshToken){
            return NextResponse.json({
                message: 'No refresh token provided'
            }, {status: 401})
        }
        const decoded = jwt.verify(refreshToken , SECRET_KEY) as {id: string , account: string , email: string}
        if(!decoded){
            return NextResponse.json(
                { message: "Invalid refresh token"
                },{status: 403} )
        }
        const id = decoded.id
        const email = decoded.email
        const account = decoded.account

        const accessToken = jwt.sign({id , account ,email} , SECRET_KEY , { expiresIn: '15m'})
        return NextResponse.json({
            accessToken,
            message: 'Success'
        }, {status: 200, statusText: "Success"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({
             message: "Internal server error"
        }, {status: 500})
    }
}