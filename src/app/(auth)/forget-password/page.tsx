"use client"
import { useState } from "react";
import { ImageLR } from "../ImageLR";
import { InputOTPFormForget } from "./FormInputOtpFGP";
import { FormChangePassword } from "./change-password/FormChangePassword";

export default function ForgetPass() {
  const [checkConfirmForget,  setCheckConfirmForget] = useState(false)
  return (
    <div className="px-32 grid grid-cols-12">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10 w-full flex justify-center items-center">
        <div>
        <p className="text-3xl font-medium flex justify-center items-center">
          Quên mật khẩu
        </p>
        <div className="mt-10 ">
            {!checkConfirmForget ? <InputOTPFormForget setCheckConfirmForget={setCheckConfirmForget}/> : <FormChangePassword />}
        </div>
        </div>
      </div>
    </div>
  );
}