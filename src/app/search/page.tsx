"use client"

import { ParamValue } from "next/dist/server/request/params";
import { NEXT_PUBLIC_LOCAL } from "../helper/constant";
import { ProductProps } from "../utils/fetchProduct";
import { useAuth } from "../AuthContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ProductListInCategory } from "../[category]/components/ProductList";

export default function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { setListProducts, listProducts , listCategory } = useAuth()
  useEffect(() => {
   const getProductSearch = async (param : ParamValue) => {
      try{
          const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/search?search=${param}`, {
            method: "GET",
            cache: "no-store",
          });
  
          if (!res.ok) throw new Error("Unauthorized");
          const data: ProductProps = await res.json();
          return setListProducts(data)
        
      } catch (error) {
        console.log(error);
        return null;
      }
    }; 
  
    if(search){
      getProductSearch(search)
    }
    }, [search , setListProducts])
    
    return (
         <div className="lg:mx-24 xl:mx-48 2xl:mx-80 pt-28">
             <p className="text-3xl font-bold text-[var(--color-text-root)] flex justify-center items-center pt-10">Kết quả tìm kiếm {search}</p>
            {listProducts?.data.length  ? <ProductListInCategory listCategory={listCategory}  listProducts={listProducts}/> : "Không tìm thấy sản phẩm phù hợp!"}
         </div>
    );
  }
  