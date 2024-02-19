"use client"

import { FC, useState, useTransition } from "react"
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
import { Label } from "@/components/ui/label"
import { LoaderIcon } from "lucide-react"
import { RegisterSchema } from "@/schemas/login"
import { register } from "@/actions/auth.action"
import { redirect } from "next/navigation"


interface RegisterFormProps {

}

export const RegisterForm: FC<RegisterFormProps> = () => {

    const [isPending, startTransition] = useTransition()

    // 1. Define your form.
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        startTransition(() => {
            register(values).then((data) => {
                data.status === "error"
                    ? (
                        form.setError("email", { message: "Credentials do not match" }),
                        form.setError("password", { message: "Credentials do not match" })
                    )
                    : form.reset()
            });

            redirect("/auth/login")
        })

    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormControl>
                                <Input id="name" placeholder="Your Name" {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <FormControl>

                                <Input
                                    {...field}
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <FormControl>

                                <Input
                                    {...field}
                                    id="password"
                                    placeholder="Your password"
                                    type="password"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    autoComplete="password"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="confirm_password" >Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="confirm_password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    autoComplete="password"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="group relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100">
                    </div>
                    <Button
                        type="submit"
                        className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"
                        disabled={isPending}
                    >
                        {isPending && (
                            <LoaderIcon className="mr-2 animate-spin" />
                        )}
                        Create account
                    </Button>

                </div>

            </form>
        </Form>
    );
}
