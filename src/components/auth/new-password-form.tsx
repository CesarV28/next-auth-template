"use client"

import { FC, useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderIcon } from "lucide-react"
import { NewPasswordSchema } from "@/schemas/login"
import { newPasswordReset } from "@/actions/token.action"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"


interface NewPasswordFormProps {

}

export const NewPasswordForm: FC<NewPasswordFormProps> = () => {

    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [verificationStatus, setVerificationStatus] = useState({
        status: "not-started",
        message: ""
    });

    const token = searchParams.get('token');

    // 1. Define your form.
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
        if (!token) {
            setVerificationStatus({
                status: "error",
                message: "Oops!, something went wrong!"
            })
            return
        }
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        startTransition(() => {
            newPasswordReset(values, token).then((data) => {
                data.status === "error" && form.setError("password", { message: data.message })
                setVerificationStatus(data);
            }).catch((data) => {
                setVerificationStatus(data);
            });
        })

    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                {verificationStatus.status !== "not-started" && (
                    <div className="flex flex-col gap-4 items-center w-full justify-center">
                        {verificationStatus.status === "pending" && (
                            <LoaderIcon className="mr-2 animate-spin " />
                        )}
                        <div className="group relative w-full">
                            <div className={cn(
                                "absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400 via-lime-500 to-green-500 opacity-75 blur transition duration-500 group-hover:opacity-100",
                                verificationStatus.status === "error" && "from-amber-400 via-rose-500 to-red-500"
                            )}></div>
                            <p

                                className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"

                            >
                                {verificationStatus.status === "pending" && <span>{verificationStatus.message}</span>}
                                {verificationStatus.status === "error" && <span>{verificationStatus.message}</span>}
                                {verificationStatus.status === "success" && <span>{verificationStatus.message}</span>}
                            </p>
                        </div>

                    </div>
                )}

                <div className="group relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                    <Button
                        type="submit"
                        className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"
                        disabled={isPending || verificationStatus.status === "success"}
                    >

                        {isPending && (
                            <LoaderIcon className="mr-2 animate-spin " />
                        )}
                        Confirm new password
                    </Button>
                </div>


            </form>
        </Form>
    );
}
