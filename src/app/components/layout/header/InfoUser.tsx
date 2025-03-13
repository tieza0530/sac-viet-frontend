"use client";
import { ApiResponse } from "@/app/components/type/user.type";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { PiUserListLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HandleLogout } from "./HandleLogout";

export const InfoUser = ({ data }: { data: ApiResponse | null }) => {
  const [checkLogin, setCheckLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data && !checkLogin) {
      setCheckLogin(true);
    }
  }, [data , checkLogin]);
  
  const handleLogout = async () => {
         HandleLogout()
  };
  return (
    <div className="flex items-center justify-center">
     
      {!checkLogin ? (
        <Button
          onClick={() => router.push("/login")}
          className="flex justify-center items-center cursor-pointer py-1 mr-4 bg-inherit hover:bg-[#f69797b9]  text-sm" 
          title="Nhấn để đăng nhập"
        >
          Đăng nhập <PiUserListLight className="p-0 text-2xl"/>
        </Button>
      ) : (
        <div className="flex justify-center items-center cursor-pointer py-1 mr-4">
            <HoverCard>
              <HoverCardTrigger className="flex items-center justify-center">
                <span className="text-sm font-medium mr-1">
                  {data?.data.account}
                </span>
                <PiUserListLight className="text-2xl ml-1" />
              </HoverCardTrigger>
              <HoverCardContent className="mt-3 w-auto border-none mr-1 p-2 rounded-sm text-sm shadow-2xs z-10 text-black bg-white font-medium ">
                <Button className="w-full bg-inherit shadow-none text-black hover:bg-[#dadadaab]">Quản lý tài khoản</Button>
                <br />
                <Button className="w-full bg-inherit shadow-none text-black hover:bg-[#dadadaab]" >Đơn hàng</Button>
                <br />
                <Button className="w-full bg-inherit shadow-none text-black hover:bg-[#dadadaab]" >Đăng ký kênh bán hàng</Button>
                <br />
                <Button  className="w-full bg-inherit shadow-none text-black hover:bg-[#dadadaab]">Đánh giá của tôi</Button>
                <br />
                <Button onClick={() => handleLogout()} className="w-full bg-inherit shadow-none text-black hover:bg-[#dadadaab]">
                  Đăng xuất
                </Button>
              </HoverCardContent>
            </HoverCard>
          </div>
      )}
    </div>
  );
};
