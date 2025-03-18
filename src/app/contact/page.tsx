"use client"
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FormContact } from "./components/FormContact";
import { BreadCrumb } from "./components/BreadCrumb";


export default function Contact() {
  return (
    <div className="px-20">
      <div>
       <BreadCrumb />
      </div>
      <div className="grid grid-cols-12 bg-[#F2F2F2] text-sm">
        <div className="col-span-4 bg-white my-10 mr-10 p-10 rounded-sm">
          <div>
            <div className="flex items-center">
              <BiSolidPhoneCall className="text-3xl text-[#C95050] " />
              <p className="font-medium text-xl ml-4">Liên hệ với chúng tôi</p>
            </div>
            <p className="my-4">Chúng tôi luôn sẵn sàng 24/7</p>
            <p>Hotline: 086.668.9999</p>
          </div>
          <div className="mt-10">
            <div>
              <div className="flex items-center">
                <MdEmail className="text-3xl text-[#C95050] " />
                <p className="font-medium text-xl ml-4">
                  Gửi email cho chúng tôi
                </p>
              </div>
              <p className="my-4">
                Hãy điền vào mẫu của chúng tôi và chúng tôi sẽ liên hệ với bạn
                trong vòng 24 giờ
              </p>
              <p className="mb-2">Email: sacviet.support@gmail.com</p>
              <p>Email: sacviet.contact@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col-span-8 px-20 bg-white my-10 rounded-sm">
          <FormContact />
        </div>
      </div>
    </div>
  );
}
