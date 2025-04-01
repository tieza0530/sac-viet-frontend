"use client"
import { useEffect} from "react";
import { useAuth } from "../AuthContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { NEXT_PUBLIC_LOCAL } from "../helper/constant";

export default function Card() {
    const { cart, accessToken,setCart } = useAuth();
    
    useEffect(() => {
    }, [cart])
    const handleChoiseUp = async (id: string,quantityChoise: number, totalProduct: number) => {
        if(quantityChoise < totalProduct){
            quantityChoise += 1
        }
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/post/cart`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization : `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                idProduct: id,
                quantity: quantityChoise
            })
        })
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();   
        return setCart(data.data.flat());                    
    }
    const handleChoisedown = async (id: string, quantityChoise: number) => {
        if (quantityChoise > 1) {
            quantityChoise -= 1
          }
          const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/post/cart`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization : `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                idProduct: id,
                quantity: quantityChoise
            })
        })
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();            
        return setCart(data.data.flat());   
     }
     const hanldedeleteProduct =async (id: string) => {
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/delete/cart`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                Authorization : `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                idProduct: id,
            })
        })
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();            
        return setCart(data.data.flat());   
     }
    
    return (
        <div className="lg:mx-24 xl:mx-48 2xl:mx-80 min-h-screen mt-28 mb-10 rounded-sm">
            <div className="grid grid-cols-2 bg-white p-6 items-center ">
                <p className="text-2xl font-medium ">Danh sách giỏ hàng</p>
                <div className="grid grid-cols-4 text-neutral-400 text-center">
                    <p>Đơn giá</p>
                    <p>Số lượng</p>
                    <p>Số tiền</p>
                    <p>Thao tác</p>
                </div>
            </div>
            <div className="bg-white min-h-screen p-6 items-center mt-2 ">
                {cart?.map((value) => {                    

                    return (
                        <div key={`product-${value._id}`} className="grid grid-cols-2 items-center mt-4 border rounded-sm py-1" >
                            <div className="flex items-center">
                                <Image
                                    src={`/do-tho/${value.img[0]}`}
                                    alt="anh-san-pham"
                                    width={90}
                                    height={90}
                                    className="mx-1 "
                                />
                                <p className="text-sm mx-2 line-clamp-2">{value.name}</p>
                            </div>
                            <div className="grid grid-cols-4 text-center items-center">
                                <p>{new Intl.NumberFormat("vi-Vn", { style: "currency", currency: "VND" }).format((value.price / 100) * (100 - value.discount_percentage))}</p>
                                <div>
                                    <div className="flex justify-center items-center text-xl w-auto ">
                                        <Button onClick={() => handleChoisedown(value._id ,value.quantity)} className="border mr-2 bg-white text-black hover:bg-white "><IoRemoveOutline /></Button>
                                        <span className="flex justify-center items-center w-4 text-xs"> {value.quantity}</span>
                                        <Button onClick={() => handleChoiseUp(value._id ,value.quantity, value.inventory)} className="border ml-2 bg-white text-black hover:bg-white"><IoAddOutline /></Button>
                                    </div>
                                </div>
                                <p className="text-red-400">{(new Intl.NumberFormat("vi-Vn", { style: "currency", currency: "VND" }).format((value.price / 100) * (100 - value.discount_percentage) * (value.quantity)))}</p>
                                <p className="cursor-pointer" onClick={() => hanldedeleteProduct(value._id)}>Xóa</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}