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
import { LoginSchema } from "@/schemas/login"
import { login } from "@/actions/auth.action"
import { useSearchParams } from "next/navigation"
import Link from "next/link"


interface LoginFormProps {

}

export const LoginForm: FC<LoginFormProps> = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use, please use a different"
        : ""

    const [isPending, startTransition] = useTransition();
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        startTransition(() => {
            login(values).then((data) => {
                data.status === "error" &&
                    (
                        form.setError("email", { message: urlError ? urlError : data.message }),
                        form.setError("password", { message: urlError ? " " : data.message })
                    )

                data.status === "success" && form.reset();
                data.status === "two-factor" && setShowTwoFactor(true);
            }).catch(() => {
                console.log("Catch")
                form.setError("email", { message: "Something went wrong" }),
                form.setError("password", { message: "Something went wrong" })
            })
        })

    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {showTwoFactor && (
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="code">
                                    Two Factor Code
                                </Label>
                                <FormControl>

                                    <Input
                                        {...field}
                                        id="code"
                                        placeholder="123456"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal"
                                >
                                    <Link href="/auth/reset">
                                        Forgont password?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {!showTwoFactor && (
                    <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="sr-only" htmlFor="email">
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
                                    <Label className="sr-only" htmlFor="password">
                                        Password
                                    </Label>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="password"
                                            placeholder="your password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isPending}
                                            autoComplete="current-password"
                                        />
                                    </FormControl>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        asChild
                                        className="px-0 font-normal"
                                    >
                                        <Link href="/auth/reset">
                                            Forgont password?
                                        </Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )

                }
                <div className="group relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                    <Button
                        type="submit"
                        className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"
                        disabled={isPending}
                    >

                        {isPending && (
                            <LoaderIcon className="mr-2 animate-spin " />
                        )}
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </div>

            </form>
        </Form>
    );
}
