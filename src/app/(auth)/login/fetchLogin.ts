import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export const fetchLogin = async ({ data }: { data: { password: string; username: string } }) => {
    try {
        const res = await fetch(
            `${NEXT_PUBLIC_LOCAL}/api/post/login`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: data.username.trim(),
                password: data.password,
              }),
            }
          );
          const result = await res.json()
          return {status : res.status , result}
    } catch (error) {
        return error
    }
}