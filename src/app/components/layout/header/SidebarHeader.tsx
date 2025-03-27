"use client"
import { Button } from "@/components/ui/button"
import { InputSearch } from "./InputSearch"
import { PiShoppingCartThin } from "react-icons/pi"
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import { useAuth } from "@/app/AuthContext";
import { useEffect } from "react";

export const SidebarHeader = () => {
  const router = useRouter();
  const { cart, listCategory } = useAuth();

  useEffect(() => {
  }, [cart])
  console.log(cart?.length);
  
  return (
    <div className="flex py-4 items-center justify-between xl:px-48 bg-white">
      <div>
        <Image src={logo} alt="logo" priority />
      </div>

      <div className="flex justify-center items-center">
        <Button onClick={() => router.replace('/')} className="bg-inherit hover:bg-inherit shadow-none text-black">Trang chủ</Button>
        <Button onClick={() => router.replace('/products')} className="bg-inherit hover:bg-inherit shadow-none text-black">
          Sản phẩm
        </Button>
        <Button onClick={() => router.replace('/contact')} className="bg-inherit hover:bg-inherit shadow-none text-black">
          Liên hệ
        </Button>
        <Button onClick={() => router.replace('/about')} className="bg-inherit hover:bg-inherit shadow-none text-black">Giới thiệu</Button>
      </div>
      <div className="flex justify-center items-center relative">
        <InputSearch />
        <div className="group">
          <div className="relative">
          <PiShoppingCartThin className="text-2xl ml-2" title="giỏ hàng" />
          <p className="absolute -top-2 text-xs -right-3 bg-red-500 text-white rounded-2xl px-1"  hidden={cart?.length === 0 || cart?.length === undefined  }>{cart?.length}</p>
          </div>
          <div className="absolute left-0 top-3 w-full h-20 group-hover:block hidden"></div>
          <div className="bg-neutral-50 p-2 shadow-md border rounded-sm absolute w-full h-96 top-10 left-0 overflow-y-scroll z-10 group-hover:block hidden">
            {cart?.length === 0 || cart?.length === undefined  && (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <PiShoppingCartThin  className="text-4xl text-neutral-400"/>
                <p className="text-neutral-400">Chưa có sản phẩm</p>
              </div>
            )}
            <p className="text-neutral-400 text-xs"  hidden={cart?.length === 0 || cart?.length === undefined  }>{cart?.length} sản phẩm thêm vào giỏ hàng</p>
            {cart?.map((value, idx) => {
                   const categorySlug = listCategory?.data.find(
                    (category) => category._id === value.category_id
                  )?.slug
              return (
                <div key={`product-in-cart-${value._id + idx}`} className="mt-2 flex cursor-pointer" onClick={() => router.push(`/${categorySlug}/${value._id}`)}>
                  <Image
                    src={`/do-tho/${value.img[0]}`}
                    alt="anh-san-pham"
                    width={60}
                    height={60}
                    className="mx-1 "
                  />
                  <div>
                    <p className="text-sm line-clamp-1">{value.name}</p>
                    <p className="text-[10px]  line-through">  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value.price)}</p>
                    <p className="text-xs mt-1 text-red-500">{new Intl.NumberFormat("vi-Vn", { style: "currency", currency: "VND" }).format((value.price / 100) * (100 - value.discount_percentage))} <span className="text-[10px]">-{value.discount_percentage}%</span></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>

  )
}