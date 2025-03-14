export const HandleLogout = async () => {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (res.ok) {
    window.location.reload();
    localStorage.removeItem("account");
    localStorage.removeItem("email");
    return true;
  } else {
    console.error("Logout failed");
    return false;
  }
};
