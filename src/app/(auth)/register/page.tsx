"use client"
import { useState } from "react";
import { ImageLR } from "../ImageLR";
import { RegisterForm } from "./FormRegister";


import Link from "next/link";
import { InputOTPForm } from "./confirm-email/FormInputOtp";

export default  function Register() {
  const [checkRegister , setCheckRegistor] = useState(false);
  return (
    <div className="px-32 grid grid-cols-12 h-full justify-center items-center">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10">
        <p className="text-3xl font-medium flex justify-center items-center">
          Đăng ký tài khoản
        </p>
        <div className="mt-10">
          {!checkRegister ?<RegisterForm setCheckRegistor={setCheckRegistor}/> : <InputOTPForm />}
          <p className="mt-2 text-sm">
            Bạn đã có tài khoản ?
            <Link href={'/login'} className="font-medium bg-inherit hover:bg-inherit text-black shadow-none pl-1 ">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
