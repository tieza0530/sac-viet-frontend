"use client"

import { useAuth } from "../AuthContext"
import NotFound from "../not-found";
import { ProductListInCategory } from "./components/ProductList";

export default function Category() {
    const { listProducts } = useAuth()
    return (
        <div>
            {listProducts ?
                (<div className="lg:mx-24 xl:mx-48 2xl:mx-80 pt-28">
                    <ProductListInCategory listProducts={listProducts} />
                </div>) :
                <NotFound />
            }
        </div>
    )
}