"use client"
import { ImageLR } from "../ImageLR";
import { LoginForm } from "./LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function Login() {
  const router = useRouter();
    useEffect(()=> {
      if(localStorage.getItem('username')){
        router.push('/')
      }
    },[router])
  return (
    <div className="px-32 grid grid-cols-12">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10">
        <p className="text-3xl font-medium flex justify-center items-center">Đăng nhập</p>
        <div className="mt-10">
        <LoginForm />
        <p className="mt-2 text-sm">Bạn chưa có tài khoản ? <Button onClick={() =>router.push('/register')} className="font-medium bg-inherit hover:bg-inherit text-black shadow-none pl-1 ">Đăng ký ngay !</Button></p>
        </div>
      </div>
    </div>
  );
}
