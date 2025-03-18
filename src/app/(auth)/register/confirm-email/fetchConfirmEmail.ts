import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export const fetchConfirmEmail = async ({account , email , data, accessTokenRegis, controller}: {account: string, email:string , data: {pin: string}, accessTokenRegis: string, controller :AbortController}) => {
    try {
        const res = await fetch(
            `${NEXT_PUBLIC_LOCAL}/api/post/confirm-email`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                account: account,
                email: email,
                otp: data,
                accessTokenRegis: accessTokenRegis
              }),
              signal: controller.signal,
            }
          );
          const result = await res.json()
          const status = res.status
          return {status ,result }
    } catch (error) {
        return error
    }
}