
export const fetchConfirmEmail = async ({account , email , data, controller}: {account: string, email:string , data: {pin: string}, controller :AbortController}) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL}/api/post/confirm-email`,
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
              }),
              signal: controller.signal,
            }
          );
          return res.status
    } catch (error) {
        return error
    }
}