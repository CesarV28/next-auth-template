"use client"

import { FC, useTransition } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderIcon } from "lucide-react"
import { ResetSchema } from "@/schemas/login"
import { reset } from "@/actions/token.action"


interface ResetFormProps {

}

export const ResetForm: FC<ResetFormProps> = () => {

    const [isPending, startTransition] = useTransition();

    // 1. Define your form.
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        startTransition(() => {
            reset(values).then((data) => {
                data.status === "error" && form.setError("email", { message: data.message })
            })
        })

    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        Send reset email
                    </Button>
                </div>

            </form>
        </Form>
    );
}
