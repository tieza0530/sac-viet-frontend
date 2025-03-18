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
import { useState } from "react";
import { ShowPassword } from "@/app/helper/ShowPassword";
import { fetchChangePassword } from "./fetchChangePassword";

const FormSchema = z
  .object({
    newPassword: z.string().min(6),
    newPasswordAgain: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.newPasswordAgain, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["againPassword"],
  });

export function FormChangePassword() {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      newPasswordAgain: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetchChangePassword({newPassword :data.newPassword})
    if (res === 200) {
      route.push("/login");
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
                <div className="relative">
                <FormControl>
                  <Input
                    type={!showPassword ? "password" : "text"}
                    placeholder="nhập mật khẩu mới"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <ShowPassword
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                  />
                </div>
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
                <div className="relative">
                  <FormControl>
                    <Input
                     type={!showPassword ? "password" : "text"}
                      placeholder="nhập lại mật khẩu mới"
                      {...field}
                      autoComplete="new-again-password"
                    />
                  </FormControl>
                  <ShowPassword
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-2/3 bg-[#c95050] hover:bg-[#e79292e5] mt-6"
          >
            Thay đổi
          </Button>
        </form>
      </Form>
    </div>
  );
}
