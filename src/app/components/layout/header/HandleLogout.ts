export const HandleLogout = async () => {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];
  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/post/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (res.ok) {
    window.location.reload();
    localStorage.removeItem("username");
    return true;
  } else {
    console.error("Logout failed");
    return false;
  }
};
