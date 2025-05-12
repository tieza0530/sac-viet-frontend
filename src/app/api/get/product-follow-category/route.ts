import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/config/models/Product";
import Category from "@/app/config/models/Category";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeCategory = searchParams.get("typeCategory");
    const category = await Category.findOne({ slug: typeCategory });
    const products = await Product.find({ category_id: category._id });
    if (!products) {
      return NextResponse.json({ error: "Invalid!" }, { status: 401 });
    }
    return NextResponse.json(
      {
        data: products,
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
