"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  inputEmail: z.string().toLowerCase().trim().email("Email không hợp lệ!!")
})

export function SubscribeEmail() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        inputEmail: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
     console.log(data);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-72 relative">
        <FormField
          control={form.control}
          name="inputEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl className="relative ">
                <Input placeholder="Đăng ký ngay" {...field} />
              </FormControl>
              <FormMessage  />
              <FormDescription>
              Chúng tôi sẽ gửi cập nhật những tin khuyến mãi & báo giá mới nhất đến bạn!
            </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="absolute top-0 right-0 bg-black text-white ">Đăng ký</Button>
      </form>

    </Form>
  )
}
