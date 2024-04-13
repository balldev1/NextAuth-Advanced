"use client";

import * as z from "zod";

import {useState, useTransition} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {CardWrapper} from "@/components/auth/card-wrapper";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";

export const RegisterFrom = () =>{

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    // เกิด transition ใช้ useTransition
    // isPending เมือเกิด submit ให้ปุ่ม กดไม่ได้
    // disabled = {isPending}
    const [isPending, startTransition] = useTransition();
    // เกิด transition ให้ใช้ useTransition

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        // เกิด transition ให้ใช้ useTransition
        startTransition(()=>{
            // api actions.login => form.value
            register(values)
                // เอาค่าที่ได้จาก login มาเก็บไว้ที่ state
                .then((data)=> {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                >
                    <div className="space-y-4">
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="balldev1"
                                            type="name"
                                        />
                                    </FormControl>
                                    {/* message */}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        {/* email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="balldev1@gmail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    {/* message */}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>

                        {/* password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="*******"
                                            type="password"
                                        />
                                    </FormControl>
                                    {/* message */}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>
                    </div>
                    {/* FORM ERROR */}
                    <FormError
                        message={error}
                    />
                    <FormSuccess
                        message={success}
                    />
                    <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full"
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}