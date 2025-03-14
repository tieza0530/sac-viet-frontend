"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchPostRegister } from "./fetchPostRegister";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSchema = z
  .object({
    username: z.string().min(2),
    email: z.string().trim().email(),
    password: z.string().min(6),
    againPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.againPassword, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["againPassword"],
  });

export function RegisterForm() {
  const route = useRouter();
  const [messageEmail, setMessageEmail] = useState("");
  const [messageAccount, setMessageAccount] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      againPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetchPostRegister(data);
    if (res === 400) {
      setMessageEmail("Email đã tồn tại.Vui lòng nhập lại!");
    } else if (res === 401) {
      setMessageAccount("Tài khoản đã tồn tại.Vui lòng nhập lại!");
    }
    if (localStorage.getItem("account")) {
      route.push("/register/confirm-email");
    }
    setTimeout(() =>{
      setMessageAccount('')
      setMessageEmail('')
    },2000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Tài khoản</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tài khoản"
                  {...field}
                  className="h-10"
                />
              </FormControl>
              <FormMessage className="absolute -bottom-4"/>
              <p className="text-red-500 text-xs absolute -bottom-4">{messageAccount}</p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-5 relative">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="h-10"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage className="absolute -bottom-4"/>
              <p className="text-red-500 text-xs absolute -bottom-4">{messageEmail}</p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mật khẩu"
                  type="password"
                  {...field}
                  className="h-10"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="againPassword"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  {...field}
                  className="h-10"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#C95050] text-white w-full mt-6 h-12 hover:bg-[#C95040]"
        >
          Đăng ký
        </Button>
      </form>
    </Form>
  );
}
