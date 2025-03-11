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

export const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\d{9,15})$/; 

const FormSchema = z.object({
  username: z.string().min(2, 'Tên ít nhất phải 2 ký tự!'),
  accountEmail: z.string().toLowerCase().trim().email("Email không hợp lệ!"),
  phone: z.string().trim().regex(phoneRegex , 'Số điện thoại không hợp lệ!'),
  message: z.string()
})


export function FormContact() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      accountEmail: "",
      phone: '',
      message: ''
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
   console.log(data);
   
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
        </div>
        <div className="flex justify-end">
        <Button type="submit" className="bg-[#C95050] text-sm text-white mt-6">Gửi tin nhắn</Button>
        </div>
      </form>
    </Form>
  )
}
