"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { fetchForgetPassword } from "./fetchForgetPassword"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.string().email("Email không hợp lệ!"),
})

export function ForgetPassword() {
  const route = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetchForgetPassword(data);
    if(res === 200){
      route.push('/forget-password')
      localStorage.setItem("email", data.email)
    }    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nhập địa chỉ email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#C95050] text-white w-full mt-6 h-12 hover:bg-[#C95040]">Tiếp theo</Button>
      </form>
    </Form>
  )
}

