"use client"
import { Footer } from "@/app/components/layout/footer/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roter = useRouter();
  return (
    <div className="bg-[#EAE0C8] items-start h-screen">
      <div className="">
      <div className="bg-white">
        <div className="py-4 flex items-center justify-between 2xl:mx-96 text-[#8B5A2B] ">
          <div className="flex  items-center cursor-pointer" onClick={() => roter.push('/')} title="Về trang chủ">
            <Image src={'/logo_.png'} width={60} height={60} alt="logo" />
            <span className="font-bold text-3xl">SẮC VIỆT</span>
          </div>
          <div>
            <p>Bạn cần hỗ trợ gì ?</p>
          </div>
        </div>
      </div>
     <div className=""> {children}</div>
      <div><Footer /></div> 
      </div>
    </div>
  );
}
