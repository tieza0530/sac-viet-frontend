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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { registerProps } from "./page";
import { Dispatch } from "react";


const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "OTP phải có 6 ký tự.",
  }),
});

export type InputOTPFormProps = {
  dataUser: registerProps;
  setCheckRegister: Dispatch<React.SetStateAction<boolean>>;
};

export function InputOTPForm({ dataUser, setCheckRegister }: InputOTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/post/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: dataUser.username,
        phone: dataUser.phone,
        password: dataUser.password,
        refreshToken: data.pin,
      }),
    });
    if (res.status === 200) {
      setCheckRegister(true)
    }
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4">Nhập OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-[#C95050] text-white w-full mt-6 h-12 hover:bg-[#C95040]"
          >
            Xác nhập OTP
          </Button>
        </form>
      </Form>
    </div>
  );
}
