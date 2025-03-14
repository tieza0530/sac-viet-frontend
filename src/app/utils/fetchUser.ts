import { cookies } from "next/headers";
import { ApiResponse } from "../components/type/user.type";

export  const FetchUser = async () : Promise<ApiResponse | null> => {
    const token =  (await cookies()).get("refreshToken")?.value;    
    if (!token) return null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/get/user`, {
            method: "GET",
            headers: {
                "refreshToken" : `${token}`
            },
            cache: "no-store", 
        });
        if (!res.ok) throw new Error("Unauthorized");
        return await res.json(); 
    } catch (error) {
        console.log(error);
        return null;
    }
}
