import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";

export const fetchResendOTP = async () => {
  try {
    await fetch(`${NEXT_PUBLIC_LOCAL}/api/patch/confirm-email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
