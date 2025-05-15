import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/config/models/Product";
import Category from "@/app/config/models/Category";

export async function GET(req: NextRequest , context: { params: { category: string } }) {
  try {
    const resutlCategory = context.params.category;
    const { searchParams } = new URL(req.url);
    const resultSearch = searchParams.get("sort");

    if (!resultSearch) {
      return NextResponse.json(
        { data: [], message: "No search provided" },
        { status: 200 }
      );
    }

    const category = await Category.findOne({ slug: resutlCategory });
    const products = await Product.find({ category_id: category._id });
        if (!products) {
      return NextResponse.json({ error: "Invalid!" }, { status: 401 });
    }
     const sortedProducts = [...products];

    if (resultSearch === "price-up") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (resultSearch === "price-down") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      return NextResponse.json(
        { data: [], message: "Invalid sort option" },
        { status: 400 }
      );
    }    
    return NextResponse.json(
      {
        data: sortedProducts,
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
