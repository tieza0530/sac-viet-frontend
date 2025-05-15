"use client"

import { useAuth } from "../AuthContext"
import { ProductListInCategory } from "./components/ProductList";

export default function Category() {
    const { listProducts ,listCategory }  = useAuth()

    return(
        <div className="lg:mx-24 xl:mx-48 2xl:mx-80 pt-28">
           <ProductListInCategory listCategory={listCategory}  listProducts={listProducts}/>
        </div>
    )
}