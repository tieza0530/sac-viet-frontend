import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export async function fetchConfirmForPass({email ,data ,controller } : {email: string, data: {pin: string} , controller: AbortController}) {    
    try {
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/post/forget-password/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                otp: data.pin
            }),
            signal: controller.signal,
        })    
           return res.status
    } catch (error) {
        console.log(error);
    }
 
}