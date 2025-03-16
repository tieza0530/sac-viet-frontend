
export async function fetchForgetPassword({email  } : {email: string}) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post/forget-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
           })    
           return res.status
    } catch (error) {
        console.log(error);
        
    }
 
}