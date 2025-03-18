import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export const fetchPostRegister = async ({username , email, password}: {username: string , email: string, password: string}) => {
    try { 
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/post/register`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              account: username,
              email: email,
              password: password,
            }),
          });
          const data = await res.json()
          if(res.status === 200) {
            localStorage.setItem("account", username)
            localStorage.setItem("email", email)      
            localStorage.setItem("accessToken" , data.accessToken) 
          }
          return res.status
    } catch (error) {
        return error
    }
   
}