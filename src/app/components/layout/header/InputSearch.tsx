"use client"
import { IoSearch } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    valueSearch: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputSearch() {
    const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      valueSearch: "",
      
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
       router.push(`/search?search=${encodeURIComponent(data.valueSearch)}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField 
          control={form.control}
          name="valueSearch"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Bạn đang tìm kiếm sản phẩm nào ?" {...field} className="2xl:w-80 " />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="absolute top-0 right-0 shadow-none hover:bg-neutral-50 text-black bg-neutral-100 border " type="submit" ><IoSearch className="text-[var(--color-text-root)] "/></Button>
      </form>
    </Form>
  )
}
