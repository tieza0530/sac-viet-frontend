import { SubscribeEmail } from "./SubscribeEmail"
import logo from '../../../../../public/logo.png'
import Image from "next/image";

export const Footer = () => {
    return (
        <div className="bg-[#D3D3D3] px-20 py-10 flex justify-between text-xs">
            <div>
            <Image src={logo} alt="logo" />
            </div>
            <div>
                <p className="text-xl font-medium mb-4">Đăng ký</p>
                <SubscribeEmail />
            </div>
            <div>
                <p className="text-xl font-medium">Về chúng tôi</p>
                <p>Giới thiệu</p>
                <p>Liên hệ </p>
                <p>Tin tức đồ thủ công</p>
                <p>Câu hỏi thường gặp</p>
            </div>
            <div>
                <p className="text-xl font-medium">Tài khoản của bạn</p>
                <p>Chính sách bảo mật</p>
                <p>Điều khoản sử dụng</p>
                <p>Hướng dẫn và quy định</p>
            </div>
            <div>
                <p className="text-xl font-medium ">Hỗ Trợ khách hàng</p>
                <p>Hotline: 086.668.9999</p>
                <p>Hướng dẫn đặt hàng</p>
            </div>
        </div>
    )
}