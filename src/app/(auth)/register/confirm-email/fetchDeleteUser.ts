import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export const fetchDeleteUser = async ({
  email,
  account,
}: {
  email: string;
  account: string;
}) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_LOCAL}/api/delete/user`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          account: account,
        }),
      }
    );
    return res.status;
  } catch (error) {
    console.log("DELETE USER ERROR", error);
  }
};
