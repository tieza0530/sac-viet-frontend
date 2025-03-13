export const fetchPostRegister = async ({username , phone, password}: {username: string , phone: string, password: string}) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/post/api/register`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              account: username,
              phone: phone,
              password: password,
            }),
          });
          if(res.status === 200) {
            localStorage.setItem("username", username)
          }
    } catch (error) {
        console.log("Error Register", error);
    }
   
}