"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { PiUserListLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FetchUser } from "@/app/utils/fetchUser";
import { useAuth } from "@/app/AuthContext";
import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export const InfoUser =  () => {
const { accessToken ,setAccessToken, setDataUser , dataUser} = useAuth();
const [checkLogin, setCheckLogin] = useState(false);
const router = useRouter();

  const getData = async() =>{
    const data = await FetchUser();
    if(data === null){
      return;
    }
    if(dataUser === null){
      setDataUser(data)    
    }
    return;
  }
  getData();

  useEffect(() => {
    if (dataUser && !checkLogin) {
      setCheckLogin(true);
    }
  }, [dataUser , checkLogin]);
  
  const handleLogout = async () => {
   const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/post/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });
      if(res.status === 200){
        setAccessToken(null);
        localStorage.removeItem("account");
        localStorage.removeItem("email");
        await router.push('/')
        document.location.reload();
      }  
    };
  return (
    <div className="flex items-center justify-center">
     
      {!checkLogin ? (
        <span
          onClick={() => router.replace("/login")}
          className="flex justify-center items-center cursor-pointer py-1 hover:bg-[#f69797b9] px-1 rounded-sm  text-sm" 
          title="Nhấn để đăng nhập"
        >
          Đăng nhập <PiUserListLight className="p-0 text-2xl ml-1"/>
        </span>
      ) : (
        <div className="flex justify-center items-center cursor-pointer py-1">
            <HoverCard>
              <HoverCardTrigger className="flex items-center justify-center">
                <span className="text-sm font-medium mr-1">
                  {localStorage.getItem('account')}
                </span>
                <PiUserListLight className="text-2xl ml-1" />
              </HoverCardTrigger>
              <HoverCardContent className="mt-3 w-auto border-none mr-1 p-2 rounded-sm text-sm shadow-2xs z-10 text-black bg-white font-medium ">
                <Button onClick={()=> router.push('/user/profile')}className="w-full bg-inherit shadow-none text-black hover:bg-[#dadadaab]">Quản lý tài khoản</Button>
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
