"use client";

import { FC } from 'react';
import Link from "next/link";
import { signOut } from "next-auth/react";

import { LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from '@/components/auth/user-avatar';

import { User } from '@prisma/client';

interface UserAccountNavProps {
    user: User;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {

    const onSignOut = async () => {

        await signOut().catch(console.error);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    className="w-10 h-10"
                    user={{
                        name: user.name || null,
                        image: user.image || null,
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-2  leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">Home</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onSelect={onSignOut}
                    className="text-red-600 cursor-pointer"
                >
                    Sign out
                    <LogOut className="w-4 h-4 ml-2 " />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav;