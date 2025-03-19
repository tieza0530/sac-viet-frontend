"use client";
import { ImageLR } from "../ImageLR";
import { LoginForm } from "./LoginForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ForgetPassword } from "../forget-password/ForgetPassword";

export default function Login() {
  const router = useRouter();
  const [forgetPass, setForgetPass] = useState(false);
  return (
    <div className="px-32 grid grid-cols-12 justify-center items-center h-full">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10">
        <div className="text-3xl font-medium flex justify-center items-center">
          {!forgetPass ? <p>Đăng nhập</p> : <p>Quên mật khẩu</p>}
        </div>
        <div className="mt-10">
          {!forgetPass ? <LoginForm /> : <ForgetPassword />}
          {!forgetPass && <p className="mt-10 text-sm font-medium cursor-pointer" onClick={()=> setForgetPass(true)}>Quên mật khẩu!</p>}
          {forgetPass && <p className="mt-2 text-sm cursor-pointer font-medium" onClick={()=>  setForgetPass(false)}>Đăng nhập ngay!</p>}
          <p className="mt-2 text-sm">
            Bạn chưa có tài khoản ?
            <Button
              onClick={() => router.push("/register")}
              className="font-medium bg-inherit hover:bg-inherit text-black shadow-none pl-1 "
            >
              Đăng ký ngay !
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
