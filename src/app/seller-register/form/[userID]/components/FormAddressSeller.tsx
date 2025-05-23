"use client"

import { FormCapital } from "@/app/user/[userID]/components/address/FormCapital"
import { FormDistrict } from "@/app/user/[userID]/components/address/FormDistrict"
import { FormCommune } from "@/app/user/[userID]/components/address/FormCommune"
import React, { SetStateAction, useEffect, useState } from "react"

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
import { phoneRegex } from "@/app/helper/constant"

const FormSchema = z.object({
    detail: z.string().min(1),
    phone: z.string().regex(
        phoneRegex, "Số điện thoại không hợp lệ"
    ),
    name: z.string().min(1),
})

export function FormAddressSeller({setValueAddress } : {setValueAddress: React.Dispatch<SetStateAction<string | undefined>>}) {
    const [valueCapital, setValueCapital] = useState('')
    const [checkCapital, setCheckCapital] = useState(false)
    const [valueDistrict, setValueDistrict] = useState('')
    const [checkDistrict, setCheckDistrict] = useState(false)
    const [valueCommune, setValueCommune] = useState('')

    useEffect(() => {
        if (valueCapital !== '') {
            setCheckCapital(true)
        }
        if (valueDistrict !== '' && valueCapital !== '') {
            setCheckDistrict(true)
        }
    }, [valueCapital, valueDistrict])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            detail: "",
            phone: "",
            name: "",
        },
    })
    function handleSave() {
        const data = form.getValues();
        const isValid = form.trigger(); 
        isValid.then(valid => {
            if (valid) {
                const fullAddress = `${data.name}\n${data.phone}\n${data.detail}, ${valueCommune}`;
                setValueAddress(fullAddress);
            }
        });
    }
    

    return (
        <div>
            <div className="w-full flex">
                <FormCapital setValueCapital={setValueCapital} />
                <FormDistrict setValueDistrict={setValueDistrict} valueCapital={valueCapital} checkCapital={checkCapital} />
                <FormCommune checkDistrict={checkDistrict} setValueCommnune={setValueCommune} valueDistrict={valueDistrict} />
            </div>
            <div className="w-full">
                <Form {...form}>
                    <form >
                        <FormField
                            control={form.control}
                            name="detail"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Địa chỉ chi tiết</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nhập địa chỉ chi tiết" {...field} disabled={valueCommune === ''} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="mt-2 w-1/2 mr-10">
                                        <FormLabel>Tên người nhận</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nhập tên người nhận" {...field} disabled={valueCommune === ''} />
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
                                    <FormItem className="mt-2 w-1/2">
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nhập số điện thoại" {...field} disabled={valueCommune === ''} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-[#C95050] text-white hover:bg-[#c9505098] mt-10" disabled={valueCommune === ''} type="button" onClick={(handleSave)}>Lưu</Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}
