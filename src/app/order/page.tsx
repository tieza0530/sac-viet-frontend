"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../AuthContext"
import { OrderProps } from "../config/models/Order"
import { getOrder } from "./components/fetchOrder"
import { useRouter, useSearchParams } from "next/navigation"
import { AllOrder } from "./components/AllOrder"
import { cn } from "@/lib/utils"

export default function Order() {
    const { accessToken } = useAuth()
    const [dataOrder, setDataOrder] = useState<OrderProps | undefined>()
    const searchParam = useSearchParams()
    const slugSearch = searchParam.get("slug") || "1"
    const route = useRouter()
    useEffect(() => {
        getOrder({ accessToken, setDataOrder })
    }, [accessToken])

    return (
        <div className="mx-28 max-2xl:mx-24 max-xl:mx-20 max-lg:mx-10 ">
            <div className="grid grid-cols-6 bg-white rounded-sm mt-28">
                {tabs.map((label, index) => (
                    <p
                        key={label.slug}
                        className={`col-span-1 p-6 border flex justify-center items-center font-medium cursor-pointer ${slugSearch === label.slug && "bg-neutral-100"} ${index === 0 ? "rounded-l-sm" : index === tabs.length - 1 ? "rounded-r-sm" : ""}`}
                        onClick={() => route.push(`/order?slug=${label.slug}`)}
                    >
                        {label.type}
                    </p>
                ))}
            </div>
            <div className={cn(" w-full min-h-96 mt-2 rounded-sm mb-10" , !dataOrder?.list_orders.length && "bg-white")}>
                {slugSearch === "1" && <AllOrder dataOrder={dataOrder} />}
            </div>
        </div>
    )
}

export const tabs = [
    { type: "Tất cả", slug: "1"  ,status: "all"},
    { type: "Đang xử lý", slug: "2" ,status: "pending"},
    { type: "Vận chuyển", slug: "3" ,status: "shipped"},
    { type: "Hoàn thành", slug: "4" ,status: "delivered"},
    { type: "Đã giao", slug: "5" ,status: "cancelled"},
    { type: "Trả hàng/hoàn tiền", slug: "6" ,status: "returned"},

];

export const handleTag = (value: string): string | undefined => {
    const tab = tabs.find(v => v.status === value);
    return tab?.type;
};