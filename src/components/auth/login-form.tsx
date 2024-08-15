"use client"

import { FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderIcon } from "lucide-react"
import { LoginSchema } from "@/schemas/login"
import { login } from "@/actions/auth.action"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"


interface LoginFormProps {

}

export const LoginForm: FC<LoginFormProps> = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use, please use a different"
        : ""

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const data = await login(values);

        if(data.status === "error") {
            form.setError("email", { message: urlError ? urlError : data.message }),
            form.setError("password", { message: urlError ? " " : data.message })
        }
        if (data.status === "email-sent") {
            toast.success("An email has been sent to your email address. Please check your inbox.");
            setIsLoading(false);
            form.reset();
            return;
        }

        data.status === "success" && form.reset();
        data.status === "two-factor" && setShowTwoFactor(true);
        setIsLoading(false);
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
                                <div className="flex flex-col gap-4 justify-center items-center">
                                    <Label htmlFor="code" className="text-center">
                                        Two Factor Code
                                    </Label>
                                    <FormControl>

                                        {/* <Input
                                            {...field}
                                            id="code"
                                            placeholder="123456"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        /> */}
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                </div>
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
                                            disabled={isLoading}
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
                                            disabled={isLoading}
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
                        disabled={isLoading}
                    >

                        {isLoading && (
                            <LoaderIcon className="mr-2 animate-spin " />
                        )}
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </div>

            </form>
        </Form>
    );
}
