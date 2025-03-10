import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function  NotFound(){
    return(
        <div className="flex justify-center items-center py-52">
            <div>
            <p className="text-9xl font-medium">404 Not Found</p>
            <div  className="flex justify-center items-center mt-16 mb-1">
            <Button className="bg-[#C95050] text-white "> <Link href={'/'}>Quay về Trang chủ</Link></Button>
            </div>
            </div>
        </div>
    )
}