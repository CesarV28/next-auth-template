import { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExtendedUser } from "@/lib/auth-session";
import { cn } from "@/lib/utils";






interface UserCardInfoProps {
    title: string;
    description?: string;
    user?: ExtendedUser;
}

const UserCardInfo: FC<UserCardInfoProps> = ({
    title,
    description,
    user,
}) => {
    return (
        <Card className="bg-slate-600">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p className="px-4 py-2 bg-slate-50 text-background flex justify-between rounded-sm items-center">
                    <span className="font-semibold">ID:</span>
                    {user?.id}
                </p>
                <p className="px-4 py-2 bg-slate-50 text-background flex justify-between rounded-sm items-center">
                    <span className="font-semibold">Name:</span>
                    {user?.name}
                </p>
                <p className="px-4 py-2 bg-slate-50 text-background flex justify-between rounded-sm items-center">
                    <span className="font-semibold">Email:</span>
                    {user?.email}
                </p>
                <p className="px-4 py-2 bg-slate-50 text-background flex justify-between rounded-sm items-center">
                    <span className="font-semibold">Roles:</span>
                    <Badge>{user?.roles}</Badge>

                </p>
                <p className="px-4 py-2 bg-slate-50 text-background flex justify-between rounded-sm items-center">
                    <span className="font-semibold">isTwoFactorEnabled:</span>
                    <Badge className={cn("text-white hover:text-background",user?.isTwoFactorEnabled ? "bg-green-600" : "bg-red-600")} >{`${user?.isTwoFactorEnabled ? "ON" : "OFF"}`}</Badge>
                </p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    );
}

export default UserCardInfo;