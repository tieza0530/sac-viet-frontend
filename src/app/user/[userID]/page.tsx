'use client'

import NotFound from "@/app/not-found";
import { useParams, useRouter } from "next/navigation";
import { InputFormInfoUser } from "./components/FormInfoUser";
import { cn } from "@/lib/utils";
import { InputFormChangePass } from "./components/FormChangePass";
import { FormUpdateAddress } from "./components/FormUpdateAddress";

export default function Index() {
    const params = useParams()
    const route = useRouter();
      return (
      <div className="2xl:mx-80" >
        <div className="grid grid-cols-12 text-sm">
          <div className="col-span-4 flex justify-center bg-white my-10 rounded-sm mr-5">
            <div className="">
              <p className="font-medium text-[18px] pr-5 mt-10">Quản Lý Tài Khoản</p>
              <div className="ml-10 mt-2 space-y-3 text-sm font-light cursor-pointer">
              <p className={cn((params.userID === "profile") && "font-medium" )} onClick={() => route.push('/user/profile')}>Thông tin cá nhân</p>
              <p className={cn((params.userID === "address") && "font-medium" )} onClick={() => route.push('/user/address')}>Địa chỉ nhận hàng</p>
              <p  className={cn((params.userID === "change-password") && "font-medium" )} onClick={() => route.push('/user/change-password')}>Thay đổi mật khẩu</p>
              </div>
            </div>
          </div>
          <div className="col-span-8 p-20 my-10 rounded-sm bg-white">
            {(() => {
              if(params.userID === "profile"){
                return <InputFormInfoUser/>
              }else if(params.userID === 'address') {
                return <FormUpdateAddress/>
              }else if(params.userID === 'change-password'){
              return <InputFormChangePass/>
              }else{
                return NotFound()
              }
            }) ()}
          </div>
        </div>
      </div>     
    )

  }
  