"use client"
import { CategoryProps, ProductProps } from "@/app/utils/fetchProduct"
import Image from "next/image";
import { FiTrendingDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { OptionPrice } from "./OptionPrice";
import { PaginationProducts } from "./Pagination";
import { GiCardboardBox } from "react-icons/gi";
import CategoryDetails from "./CategoryDetails";

export const ProductListInCategory = ({ listProducts, listCategory }: { listProducts: ProductProps | null, listCategory: CategoryProps | null }) => {
  const route = useRouter()
  return (
    <div className="grid grid-cols-4 mt-10">
      <div className="col-span-1 mr-4">
        <CategoryDetails />
        <p className="text-xl font-medium mt-6">Sắp xếp theo:</p>
        <OptionPrice />
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-4 gap-2 ">
          {listProducts?.data.length ?
            listProducts?.data.map((value) => {
              const categorySlug = listCategory?.data.find(
                (category) => category._id === value.category_id
              )?.slug

              return (
                <div onClick={() => route.push(`/${categorySlug ? categorySlug : "product-details"}/${value._id}`)} key={`product-${value._id}`} className="relative col-span-1 p-1 rounded-sm shadow bg-white cursor-pointer" >
                  <div>
                    <Image src={'/do-tho/' + value.img[0]} alt={value.name} width={300}
                      height={300}
                      className="object-cover w-full h-full rounded-xs" />
                  </div>
                  <p className="line-clamp-2 text-[var(--color-text-root)]">{value.name}</p>
                  <span className={cn("bg-[#E2962B] text-xs text-white px-1", value.discount_percentage === 0 && "hidden")}>{value.discount_percentage}% giảm giá</span>
                  <div className="mt-6">
                    <div className="absolute bottom-1 ">
                      <p className="text-[var(--color-text-root)] font-medium flex justify-center items-center">{((value.price / 100) * (100 - value.discount_percentage)).toLocaleString("vi-VN")}đ {value.discount_percentage > 0 && <FiTrendingDown className="text-red-400 ml-1" />}</p>
                    </div>
                    <div className="absolute bottom-1 right-1">
                      <p className="text-xs flex justify-center items-center">đã bán {value.sold}</p>
                    </div>
                  </div>
                </div>
              )
            }) :
            <div className="col-span-4 flex flex-col justify-center items-center mt-20">
              <GiCardboardBox className="text-6xl" />
              <p>Chưa có sản phẩm nào trên sàn.</p>
              <p>Vui lòng chọn danh mục khác hoặc quay lại sau.</p>

            </div>
          }

        </div>
      </div>
      <div className="flex col-span-4 justify-center items-center my-10">
        {listProducts && listProducts.totalPages > 1 && <PaginationProducts />}
      </div>
    </div>
  )
}