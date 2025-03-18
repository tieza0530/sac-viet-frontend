'use client'

import { usePathname } from "next/navigation";

export default function Profile() {
    const pathname = usePathname()
    console.log(pathname.split('/'));
    
    return (
      <div className="px-20 w-full h-full">
        <div className="grid grid-cols-12  text-sm">
          <div className="col-span-4 my-10 mr-10 p-10 rounded-sm">
            <div>
              <p className="font-medium text-[18px] pr-5">Quản Lý Tài Khoản</p>
              <div className="ml-10 space-y-2">
                {["Thông tin của tôi", "Danh sách địa chỉ"].map((item, index) => (
                  <p key={index} className="group hover:font-bold cursor-pointer">{item}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-8 px-20 my-10 rounded-sm">ikyui</div>
        </div>
      </div>
    );
  }
  