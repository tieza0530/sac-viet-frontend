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
import { phoneRegex } from "@/app/contact/FormContact";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().trim().regex(phoneRegex , 'Số điện thoại không hợp lệ!')
  ,
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  againPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      phone: '',
      password: "",
      againPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
                <Input placeholder="Nhập tài khoản" {...field}   className="h-10"/>
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
                <Input placeholder="Số điện thoại" {...field}  className="h-10" />
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
                <Input placeholder="Mật khẩu" {...field}  className="h-10"/>
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
                <Input placeholder="Nhập lại mật khẩu" {...field}  className="h-10"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#C95050] text-white w-full mt-6 h-12">Đăng ký</Button>
      </form>
    </Form>
  );
}
