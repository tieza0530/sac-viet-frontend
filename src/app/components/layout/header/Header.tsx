import { RiFacebookFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { InfoUser } from "./InfoUser";
import { SidebarHeader } from "./SidebarHeader";


export const Header = async () => {      
  return (
    <div>
      <div className="bg-[#C95050] flex justify-between items-center py-1 text-white px-20">
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
        <InfoUser />
      </div>
      <SidebarHeader />
      <hr />
    </div>
  );
};
