import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { SECRET_KEY } from "@/app/helper/constant";
import Product from "@/app/config/models/Product";
import Card, { ListProductProps } from "@/app/config/models/Card";

export async function GET(req: NextRequest) {
const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }  
  try {
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, SECRET_KEY as string) as {id: string, email: string , account: string};

    if (decoded) {
      const findCard = await Card.findOne({ user: decoded.id})
      
      if (!findCard) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
      const findProduct = await Promise.all(
        findCard.list_products.map((value: ListProductProps) => 
          Product.find({ _id: value.productID })
        )
      );
      return NextResponse.json(
        {
          data: findProduct, 
          message: "Success",
        },
        { status: 200, statusText: "Success" }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error",
      },
      { status:500 }
    );
  }
}
