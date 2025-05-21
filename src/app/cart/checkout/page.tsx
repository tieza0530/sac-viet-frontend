"use client"

import DeliveryAddress from "@/app/checkout/components/DeliveryAddress";
import { GroupedProductsProps } from "../page";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Checkout() {
    const [selectedProducts, setSelectedProducts] = useState<GroupedProductsProps>()
    const [typePay, setTypePay] = useState("");
    const [totalMoneyShip, setTotalMoneyShip] = useState(0)
    console.log(typePay);
    
    useEffect(() => {
        const data = localStorage.getItem("selectedProducts");
        if (data) {
            setSelectedProducts(JSON.parse(data))
            setTotalMoneyShip(0)
        }
    }, [])

    return (
        <div className="mx-28 max-2xl:mx-24 max-xl:mx-20 max-lg:mx-10 mt-32">
            <DeliveryAddress />
            <div className="bg-white p-6 rounded-xl mt-4 mb-4">
                <div className="grid grid-cols-6">
                    <div className="col-span-3">
                        <p className="text-xl font-medium">Sản phẩm</p>
                    </div>
                    <div className="col-span-1">
                        <p>Đơn giá</p>
                    </div>
                    <div className="col-span-1">
                        <p>Số lượng</p>
                    </div>
                    <div className="col-span-1">
                        <p>Thành tiền</p>
                    </div>
                </div>
                {selectedProducts?.map((group) => (
                    <div key={`seller-${group.seller?.data._id}`} className=" my-6">
                        <div className="font-semibold text-lg mb-2 grid grid-cols-6 ">
                            <label className="flex items-center col-span-6">{group.seller?.data.nameShop} | <span className="flex items-center text-sm" ><BsFillChatSquareTextFill className="mr-1 ml-4" />chat ngay</span></label>
                        </div>
                        {group.products?.map((value) => (
                            <div key={`product-${value._id}`} className="grid grid-cols-6 ">
                                <div className="col-span-3">
                                    <div className="flex my-2">
                                        <Image src={`/do-tho/${value.img[0]}`} alt={`${value.name}`} width={48} height={48} />
                                        <div>
                                            <p className="text-ellipsis line-clamp-1 mx-2">{value.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className=" mt-2">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value.price)}</div>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center mt-2 text-xl w-auto ">
                                        <span className="flex justify-center items-center w-6 text-sm"> {value.quantity}</span>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="mt-2">
                                        <p className="">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((value.quantity * value.price))}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="flex justify-between items-center pr-16 border-y">
                    <p className="text-xl font-medium py-6">Phương thức thanh toán </p>
                    <Select defaultValue="cod" onValueChange={setTypePay}>
                        <SelectTrigger className="w-auto">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectItem value="cod" >Thanh toán khi nhận hàng</SelectItem>
                                <SelectItem value="bank-transfer">Thanh toán chuyển khoản</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                    <div className="flex justify-end pr-16">
                <div>
                    <p className="my-4">
                        Tổng tiền hàng:
                        <span className="ml-2">
                            {
                                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                    selectedProducts?.reduce((total, group) => {
                                        return total + (group.products?.reduce((sum, product) => {
                                            return sum + product.price * product.quantity;
                                        }, 0) || 0);
                                    }, 0) || 0 
                                )
                            }
                        </span>
                    </p>
                    <p className="mb-4">Tổng tiền vận chuyển: <span className="ml-2">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((totalMoneyShip))}</span></p>
                      <p className="my-4">
                        Tổng thanh toán:
                        <span className="ml-2 text-xl">
                            {
                                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                    totalMoneyShip +( selectedProducts?.reduce((total, group) => {
                                        return total   + (group.products?.reduce((sum, product) => {
                                            return sum + product.price * product.quantity;
                                        }, 0) || 0);
                                    }, 0) || 0 )
                                )
                            }
                        </span>
                    </p>
                </div>
            </div>
            </div>
        
            <div className="flex justify-between items-center border-t sticky bottom-0 p-6 pr-16 mb-10 bg-white rounded-sm">
                <p className="text-xs">Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Sắc Việt</p>
                <Button className="bg-[var(--color-button)] hover:bg-[var(--color-hover-button)] text-white w-32 rounded-sm">Đặt hàng</Button>
            </div>
            {/* 
            <div className="flex justify-end pr-16  py-6 border-b">
                <p className="text-xl font-medium">Tổng tiền ({quantityChoise} sản phẩm):</p>
                <p className="text-red-500 ml-2 text-xl">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((quantityChoise * product.data[0].price))}</p>
            </div>
        */}
        </div>
    )
}