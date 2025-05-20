"use client"
import { ProductProps } from "@/app/utils/fetchProduct"
import Image from "next/image";
import { FiTrendingDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProductList = ({ listProducts }: { listProducts: ProductProps | null }) => {
  const route = useRouter()
  const [addProducts, setAddProducts] = useState(36);
  return (
    <div className="">
      <div className="grid grid-cols-6 gap-2">
        {listProducts?.data.sort(() => Math.random() - 0.5).slice(0, addProducts).map((value) => {

          return (
            <div onClick={() => route.push(`/product-details/${value._id}`)} key={`product-${value._id}`} className="relative col-span-1 p-1 rounded-sm shadow bg-white cursor-pointer" >
              <div>
                <Image src={'/do-tho/' + value.img[0]} alt={value.name} width={300}
                  height={300}
                  className="object-cover w-full h-full rounded-xs" />
              </div>
              <p className="line-clamp-2 text-[var(--color-text-root)]">{value.name}</p>
              <span className={cn("bg-[#E2962B] text-xs text-white px-1", value.discount_percentage === 0 && "hidden")}>{value.discount_percentage}% giảm giá</span>
              <div className="mt-6">
                <div className="absolute bottom-1 ">
                  <p className="text-[var(--color-text-root)] font-medium flex justify-center items-center">  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((value.price / 100) * (100 - value.discount_percentage))} {value.discount_percentage > 0 && <FiTrendingDown className="text-red-400 ml-1" />}</p>
                </div>
                <div className="absolute bottom-1 right-1">
                  <p className="text-xs flex justify-center items-center">đã bán {value.sold}</p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
      <div className="flex items-center justify-center w-full">
        <Button className="mt-10 bg-white text-[var(--color-text-root)] hover:text-[var(--color-text-root) hover:bg-neutral-100 p-6" onClick={() => setAddProducts(addProducts + 6)}>Xem thêm sản phẩm</Button>
      </div>
    </div>
  )
}