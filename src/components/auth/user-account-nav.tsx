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
import { SessionUser } from '@/types';

interface UserAccountNavProps {
    user: SessionUser;
    showName?: boolean;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user, showName = false }) => {

    const onSignOut = async () => {
        await signOut().catch(console.error);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 items-center hover:bg-muted py-1 px-2 rounded-sm">
                <UserAvatar
                    className="w-7 h-7"
                    user={{
                        name: user?.name || null,
                        image: user?.image || null,
                    }}
                />
                { showName && <p className="text-sm">{user?.name}</p>}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-2  leading-none">
                        {user?.name && <p className="font-medium">{user.name}</p>}
                        {user?.email && (
                            <p className="w-[200px] truncate text-sm">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
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