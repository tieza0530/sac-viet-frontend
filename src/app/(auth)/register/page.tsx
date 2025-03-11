"use client";
import Link from "next/link";
import { ImageLR } from "../ImageLR";
import { RegisterForm } from "./FormRegister";
import { InputOTPForm } from "./OtpForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export type registerProps = {
  username: string,
  phone: string,
  password: string,
  againPassword: string,
}
export default function Register() {
  const [isValue, setIsValue] = useState(false);
  const [ dataUser , setDataUser ] = useState<registerProps>({
    username: "",
    phone: "",
    password: "",
    againPassword: "",
  });
  const [checkRegister , setCheckRegister ] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if(checkRegister){
     setTimeout(() => {
      router.push('/')
     }, 5000)
    }
  }, [checkRegister , router])
  return (
    <div className="px-32 grid grid-cols-12">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10">
        <p className="text-3xl font-medium flex justify-center items-center">
          Đăng ký tài khoản
        </p>
        <div className="mt-10">
          {!isValue ? <RegisterForm  setIsValue={setIsValue} setDataUser={setDataUser}/> : <InputOTPForm  dataUser={dataUser} setCheckRegister={setCheckRegister} />}
          { !isValue && <p className="mt-2 text-sm">
            Bạn đã có tài khoản ?
            <Link href="/login" className="font-medium">
              Đăng nhập
            </Link>
          </p>}
        </div>
      </div>
    </div>
  );
}
