export const FetchPostContact = async ({
  username,
  accountEmail,
  phone,
  message,
}: {
  username: string;
  accountEmail: string;
  phone: string;
  message: string;
}) => {
  await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      email: accountEmail,
      phone: phone,
      message: message,
    }),
  });
};
