
export async function fetchConfirmForPass({email ,data ,controller } : {email: string, data: {pin: string} , controller: AbortController}) {
    console.log(email, data.pin );
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post/forget-password/confirm`, {
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