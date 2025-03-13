import { RiFacebookFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Link from "next/link";
import { InfoUser } from "./InfoUser";
import { FetchUser } from "@/app/utils/fetchUser";
import { PiShoppingCartThin } from "react-icons/pi";
import { InputSearch } from "./InputSearch";

export const Header = async () => {
    const data = await FetchUser();    
  return (
    <div>
      <div className="bg-[#C95050] flex justify-around items-center py-1 text-white">
        <div className="flex ml-2 text-sm">
          <RiFacebookFill />
          <RiTiktokFill className="mx-2" />
          <FiInstagram />
        </div>
        <div>
          <p className="text-sm text-red-100">
            Giao hàng toàn quốc, Freeship cho đơn hàng có giá trị trên 
            3.000.000 VNĐ
          </p>
        </div>
        <InfoUser data={data}/>
      </div>
      <div className="flex py-4 items-center justify-around">
        <div>
          <Image src={logo} alt="logo" priority  />
        </div>
        <div>
          <Link href={"/"}>Trang chủ</Link>
          <Link href={"/products"} className="mx-6">
            Sản phẩm
          </Link>
          <Link href={"/contact"} className="mr-6">
            Liên hệ
          </Link>
          <Link href={"/about"}>Giới thiệu</Link>
        </div>
        <div className="flex justify-center items-center">
        <InputSearch />
        <PiShoppingCartThin className="text-2xl ml-2" title="giỏ hàng"/> </div>
      </div>
      <hr />
    </div>
  );
};
