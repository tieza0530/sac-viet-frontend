import { CategoryProps, ProductProps } from "@/app/utils/fetchProduct"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FiTrendingDown } from "react-icons/fi";
import { RiFireFill } from "react-icons/ri";

export const TopProductsSold = ({ listProducts, listCategory }: { listProducts: ProductProps | null, listCategory: CategoryProps | null }) => {
    const sortProducts = listProducts?.data.sort((a, b) => b.sold - a.sold)
    const route = useRouter()
    return (
        <div className=" w-full">
            <p className="text-3xl font-medium text-[var(--color-text-root)] flex justify-center items-center py-10">
                Top sản phẩm bán chạy
            </p>
            <div className="grid grid-cols-6 gap-2">
                {sortProducts?.slice(0, 6).map((value, idx) => {
                    const categorySlug = listCategory?.data.find(
                        (category) => category._id === value.category_id
                    )?.slug;

                    return (
                        <div
                            key={`product-${value._id}`}
                            onClick={() =>
                                route.push(
                                    `/${categorySlug ? categorySlug : "product-details"}/${value._id}`
                                )
                            }
                            className="relative col-span-1 p-1 rounded-sm shadow bg-white cursor-pointer"
                        >
                            {idx < 3 &&
                            <div className="absolute -top-5 -left-4 ">
                                <div className="w-12 h-12 text-amber-600 relative">
                                    <RiFireFill className="w-full h-full" />
                                    <p className="absolute inset-0 mt-1 flex items-center justify-center text-white text-sm font-bold">
                                        {idx + 1}
                                    </p>
                                </div>
                                </div>
                            }

                            <Image
                                src={"/do-tho/" + value.img[0]}
                                alt={value.name}
                                width={300}
                                height={300}
                                className="object-cover rounded-xs"
                            />
                            <p className="line-clamp-2 text-[var(--color-text-root)]">{value.name}</p>
                            <span
                                className={cn(
                                    "bg-[#E2962B] text-xs text-white px-1",
                                    value.discount_percentage === 0 && "hidden"
                                )}
                            >
                                {value.discount_percentage}% giảm giá
                            </span>
                            <div className="mt-6">
                                <div className="absolute bottom-1">
                                    <p className="text-[var(--color-text-root)] font-medium flex justify-center items-center">
                                        {new Intl.NumberFormat("vi-VN" , {style: "currency", currency: "VND"}).format((value.price / 100) * (100 - value.discount_percentage))}
                                        {value.discount_percentage > 0 && (
                                            <FiTrendingDown className="text-red-400 ml-1" />
                                        )}
                                    </p>
                                </div>
                                <div className="absolute bottom-1 right-1">
                                    <p className="text-xs flex justify-center items-center">đã bán {value.sold}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )

}