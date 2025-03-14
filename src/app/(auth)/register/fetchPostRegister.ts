
export const fetchPostRegister = async ({username , email, password}: {username: string , email: string, password: string}) => {
    try { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post/register`, {
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
          if(res.status === 200) {
            localStorage.setItem("account", username)
            localStorage.setItem("email", email)
          }
          return res.status
    } catch (error) {
        return error
    }
   
}