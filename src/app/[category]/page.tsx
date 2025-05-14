"use client"

import { useParams } from "next/navigation";
import { useAuth } from "../AuthContext"
import { ProductListInCategory } from "./components/ProductList";

export default function Category() {
    const { listProducts ,listCategory }  = useAuth()

    const param = useParams()
    return(
        <div className="lg:mx-24 xl:mx-48 2xl:mx-80 pt-28">
            <p className="text-3xl font-bold text-[var(--color-text-root)] flex justify-center items-center pt-10">Danh sách sản phẩm {listCategory?.data.filter(value =>value.slug === param.category).map(value => value.name)}</p>
           <ProductListInCategory listCategory={listCategory}  listProducts={listProducts}/>
        </div>
    )
}