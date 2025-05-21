"use client"
import { RiFacebookFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { InfoUser } from "./InfoUser";
import { SidebarHeader } from "./SidebarHeader";


export const Header = () => {
  return (
    <div className="fixed w-full z-999">
      <div className="bg-[var(--color-background-main)]">
        <div className="mx-28 max-2xl:mx-24 max-xl:mx-20 max-lg:mx-10 flex justify-between items-center text-[var(--color-text-root)]">
          <div className="flex ml-2 text-sm">
            <RiFacebookFill />
            <RiTiktokFill className="mx-2" />
            <FiInstagram />
          </div>
          <div>
            <p className="text-sm text-[var(--color-text-root)]">
              Giao hàng toàn quốc, Freeship cho đơn hàng có giá trị trên
              3.000.000 VNĐ
            </p>
          </div>
          <InfoUser />
        </div>
      </div>
      <SidebarHeader />
      <hr />
    </div>
  );
};
