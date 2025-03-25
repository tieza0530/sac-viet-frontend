"use client"
import { useParams } from "next/navigation"

export default function Category() {
    const param = useParams();
    console.log(param.category);
    
    return(
        <div>
           <p>{param.category}</p> 
        </div>
    )
}