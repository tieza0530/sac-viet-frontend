"use client"

import { useAuth } from "@/app/AuthContext"
import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant"
import { ProductProps } from "@/app/utils/fetchProduct"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function OptionPrice() {
  const [selectedChoice, setselectedChoice] = useState("")
  const { setListProducts } = useAuth();
  const route = useRouter()
  const param = useParams()
  const paramPage = useSearchParams();
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          // route.push(`/${param.category}?page=${paramPage.get('page') || 1}${selectedChoice && `&sort=${selectedChoice}`}`)
          const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/product-follow-category?typeCategory=${param.category}&page=${paramPage.get("page") || 1}&sort=${selectedChoice}`, {
            method: "GET",
            cache: "no-store",
          });

          if (!res.ok) throw new Error("Unauthorized");
          const result = await res.json();
          const data: ProductProps = result;
          setListProducts(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
  }, [param.category, paramPage, route ,selectedChoice, setListProducts]);

  return (
    <RadioGroup className="mt-4" value={selectedChoice}
      onValueChange={(value) => setselectedChoice(value)}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="price-up" id="price-up" />
        <Label htmlFor="price-up">Giá từ thấp tới cao</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="price-down" id="price-down" />
        <Label htmlFor="price-down">Giá từ cao tới thấp</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="best-selling" id="best-selling" />
        <Label htmlFor="best-selling">Bán chạy nhất</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="biggest-discount" id="biggest-discount" />
        <Label htmlFor="biggest-discount">Giảm giá nhiều</Label>
      </div>

    </RadioGroup>
  )
}
