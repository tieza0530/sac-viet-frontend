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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant"
import { useAuth } from "@/app/AuthContext"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

const FormSchema = z.object({
    detail: z.string().min(1),
    phone: z.string().regex(
        /^(0[3|5|7|8|9][0-9]{8}|(\+84)[3|5|7|8|9][0-9]{8})$/,
        "Số điện thoại không hợp lệ"
      ),
})

export function InputFormDetail({valueCommune}: {valueCommune: string}) {
    const {accessToken , setDataUser} = useAuth();
    const [showAlert , setShowAlert] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        detail: "",
        phone: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/patch/update-address`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            address: data.detail +", "+ valueCommune,
            phone: data.phone
        }),
      });

    if(res.status === 200){
        const data = await res.json();
        setDataUser(data);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000)
    }
  }

  return (
    <div className="w-full">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Địa chỉ chi tiết</FormLabel>
              <FormControl>
                <Input placeholder="nhập địa chỉ chi tiết" {...field}  disabled={valueCommune === ''}/>
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-2 w-1/3">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="nhập số điện thoại" {...field}  disabled={valueCommune === ''}/>
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
        <Button type="submit" className="bg-[#C95050] text-white hover:bg-[#c9505098] mt-10" disabled={valueCommune === ''}>Cập nhật</Button>
        {showAlert && 
         <Alert className="absolute top-1/5 right-0 w-auto px-10 mr-1 bg-green-200/30 text-green-400/65 border-0">
         <Terminal />
         <AlertTitle>Cập nhật thành công!</AlertTitle>
         <AlertDescription></AlertDescription>
       </Alert>
        }
        </div>
      </form>
    </Form>
    </div>
  )
}
