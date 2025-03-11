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
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export const phoneRegex = /^0\d{9}$/;

const FormSchema = z.object({
  username: z.string().min(2, 'Tên ít nhất phải 2 ký tự!'),
  accountEmail: z.string().toLowerCase().trim().email("Email không hợp lệ!"),
  phone: z.string().trim().regex(phoneRegex , 'Số điện thoại không hợp lệ!'),
  message: z.string()
})


export function FormContact() {
    const [formMessage, setFormMessage] = useState('');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      accountEmail: "",
      phone: '',
      message: ''
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/post/api/contact`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.username, email: data.accountEmail, phone: data.phone , message: data.message
        })
    })
    if(res.status === 200){
        setFormMessage("Gửi tin nhắn thành công!")
    }else{
        setFormMessage("Hệ thông tạm thời đang bị lỗi! Vui lòng liện hệ bằng hotline.")
    }
   console.log(res , data);
   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 " >
        <div className=" grid grid-cols-12">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-4 ">
              <FormControl>
                <Input placeholder="Tên của bạn *" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="accountEmail"
          render={({ field }) => (
            <FormItem className="col-span-4 mx-2">
              <FormControl>
                <Input placeholder="Tài khoản email *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormControl>
                <Input placeholder="Số điện thoai *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="mt-2">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem >
              <FormControl>
              <Textarea
                  placeholder="Lời nhắn của bạn"
                  className="resize-none h-60"
                  {...field}
                />             
            </FormControl>
            </FormItem>
          )}
        />
        <p className="text-xs text-red-500">{formMessage}</p>
        </div>
        <div className="flex justify-end">
        <Button type="submit" className="bg-[#C95050] text-sm text-white mt-6">Gửi tin nhắn</Button>
        </div>
      </form>
    </Form>
  )
}
