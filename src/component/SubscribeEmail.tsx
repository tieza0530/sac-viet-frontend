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
import { useState } from "react"

const FormSchema = z.object({
  inputEmail: z.string().toLowerCase().trim().email("Email không hợp lệ!!")
})

export function SubscribeEmail() {
    const [formMessage, setFormMessage] = useState('');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        inputEmail: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/post/api/subscribe-email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailCustomer: data.inputEmail
        })
    }) 
    if(res.status === 200){
        setFormMessage('Đăng ký thành công!')
    }else if(res.status === 400){
        setFormMessage('Email đã tồn tại trong hệ thống!')
    }else{
        setFormMessage('Lỗi hệ thống!')
    }
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
                <Input placeholder="Đăng ký ngay" {...field} className="bg-white" />
              </FormControl>
              <FormMessage  />
              <p className="text-red-600 text-xs">{formMessage}</p>
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
