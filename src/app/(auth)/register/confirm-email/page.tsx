import { ImageLR } from "../../ImageLR";
import { InputOTPForm } from "./FormInputOtp";

export default function ConfirmEmail() {
  
  return (
    <div className="px-32 grid grid-cols-12">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10 w-full flex justify-center items-center">
        <div>
        <p className="text-3xl font-medium flex justify-center items-center">
          Xác nhận Email
        </p>
        <div className="mt-10 ">
          <InputOTPForm  />
        </div>
        </div>
      </div>
    </div>
  );
}