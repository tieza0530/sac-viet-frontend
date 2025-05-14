import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/config/models/Product";
import { normalizeVietnamese } from "@/app/helper/constant";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const resultSearch = searchParams.get("search");

    if (!resultSearch) {
      return NextResponse.json(
        { data: [], message: "No search provided" },
        { status: 200 }
      );
    }

  const normalizedInput = normalizeVietnamese(resultSearch).toLowerCase();
    const keywords = normalizedInput.split(" ");

    const products = await Product.find();

    if (!products) {
      return NextResponse.json({ error: "Invalid!" }, { status: 401 });
    }

  const matchedProducts = products.filter(product => {
  const name = normalizeVietnamese(product.name).toLowerCase();
  const tags = product.tags?.map((tag : string) => normalizeVietnamese(tag).toLowerCase()) || [];

  return keywords.every(word => 
    name.includes(word) ||
    tags.some((tag : string)  => tag.includes(word))
  );
});

    return NextResponse.json(
      {
        data: matchedProducts,
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
