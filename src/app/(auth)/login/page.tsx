import Link from "next/link";
import { ImageLR } from "../ImageLR";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <div className="px-32 grid grid-cols-12">
      <div className="col-span-8 p-10">
        <ImageLR />
      </div>
      <div className="col-span-4 p-10">
        <p className="text-3xl font-medium flex justify-center items-center">Đăng nhập</p>
        <div className="mt-10">
        <LoginForm />
        <p className="mt-2 text-sm">Bạn chưa có tài khoản ? <Link href="/register" className="font-medium">Đăng ký ngay !</Link></p>
        </div>
      </div>
    </div>
  );
}
