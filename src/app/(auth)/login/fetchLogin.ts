export const fetchLogin = async ({ data }: { data: { password: string; username: string } }) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL}/api/post/login`,
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
          return res.status
    } catch (error) {
        return error
    }
}