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
import { phoneRegex } from "@/app/contact/components/FormContact";
import { fetchPostRegister } from "./fetchPostRegister";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "tài khoản phải nhiều hơn 2 ký tự",
    }),
    phone: z.string().trim().regex(phoneRegex, "Số điện thoại không hợp lệ!"),
    password: z.string().min(6, {
      message: "Mật khẩu phải dài hơn 6 ký tự",
    }),
    againPassword: z.string().min(6, {
      message: "Mật khẩu phải dài hơn 6 ký tự",
    }),
  })
  .refine((data) => data.password === data.againPassword, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["againPassword"],
  });


export function RegisterForm() {
  const route = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      phone: "",
      password: "",
      againPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   await fetchPostRegister(data);
   if(localStorage.getItem('username') ){
    route.push('/')
    route.refresh();
   }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tài khoản</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tài khoản"
                  {...field}
                  className="h-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Số điện thoại"
                  {...field}
                  className="h-10"
                  autoComplete="tel"
                />
              </FormControl>
              <FormMessage />
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
