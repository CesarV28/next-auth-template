"use client"
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import UserAccountNav from "./user-account-nav";
import { useCurrentUser } from "@/hooks/auth/use-current-user";


export const SessionNavbar = () => {

    const user = useCurrentUser();

    return (
        <nav
            id="header-menu"
            className="sticky flex items-center justify-evenly top-0 z-30 h-[72px] bg-gray-100/50 dark:bg-gray-900/25 backdrop-blur backdrop-filter"
        >
            <ul className="flex items-center gap-6">
                <li>
                    <Link className="" href={'/'}>
                        Home
                    </Link>

                </li>
                <li>
                    <Link className="" href={'/server'}>
                        Server
                    </Link>
                </li>
                <li>
                    <Link className="" href={'/client'}>
                        Client
                    </Link>
                </li>
                <li>
                    <Link className="" href={'/admin'}>
                        Admin
                    </Link>
                </li>
                <li>
                    <Link className="" href={'/settings'}>
                        Settings
                    </Link>
                </li>
            </ul>
            <div className="flex items-center gap-10">
                <UserAccountNav user={user} />
                <ThemeToggle />
            </div>
        </nav>
    );
}
