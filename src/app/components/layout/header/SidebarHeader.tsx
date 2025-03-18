"use client"
import { Button } from "@/components/ui/button"
import { InputSearch } from "./InputSearch"
import { PiShoppingCartThin } from "react-icons/pi"
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../../public/logo.png";

export const SidebarHeader = () => {
      const router = useRouter();
    
    return(
        <div className="flex py-4 items-center justify-around">
        <div>
          <Image src={logo} alt="logo" priority  />
        </div>
        <div>
          <Button onClick={() => router.replace('/')} className="bg-inherit hover:bg-inherit shadow-none text-black">Trang chủ</Button>
          <Button  onClick={() => router.replace('/products')} className="mx-6 bg-inherit hover:bg-inherit shadow-none text-black">
            Sản phẩm
          </Button>
          <Button onClick={() => router.replace('/contact')} className="mr-6 bg-inherit hover:bg-inherit shadow-none text-black">
            Liên hệ
          </Button>
          <Button  onClick={() => router.replace('/about')} className="bg-inherit hover:bg-inherit shadow-none text-black">Giới thiệu</Button>
        </div>
        <div className="flex justify-center items-center">
        <InputSearch />
        <PiShoppingCartThin className="text-2xl ml-2" title="giỏ hàng"/> </div>
      </div>
    )
}