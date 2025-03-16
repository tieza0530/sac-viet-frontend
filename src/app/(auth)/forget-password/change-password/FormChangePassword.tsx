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
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  newPassword: z.string().min(6),
  newPasswordAgain: z.string().min(6)
}).refine((data) => data.newPassword === data.newPasswordAgain, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["againPassword"],
  })

export function FormChangePassword() {
    const route = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/patch/change-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: data.newPassword,
            email: localStorage.getItem("email")
        })
    })
    if(res.status ===200){
        route.push('/login')
    }
  }


  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input placeholder="nhập mật khẩu mới" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPasswordAgain"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="nhập lại mật khẩu mới" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-2/3 bg-[#c95050] hover:bg-[#e79292e5] mt-6">Thay đổi</Button>
      </form>
    </Form>
    </div>
  );
}
