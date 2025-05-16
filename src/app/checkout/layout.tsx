"use client";
import { Footer } from "@/app/components/layout/footer/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InfoUser } from "../components/layout/header/InfoUser";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roter = useRouter();
  return (
    <div className="flex flex-col min-h-screen text-[var(--color-text-root)]">

      <div className="bg-white">
        <div className="py-4 flex items-center justify-between lg:mx-24  xl:mx-48 2xl:mx-80  text-[#8B5A2B] ">
          <div
            className="flex  items-center cursor-pointer"
            onClick={() => roter.push("/")}
            title="Về trang chủ"
          >
            <Image src={"/logo_.png"} width={60} height={60} alt="logo" />
            <span className="font-bold text-3xl">
              SẮC VIỆT <span className="font-medium text-xl">| Thanh toán</span>
            </span>
          </div>
          <InfoUser />

        </div>
      </div>
      <div className="flex-1 flex items-center bg-[var(--color-bg-body)]">
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
