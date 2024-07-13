"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import { SettingsSchema } from "@/schemas/settings"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { UserRole } from "@prisma/client"



export default function SettingsPage() {

  const { update } = useSession();
  const user = useCurrentUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState({
    status: "",
    message: ""
  })

  const settingsForm = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
      roles: user?.roles
    },
  })

  const handleSubmitSettings = async (values: z.infer<typeof SettingsSchema>) => {
    try {
      setIsLoading(true);
      const data = await settings(values);
      if (data.status === "error") {
        setMessage({
          status: "error",
          message: "It could not be posible to change settings."
        });
        toast.error(data.message, { style: { background: "#F44336" } })
        return;
      }

      update();
      toast.success(data.message, { style: { background: "#2aaa45" } })
      setMessage({
        status: "success",
        message: data.message
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage({
          status: "pause",
          message: ""
        });
      }, 3000);
    }
  }

  return (
    <main>
      <Card className="w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Settings className="w-5 h-5" />Settings</CardTitle>
          <CardDescription>Manage your account settings here to customize your experience. Update preferences, privacy settings, and more to tailor your account to your needs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...settingsForm}>
              <form onSubmit={settingsForm.handleSubmit(handleSubmitSettings)} className="space-y-4">
                <FormField
                  control={settingsForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} placeholder="Your new user name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={settingsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Current email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={settingsForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your current password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={settingsForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your new password, 6 characteres as minimun
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={settingsForm.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>ADMIN</SelectItem>
                          <SelectItem value={UserRole.USER}>USER</SelectItem>
                          <SelectItem value={UserRole.GUEST}>GUEST</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <FormField
                    control={settingsForm.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>TwoFactorEnabled</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for your account.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isLoading}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button disabled={isLoading}>Update</Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground mx-auto">
            Need help? Check out our <a href="/help-center" className="text-blue-500 hover:underline">Help Center</a> or contact <a href="/contact-us" className="text-blue-500 hover:underline">Support</a>.
          </p>
        </CardFooter>
      </Card>

    </main>
  )
}
