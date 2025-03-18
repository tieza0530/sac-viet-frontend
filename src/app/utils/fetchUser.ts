"use client"
import { ApiResponse } from "../components/type/user.type";
import { useAuth } from "@/app/AuthContext";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_LOCAL } from "../helper/constant";
import { getNewAccessToken } from "./getNewAccessToken";

export  const FetchUser =  () => {
    const { accessToken , setAccessToken } = useAuth();
    const [user, setUser] = useState<ApiResponse | null>(null);
    const [newAccessToken , setNewAccessToken] = useState('')
    useEffect(()=> {
    const getUser = async ()=>{
        try {
            if(accessToken === null){
               const res = await getNewAccessToken()               
               setNewAccessToken(res?.data.accessToken);
               setAccessToken(res?.data.accessToken)
               if(res?.status === 401 || res?.status === 403 || res?.status === 500  ){
                localStorage.removeItem("account")
                localStorage.removeItem("email")
               }
               
            }
            if(newAccessToken || accessToken){                
            const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken || newAccessToken}`
                },
                cache: "no-store", 
            });
            if (!res.ok) throw new Error("Unauthorized");
            const data = await res.json();             
            return setUser(data)
        }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
        getUser();
    }, [accessToken ,newAccessToken , setAccessToken])

    return user
   
}

