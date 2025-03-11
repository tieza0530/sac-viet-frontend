import { RiFacebookFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { InputSearch } from "../InputSearch";
import { PiUserListLight } from "react-icons/pi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Header = () => {

  return (
    <div>
      <div className="bg-[#C95050] flex justify-between items-center py-1 text-white">
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
        <div className="mr-2">
          <p className="text-sm text-red-100">Tiếng việt</p>
        </div>
      </div>
      <div className="flex py-4 items-center justify-around">
        <div>
          <Image src={logo} alt="logo" />
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
          <Link href={'/login'} className="ml-2">Đăng nhập</Link>
          <HoverCard>
            <HoverCardTrigger>
              <PiUserListLight className=" text-3xl ml-2" />
            </HoverCardTrigger>
            <HoverCardContent className="bg-white mt-1 w-auto border-none  ">
                <Link href={'#'}>Quản lý tài khoản</Link>
                <br />
                <Link href={'#'}>Đơn hàng</Link>
                <br />
                <Link href={'#'}>Đăng ký kênh bán hàng</Link>
                <br />
                <Link href={'#'}>Đánh giá của tôi</Link>
                <br />
                <Link href={'#'}>Đăng xuất</Link>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <hr />
    </div>
  );
};
